// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

// Type-only imports: this file is shared with client components, and `@gp/content` pulls in Node-only code.
import type { LegalCategory, LegalFrontmatter, MdxDocument } from '@gp/content';
import { createSearchDocument, scoreSearchDocument, tokenizeQuery } from '../content-index/content-index.search';
import { DEFAULT_SORT, RELEVANCE_SORT } from '../content-index/content-index.utils';
import type { FilterGroup, SearchParams, SortOption } from '../content-index/content-index.utils';

export type { FilterGroup, SearchParams, SortOption } from '../content-index/content-index.utils';
export { DEFAULT_SORT, RELEVANCE_SORT, buildIndexHref } from '../content-index/content-index.utils';

/**
 * @brief Lean, serializable summary of a legal document, safe to pass from Server to Client Components.
 */
export interface LegalIndexItem {
  slug: string;
  href: string;
  title: string;
  summary: string;
  category: LegalCategory;
  version: string;
  effectiveDate: Date;
  updateDate?: Date;
  requiresExplicitConsent: boolean;
}

/**
 * @brief Everything the legal index UI needs to render a filtered, sorted, paginated view.
 */
export interface LegalIndexData {
  items: LegalIndexItem[];
  totalCount: number;
  allCount: number;
  filters: FilterGroup[];
  sortOptions: SortOption[];
  currentQuery: string;
  currentSort: string;
  currentPage: number;
  totalPages: number;
  query: Record<string, string>;
}

export const LEGAL_CATEGORY_LABELS: Record<LegalCategory, string> = {
  consumer: 'Consumer',
  business: 'Business',
  licensing: 'Licensing'
};

export const LEGAL_CATEGORY_ORDER: readonly LegalCategory[] = ['consumer', 'business', 'licensing'];

export const LEGAL_SORT_OPTIONS: SortOption[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Title (A-Z)', value: 'title' }
];

type ConsentFilterValue = 'explicit' | 'notice';

const CONSENT_FILTER_ORDER: readonly ConsentFilterValue[] = ['explicit', 'notice'];

const CONSENT_FILTER_LABELS: Record<ConsentFilterValue, string> = {
  explicit: 'Explicit consent',
  notice: 'Standard notice'
};

interface LegalFilterGroupDefinition {
  value: string;
  label: string;
  getValues: (item: LegalIndexItem) => string[];
  getLabel: (value: string) => string;
  order: readonly string[];
}

const LEGAL_FILTER_GROUPS: LegalFilterGroupDefinition[] = [
  {
    value: 'category',
    label: 'Category',
    getValues: (item) => [item.category],
    getLabel: (value) => LEGAL_CATEGORY_LABELS[value as LegalCategory] ?? value,
    order: LEGAL_CATEGORY_ORDER
  },
  {
    value: 'consent',
    label: 'Consent',
    getValues: (item) => [item.requiresExplicitConsent ? 'explicit' : 'notice'],
    getLabel: (value) => CONSENT_FILTER_LABELS[value as ConsentFilterValue] ?? value,
    order: CONSENT_FILTER_ORDER
  }
];

/** @brief Every query param key owned by the legal filters. */
export const LEGAL_FILTER_KEYS = LEGAL_FILTER_GROUPS.map((group) => group.value);

const DEFAULT_PAGE_SIZE = 24;

const normalize = (value: string) => value.trim().toLowerCase();

/**
 * @brief Formats a date deterministically in UTC so server and client renders always match across timezones.
 */
export const formatUtcDate = (date: Date, month: 'short' | 'long' = 'short'): string =>
  date.toLocaleDateString('en-US', {
    year: 'numeric',
    month,
    day: 'numeric',
    timeZone: 'UTC'
  });

const parseList = (param: string | string[] | undefined): string[] => {
  const raw = Array.isArray(param) ? param.join(',') : (param ?? '');

  return [...new Set(raw.split(',').map(normalize).filter(Boolean))];
};

const firstValue = (param: string | string[] | undefined) => (Array.isArray(param) ? param[0] : param);

const getRelevantDate = (item: LegalIndexItem): Date => item.updateDate ?? item.effectiveDate;

const toLegalItem = (doc: MdxDocument<LegalFrontmatter>, basePath: string): LegalIndexItem => ({
  slug: doc.slug,
  href: `${basePath}/${doc.frontmatter.slug}`,
  title: doc.frontmatter.title,
  summary: doc.frontmatter.summary,
  category: doc.frontmatter.category,
  version: doc.frontmatter.version,
  effectiveDate: doc.frontmatter.effectiveDate,
  updateDate: doc.frontmatter.updateDate,
  requiresExplicitConsent: doc.frontmatter.requiresExplicitConsent
});

const buildLegalSearchDoc = (item: LegalIndexItem) =>
  createSearchDocument([
    { values: [item.title, item.slug, item.slug.replace(/-/g, ' ')], weight: 4 },
    {
      values: [
        item.category,
        LEGAL_CATEGORY_LABELS[item.category],
        `v${item.version}`,
        item.version,
        item.requiresExplicitConsent ? 'explicit consent' : 'standard notice'
      ],
      weight: 2.5
    },
    { values: [item.summary], weight: 1 }
  ]);

const buildFilterGroup = (
  definition: LegalFilterGroupDefinition,
  items: LegalIndexItem[],
  selected: string[]
): FilterGroup => {
  const present = new Set<string>();

  for (const item of items) {
    for (const raw of definition.getValues(item)) {
      const value = normalize(raw);

      if (value) present.add(value);
    }
  }

  for (const checked of selected) {
    if (definition.order.includes(checked)) present.add(checked);
  }

  const options = [...present]
    .sort((a, b) => definition.order.indexOf(a) - definition.order.indexOf(b))
    .map((value) => ({
      value,
      label: definition.getLabel(value),
      isChecked: selected.includes(value)
    }));

  return { value: definition.value, label: definition.label, options };
};

const compareLegalItems = {
  newest: (a: LegalIndexItem, b: LegalIndexItem) =>
    getRelevantDate(b).getTime() - getRelevantDate(a).getTime() ||
    Number(b.requiresExplicitConsent) - Number(a.requiresExplicitConsent) ||
    a.title.localeCompare(b.title),
  oldest: (a: LegalIndexItem, b: LegalIndexItem) =>
    getRelevantDate(a).getTime() - getRelevantDate(b).getTime() || a.title.localeCompare(b.title),
  title: (a: LegalIndexItem, b: LegalIndexItem) => a.title.localeCompare(b.title)
};

type SortKey = keyof typeof compareLegalItems;

const isSortKey = (value: string): value is SortKey => Object.hasOwn(compareLegalItems, value);

/**
 * @brief Filters, searches, sorts and paginates legal documents according to the page's search params.
 */
export const buildLegalIndex = (
  docs: MdxDocument<LegalFrontmatter>[],
  searchParams: SearchParams,
  { basePath = '/legal', pageSize = DEFAULT_PAGE_SIZE }: { basePath?: string; pageSize?: number } = {}
): LegalIndexData => {
  const allEntries = docs.map((doc) => {
    const item = toLegalItem(doc, basePath);

    return {
      item,
      searchDoc: buildLegalSearchDoc(item)
    };
  });
  const allItems = allEntries.map((entry) => entry.item);
  const query: Record<string, string> = {};

  const groups = LEGAL_FILTER_GROUPS.map((definition) => ({
    definition,
    selected: parseList(searchParams[definition.value])
  }));

  const filters = groups
    .map(({ definition, selected }) => buildFilterGroup(definition, allItems, selected))
    .filter((group) => group.options.length > 1 || group.options.some((option) => option.isChecked));

  for (const { definition, selected } of groups) {
    if (selected.length > 0) query[definition.value] = selected.join(',');
  }

  const currentQuery = (firstValue(searchParams['q']) ?? '').trim();
  const queryTokens = tokenizeQuery(currentQuery);
  const normalizedQuery = queryTokens.join(' ');
  const isSearchActive = queryTokens.length > 0;

  if (currentQuery.length > 0) query['q'] = currentQuery;

  const matched = allEntries
    .map(({ item, searchDoc }) => {
      const matchesFilters = groups.every(
        ({ definition, selected }) =>
          selected.length === 0 || definition.getValues(item).some((value) => selected.includes(normalize(value)))
      );

      if (!matchesFilters) return null;

      const score = isSearchActive ? scoreSearchDocument(searchDoc, queryTokens, normalizedQuery) : 1;

      return score > 0 ? { item, score } : null;
    })
    .filter((entry): entry is { item: LegalIndexItem; score: number } => entry !== null);

  const sortOptions = isSearchActive
    ? [{ label: 'Relevance', value: RELEVANCE_SORT }, ...LEGAL_SORT_OPTIONS]
    : LEGAL_SORT_OPTIONS;
  const sortParam = firstValue(searchParams['sort']) ?? '';
  const defaultSort = isSearchActive ? RELEVANCE_SORT : DEFAULT_SORT;
  const currentSort =
    sortParam === RELEVANCE_SORT && isSearchActive ? RELEVANCE_SORT : isSortKey(sortParam) ? sortParam : defaultSort;

  if (currentSort !== defaultSort) query['sort'] = currentSort;

  const sorted = [...matched]
    .sort((a, b) => {
      if (currentSort === RELEVANCE_SORT) {
        return b.score - a.score || compareLegalItems[DEFAULT_SORT](a.item, b.item);
      }

      return compareLegalItems[currentSort](a.item, b.item);
    })
    .map(({ item }) => item);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const requestedPage = Number.parseInt(firstValue(searchParams['page']) ?? '', 10);
  const currentPage = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1;

  if (currentPage > 1) query['page'] = String(currentPage);

  return {
    items: sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    totalCount: sorted.length,
    allCount: allItems.length,
    filters,
    sortOptions,
    currentQuery,
    currentSort,
    currentPage,
    totalPages,
    query
  };
};

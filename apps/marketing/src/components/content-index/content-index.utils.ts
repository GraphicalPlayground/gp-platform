// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

// Type-only imports: this file is shared with client components, and `@gp/content` pulls in Node-only code.
import type { Article, Difficulty, MdxDocument } from '@gp/content';
import type { Route } from 'next';
import { getDevDraftTokenLabel } from '../../lib/article-status';
import { buildSearchDocument, scoreSearchDocument, tokenizeQuery } from './content-index.search';

/**
 * @brief Raw search params as received by a Next.js page.
 */
export type SearchParams = Record<string, string | string[] | undefined>;

/**
 * @brief Lean, serializable summary of an article, safe to send to client components.
 */
export interface ContentIndexItem {
  slug: string;
  href: string;
  subtopic?: string;
  draftLabel?: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  tags: string[];
  datePublished: Date;
  readingTimeMinutes: number;
  coverImage?: string;
  coverImageAlt?: string;
}

export interface FilterOption {
  label: string;
  value: string;
  isChecked: boolean;
}

export interface FilterGroup {
  /**
   * @brief Query param name used for this group, e.g. `tag`.
   */
  value: string;
  label: string;
  options: FilterOption[];
}

export interface SortOption {
  label: string;
  value: string;
}

/**
 * @brief Everything the index UI needs to render a single page of results.
 */
export interface ContentIndexData {
  items: ContentIndexItem[];
  totalCount: number;
  filters: FilterGroup[];
  sortOptions: SortOption[];
  currentQuery: string;
  currentSort: string;
  currentPage: number;
  totalPages: number;
  /**
   * @brief The normalized active query (filters, search, sort, page), used to build links client-side.
   */
  query: Record<string, string>;
}

export const SORT_OPTIONS: SortOption[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Title (A-Z)', value: 'title' }
];

export const RELEVANCE_SORT = 'relevance';
export const DEFAULT_SORT = 'newest';
const DEFAULT_PAGE_SIZE = 12;

interface FilterGroupDefinition {
  value: string;
  label: string;
  getValues: (item: ContentIndexItem) => string[];
  /**
   * @brief Fixed display order for option values. Options are sorted alphabetically when omitted.
   */
  order?: readonly string[];
  /**
   * @brief Show the group even when only a single option exists in the collection.
   */
  allowSingleOption?: boolean;
}

const DIFFICULTY_ORDER = ['beginner', 'intermediate', 'advanced'] as const satisfies readonly Difficulty[];

const FILTER_GROUPS: FilterGroupDefinition[] = [
  { value: 'category', label: 'Topic', getValues: (item) => [item.category] },
  { value: 'difficulty', label: 'Level', getValues: (item) => [item.difficulty], order: DIFFICULTY_ORDER },
  {
    value: 'subtopic',
    label: 'Subtopic',
    getValues: (item) => (item.subtopic ? [item.subtopic] : []),
    allowSingleOption: true
  }
];

/** @brief Every query param key owned by the filters. */
export const FILTER_KEYS = FILTER_GROUPS.map((group) => group.value);

const normalize = (value: string) => value.trim().toLowerCase();

/** @brief `rendering-pipeline` -> `Rendering pipeline`. */
const humanize = (slug: string) => {
  const words = slug.replace(/-/g, ' ');

  return words.charAt(0).toUpperCase() + words.slice(1);
};

/** @brief Reads a comma-separated (or repeated) query param as a list of normalized values. */
const parseList = (param: string | string[] | undefined): string[] => {
  const raw = Array.isArray(param) ? param.join(',') : (param ?? '');

  return [...new Set(raw.split(',').map(normalize).filter(Boolean))];
};

const firstValue = (param: string | string[] | undefined) => (Array.isArray(param) ? param[0] : param);

const resolveDescription = (doc: MdxDocument<Article>) => {
  const { description, lede } = doc.frontmatter;
  const trimmed = description.trim();

  return trimmed.length === 0 || trimmed.toUpperCase() === 'TODO' ? lede : description;
};

const toItem = (doc: MdxDocument<Article>, basePath: string): ContentIndexItem => ({
  slug: doc.slug,
  href: `${basePath}/${doc.frontmatter.slug}`,
  subtopic: doc.frontmatter.subtopic,
  draftLabel: getDevDraftTokenLabel(doc.frontmatter),
  title: doc.frontmatter.title,
  description: resolveDescription(doc),
  category: doc.frontmatter.category,
  difficulty: doc.frontmatter.difficulty,
  tags: doc.frontmatter.tags,
  datePublished: doc.frontmatter.datePublished,
  readingTimeMinutes: doc.frontmatter.readingTimeMinutes ?? doc.readingTimeMinutes,
  coverImage: doc.frontmatter.coverImage,
  coverImageAlt: doc.frontmatter.coverImageAlt
});

const buildFilterGroup = (
  definition: FilterGroupDefinition,
  items: ContentIndexItem[],
  selected: string[]
): FilterGroup => {
  // Keep the first casing we see for the label (tags are free-form), keyed by normalized value.
  const labels = new Map<string, string>();

  for (const item of items) {
    for (const raw of definition.getValues(item)) {
      const value = normalize(raw);

      if (value && !labels.has(value)) labels.set(value, definition.value === 'tag' ? raw : humanize(raw));
    }
  }

  const options = [...labels].map(([value, label]) => ({ label, value, isChecked: selected.includes(value) }));
  const { order } = definition;

  options.sort((a, b) => (order ? order.indexOf(a.value) - order.indexOf(b.value) : a.label.localeCompare(b.label)));

  return { value: definition.value, label: definition.label, options };
};

const compareItems = {
  newest: (a: ContentIndexItem, b: ContentIndexItem) => b.datePublished.getTime() - a.datePublished.getTime(),
  oldest: (a: ContentIndexItem, b: ContentIndexItem) => a.datePublished.getTime() - b.datePublished.getTime(),
  title: (a: ContentIndexItem, b: ContentIndexItem) => a.title.localeCompare(b.title)
};

type SortKey = keyof typeof compareItems;

const isSortKey = (value: string): value is SortKey => Object.hasOwn(compareItems, value);

/**
 * @brief Filters, sorts and paginates a list of articles according to the page's search params.
 * @details Filters combine with OR inside a group and AND across groups, e.g. `?difficulty=beginner&tag=vulkan,dx12`.
 * @param docs - Every article that belongs to the index.
 * @param searchParams - The page's search params (`category`, `difficulty`, `tag`, `q`, `sort`, `page`).
 * @param options - `basePath` used to build article links, and the page size.
 */
export const buildContentIndex = (
  docs: MdxDocument<Article>[],
  searchParams: SearchParams,
  { basePath, pageSize = DEFAULT_PAGE_SIZE }: { basePath: string; pageSize?: number }
): ContentIndexData => {
  const allEntries = docs.map((doc) => {
    const item = toItem(doc, basePath);

    return {
      item,
      searchDoc: buildSearchDocument(doc, item.description)
    };
  });
  const allItems = allEntries.map((entry) => entry.item);
  const query: Record<string, string> = {};

  const groups = FILTER_GROUPS.map((definition) => ({
    definition,
    selected: parseList(searchParams[definition.value])
  }));

  const filters = groups
    .map(({ definition, selected }) => ({
      definition,
      group: buildFilterGroup(definition, allItems, selected)
    }))
    // Hide groups with 0-1 options unless configured to show single options (like subtopic) or already checked.
    .filter(
      ({ definition, group }) =>
        group.options.length > 1 ||
        (Boolean(definition.allowSingleOption) && group.options.length === 1) ||
        group.options.some((option) => option.isChecked)
    )
    .map(({ group }) => group);

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
    .filter((entry): entry is { item: ContentIndexItem; score: number } => entry !== null);

  const sortOptions = isSearchActive ? [{ label: 'Relevance', value: RELEVANCE_SORT }, ...SORT_OPTIONS] : SORT_OPTIONS;
  const sortParam = firstValue(searchParams['sort']) ?? '';
  const defaultSort = isSearchActive ? RELEVANCE_SORT : DEFAULT_SORT;
  const currentSort =
    sortParam === RELEVANCE_SORT && isSearchActive ? RELEVANCE_SORT : isSortKey(sortParam) ? sortParam : defaultSort;

  if (currentSort !== defaultSort) query['sort'] = currentSort;

  const sorted = [...matched]
    .sort((a, b) => {
      if (currentSort === RELEVANCE_SORT) {
        return b.score - a.score || compareItems[DEFAULT_SORT](a.item, b.item);
      }

      return compareItems[currentSort](a.item, b.item);
    })
    .map(({ item }) => item);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const requestedPage = Number.parseInt(firstValue(searchParams['page']) ?? '', 10);
  const currentPage = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1;

  if (currentPage > 1) query['page'] = String(currentPage);

  return {
    items: sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    totalCount: sorted.length,
    filters,
    sortOptions,
    currentQuery,
    currentSort,
    currentPage,
    totalPages,
    query
  };
};

/**
 * @brief Builds an index URL from a base path and a set of query params, dropping empty values.
 */
export const buildIndexHref = (basePath: string, query: Record<string, string | undefined>): Route => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value) params.set(key, value);
  }

  const search = params.toString();

  return (search ? `${basePath}?${search}` : basePath) as Route;
};

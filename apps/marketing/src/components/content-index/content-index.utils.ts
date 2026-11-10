// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

// Type-only imports: this file is shared with client components, and `@gp/content` pulls in Node-only code.
import type { Article, Difficulty, MdxDocument } from '@gp/content';
import type { Route } from 'next';

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
  currentSort: string;
  currentPage: number;
  totalPages: number;
  /**
   * @brief The normalized active query (filters, sort, page), used to build links client-side.
   */
  query: Record<string, string>;
}

export const SORT_OPTIONS: SortOption[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Title (A-Z)', value: 'title' }
];

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
}

const DIFFICULTY_ORDER = ['beginner', 'intermediate', 'advanced'] as const satisfies readonly Difficulty[];

const FILTER_GROUPS: FilterGroupDefinition[] = [
  { value: 'category', label: 'Topic', getValues: (item) => [item.category] },
  { value: 'difficulty', label: 'Level', getValues: (item) => [item.difficulty], order: DIFFICULTY_ORDER },
  { value: 'tag', label: 'Tags', getValues: (item) => item.tags }
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

      if (!labels.has(value)) labels.set(value, definition.value === 'tag' ? raw : humanize(raw));
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
 * @param searchParams - The page's search params (`category`, `difficulty`, `tag`, `sort`, `page`).
 * @param options - `basePath` used to build article links, and the page size.
 */
export const buildContentIndex = (
  docs: MdxDocument<Article>[],
  searchParams: SearchParams,
  { basePath, pageSize = DEFAULT_PAGE_SIZE }: { basePath: string; pageSize?: number }
): ContentIndexData => {
  const allItems = docs.map((doc) => toItem(doc, basePath));
  const query: Record<string, string> = {};

  const groups = FILTER_GROUPS.map((definition) => ({
    definition,
    selected: parseList(searchParams[definition.value])
  }));

  const filters = groups
    .map(({ definition, selected }) => buildFilterGroup(definition, allItems, selected))
    // A group with a single option filters nothing, unless it's already checked (so it can be unchecked).
    .filter((group) => group.options.length > 1 || group.options.some((option) => option.isChecked));

  for (const { definition, selected } of groups) {
    if (selected.length > 0) query[definition.value] = selected.join(',');
  }

  const filtered = allItems.filter((item) =>
    groups.every(
      ({ definition, selected }) =>
        selected.length === 0 || definition.getValues(item).some((value) => selected.includes(normalize(value)))
    )
  );

  const sortParam = firstValue(searchParams['sort']) ?? '';
  const currentSort: SortKey = isSortKey(sortParam) ? sortParam : DEFAULT_SORT;

  if (currentSort !== DEFAULT_SORT) query['sort'] = currentSort;

  const sorted = [...filtered].sort(compareItems[currentSort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const requestedPage = Number.parseInt(firstValue(searchParams['page']) ?? '', 10);
  const currentPage = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1;

  if (currentPage > 1) query['page'] = String(currentPage);

  return {
    items: sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    totalCount: sorted.length,
    filters,
    sortOptions: SORT_OPTIONS,
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

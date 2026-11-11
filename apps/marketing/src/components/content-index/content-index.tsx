// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './content-index.module.css';

import { Box, Grid, Hero, Pagination } from '@gp/ui/components';
import { EmptyStatePanel } from '@/components/route-state';
import { IndexCard, IndexFilters, IndexSearch, IndexSort } from './components';
import { DEFAULT_SORT, FILTER_KEYS, RELEVANCE_SORT, buildIndexHref } from './content-index.utils';
import type { ContentIndexData } from './content-index.utils';

export interface ContentIndexProps extends ContentIndexData {
  title: string;
  description: string;
  /**
   * @brief Path the index is served at, e.g. `/glossary`.
   */
  basePath: string;
  emptyStateMessage?: string;
  /**
   * @brief Enables the keyword search bar above the listing.
   */
  searchable?: boolean;
  /**
   * @brief Placeholder text shown inside the search input.
   */
  searchPlaceholder?: string;
  /**
   * @brief Displays the first result as a full-width card on the first, unfiltered page.
   */
  showSpotlight?: boolean;
}

const withoutKeys = (query: Record<string, string>, keys: string[]) =>
  Object.fromEntries(Object.entries(query).filter(([key]) => !keys.includes(key)));

/**
 * @brief Listing page for a collection of articles (glossary, breakdowns, interviews...), with filters, search, sort and pagination.
 * @details Stateless: every interaction navigates to a new URL, and the server re-renders the filtered results.
 */
export const ContentIndex: React.FC<ContentIndexProps> = ({
  basePath,
  currentPage,
  currentQuery,
  currentSort,
  description,
  emptyStateMessage = 'Nothing matched your current filters or search. Clear them to see all entries.',
  filters,
  items,
  query,
  searchable = false,
  searchPlaceholder,
  showSpotlight = false,
  sortOptions,
  title,
  totalPages
}) => {
  const router = useRouter();
  const hasResults = items.length > 0;
  const hasActiveFilters = FILTER_KEYS.some((key) => key in query) || currentQuery.length > 0;
  const showSort = hasResults && sortOptions.length > 1;
  const showToolbar = searchable || showSort;
  const [spotlight, ...cards] = showSpotlight && currentPage === 1 && !hasActiveFilters ? items : [undefined, ...items];

  const pageHref = (page: number) => buildIndexHref(basePath, { ...query, page: page > 1 ? String(page) : undefined });

  const handleSortChange = (sort: string) => {
    const defaultSort = currentQuery.length > 0 ? RELEVANCE_SORT : DEFAULT_SORT;

    router.push(
      buildIndexHref(basePath, { ...withoutKeys(query, ['page']), sort: sort === defaultSort ? undefined : sort })
    );
  };

  const handleSearch = (nextQuery: string, options?: { replace?: boolean }) => {
    const baseQuery = withoutKeys(query, ['page', 'q']);

    // Switching from empty -> active search defaults to relevance; clearing search drops stale relevance sort.
    if (baseQuery['sort'] === RELEVANCE_SORT || (nextQuery && currentQuery === '' && baseQuery['sort'] === undefined)) {
      delete baseQuery['sort'];
    }

    const href = buildIndexHref(basePath, {
      ...baseQuery,
      q: nextQuery || undefined
    });

    if (options?.replace) {
      router.replace(href);
    } else {
      router.push(href);
    }
  };

  const handleApplyFilters = (selected: Record<string, string[]>) => {
    const selection = Object.fromEntries(Object.entries(selected).map(([key, values]) => [key, values.join(',')]));

    // Changing the filters always starts back from the first page.
    router.push(buildIndexHref(basePath, { ...withoutKeys(query, [...FILTER_KEYS, 'page']), ...selection }));
  };

  const handleClearFilters = () => {
    router.push(buildIndexHref(basePath, withoutKeys(query, [...FILTER_KEYS, 'page'])));
  };

  return (
    <Box paddingBlockEnd={{ narrow: 40, regular: 80 }}>
      <Grid className={styles.layoutGrid}>
        <Grid.Column span={12}>
          <Box marginBlockEnd={{ regular: 64 }} marginBlockStart={{ narrow: 64, regular: 112 }}>
            <Hero className='pbs-0! pbe-0!'>
              <Hero.Heading>{title}</Hero.Heading>
              <Hero.Description>{description}</Hero.Description>
            </Hero>
          </Box>
        </Grid.Column>

        <Grid.Column className={styles.filtersColumn} span={{ xsmall: 12, medium: 3 }}>
          <IndexFilters groups={filters} onApply={handleApplyFilters} onClear={handleClearFilters} />
        </Grid.Column>

        <Grid.Column span={{ xsmall: 12, medium: 9 }}>
          {showToolbar ? (
            <div className={styles.toolbar}>
              {searchable ? (
                <IndexSearch
                  currentQuery={currentQuery}
                  label={`Search ${title.toLowerCase()}`}
                  placeholder={searchPlaceholder ?? `Search ${title.toLowerCase()}...`}
                  onSearch={handleSearch}
                />
              ) : null}
              {showSort ? (
                <IndexSort currentSort={currentSort} sortOptions={sortOptions} onSortChange={handleSortChange} />
              ) : null}
            </div>
          ) : null}

          <Box marginBlockEnd={{ narrow: 32, regular: 48 }}>
            {hasResults ? (
              <Grid className={styles.cardGrid}>
                {spotlight ? (
                  <Grid.Column key={spotlight.slug} span={12}>
                    <IndexCard className={styles.spotlightCard} item={spotlight} />
                  </Grid.Column>
                ) : null}
                {cards.map((item) =>
                  item ? (
                    <Grid.Column key={item.slug} span={{ xsmall: 12, medium: 6 }}>
                      <IndexCard item={item} />
                    </Grid.Column>
                  ) : null
                )}
              </Grid>
            ) : (
              <EmptyStatePanel
                heading='No matching articles'
                message={emptyStateMessage}
                onReset={hasActiveFilters ? () => router.push(buildIndexHref(basePath, {})) : undefined}
              />
            )}
          </Box>

          {totalPages > 1 ? (
            <Box borderBlockStartWidth='thin' borderColor='default' borderStyle='solid' paddingBlockStart={28}>
              <Pagination
                showPages
                currentPage={currentPage}
                hrefBuilder={pageHref}
                pageCount={totalPages}
                onPageChange={(event, page) => {
                  event.preventDefault();
                  router.push(pageHref(page));
                }}
              />
            </Box>
          ) : null}
        </Grid.Column>
      </Grid>
    </Box>
  );
};

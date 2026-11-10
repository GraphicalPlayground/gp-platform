// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './content-index.module.css';

import { Box, Grid, Hero, Pagination, Text } from '@gp/ui/components';
import { IndexCard, IndexFilters, IndexSort } from './components';
import { DEFAULT_SORT, FILTER_KEYS, buildIndexHref } from './content-index.utils';
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
   * @brief Displays the first result as a full-width card on the first, unfiltered page.
   */
  showSpotlight?: boolean;
}

const withoutKeys = (query: Record<string, string>, keys: string[]) =>
  Object.fromEntries(Object.entries(query).filter(([key]) => !keys.includes(key)));

/**
 * @brief Listing page for a collection of articles (glossary, breakdowns, interviews...), with filters, sort and pagination.
 * @details Stateless: every interaction navigates to a new URL, and the server re-renders the filtered results.
 */
export const ContentIndex: React.FC<ContentIndexProps> = ({
  basePath,
  currentPage,
  currentSort,
  description,
  emptyStateMessage = 'No results found. Please clear your filters and try another search.',
  filters,
  items,
  query,
  showSpotlight = false,
  sortOptions,
  title,
  totalPages
}) => {
  const router = useRouter();
  const hasResults = items.length > 0;
  const hasActiveFilters = FILTER_KEYS.some((key) => key in query);
  const [spotlight, ...cards] = showSpotlight && currentPage === 1 && !hasActiveFilters ? items : [undefined, ...items];

  const pageHref = (page: number) => buildIndexHref(basePath, { ...query, page: page > 1 ? String(page) : undefined });

  const handleSortChange = (sort: string) => {
    router.push(
      buildIndexHref(basePath, { ...withoutKeys(query, ['page']), sort: sort === DEFAULT_SORT ? undefined : sort })
    );
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
          {hasResults && sortOptions.length > 1 ? (
            <IndexSort currentSort={currentSort} sortOptions={sortOptions} onSortChange={handleSortChange} />
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
              <Box className={styles.emptyStateWrapper} role='status'>
                <Text as='p' variant='muted'>
                  {emptyStateMessage}
                </Text>
              </Box>
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

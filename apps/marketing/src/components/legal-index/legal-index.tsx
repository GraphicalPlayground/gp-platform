// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Organization } from '@gp/constants';
import {
  Box,
  Button,
  CTABanner,
  Grid,
  Heading,
  Hero,
  InlineLink,
  Pagination,
  Pillar,
  Section,
  SectionIntro,
  Stack,
  Text
} from '@gp/ui/components';
import { AccessibilityIcon, LockIcon, ShieldLockIcon } from '@primer/octicons-react';
import { IndexFilters, IndexSearch, IndexSort } from '../content-index/components';
import { LegalCard } from './components';
import { DEFAULT_SORT, LEGAL_FILTER_KEYS, RELEVANCE_SORT, buildIndexHref } from './legal-index.utils';
import type { LegalIndexData } from './legal-index.utils';
import styles from './legal-index.module.css';

export interface LegalIndexProps extends LegalIndexData {
  title: string;
  description: string;
  basePath?: string;
  emptyStateMessage?: string;
}

const TRUST_PILLARS = [
  {
    icon: ShieldLockIcon,
    heading: 'Security & Vulnerability Disclosure',
    description:
      'Review the scope of systems we cover, how to report suspected vulnerabilities, and our protections for good-faith researchers.',
    href: '/legal/security-disclosure',
    linkLabel: 'Read disclosure policy'
  },
  {
    icon: AccessibilityIcon,
    heading: 'Accessibility Commitment',
    description:
      'Learn about our WCAG conformance targets across our websites and learning platform, known limitations, and how to report barriers.',
    href: '/legal/accessibility',
    linkLabel: 'Read accessibility statement'
  },
  {
    icon: LockIcon,
    heading: 'Institutional & GDPR Safeguards',
    description:
      'Review our GDPR Article 28 Data Processing Addendum and the infrastructure sub-processors used to operate the platform.',
    href: '/legal/data-processing',
    linkLabel: 'View data processing addendum'
  }
] as const;

const withoutKeys = (query: Record<string, string>, keys: string[]) =>
  Object.fromEntries(Object.entries(query).filter(([key]) => !keys.includes(key)));

/**
 * @brief Interactive Legal Overview & Index page with category/consent filtering, keyword search, sorting, and trust highlights.
 */
export const LegalIndex: React.FC<LegalIndexProps> = ({
  basePath = '/legal',
  currentPage,
  currentQuery,
  currentSort,
  description,
  emptyStateMessage = 'No legal documents match your current filters. Clear your filters and try another search.',
  filters,
  items,
  query,
  sortOptions,
  title,
  totalPages
}) => {
  const router = useRouter();
  const hasResults = items.length > 0;
  const hasActiveFilters = LEGAL_FILTER_KEYS.some((key) => key in query) || currentQuery.length > 0;
  const showSort = hasResults && sortOptions.length > 1;

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

    router.push(buildIndexHref(basePath, { ...withoutKeys(query, [...LEGAL_FILTER_KEYS, 'page']), ...selection }));
  };

  const handleClearFilters = () => {
    router.push(buildIndexHref(basePath, withoutKeys(query, [...LEGAL_FILTER_KEYS, 'page'])));
  };

  return (
    <>
      <Box paddingBlockEnd={{ narrow: 48, regular: 80 }}>
        <Grid className={styles.layoutGrid}>
          <Grid.Column span={12}>
            <Box marginBlockEnd={{ regular: 64 }} marginBlockStart={{ narrow: 64, regular: 112 }}>
              <Hero className={styles.hero}>
                <Hero.Label>Governance &amp; Compliance</Hero.Label>
                <Hero.Heading>{title}</Hero.Heading>
                <Hero.Description>{description}</Hero.Description>
              </Hero>
            </Box>
          </Grid.Column>

          <Grid.Column className={styles.filtersColumn} span={{ xsmall: 12, medium: 3 }}>
            <IndexFilters groups={filters} onApply={handleApplyFilters} onClear={handleClearFilters} />
          </Grid.Column>

          <Grid.Column span={{ xsmall: 12, medium: 9 }}>
            <Heading as='h2' className='sr-only'>
              Legal documents
            </Heading>

            <div className={styles.toolbar}>
              <IndexSearch
                currentQuery={currentQuery}
                label='Search legal documents'
                placeholder='Search legal documents...'
                onSearch={handleSearch}
              />
              {showSort ? (
                <IndexSort currentSort={currentSort} sortOptions={sortOptions} onSortChange={handleSortChange} />
              ) : null}
            </div>

            <Box marginBlockEnd={{ narrow: 32, regular: 48 }}>
              {hasResults ? (
                <Grid className={styles.cardGrid}>
                  {items.map((item) => (
                    <Grid.Column key={item.slug} span={{ xsmall: 12, medium: 6 }}>
                      <LegalCard item={item} />
                    </Grid.Column>
                  ))}
                </Grid>
              ) : (
                <Box className={styles.emptyStateWrapper} role='status'>
                  <Stack direction='vertical' gap={12} padding='none'>
                    <Text as='p' variant='muted'>
                      {emptyStateMessage}
                    </Text>
                    {hasActiveFilters ? (
                      <InlineLink
                        href={basePath}
                        onClick={(event) => {
                          event.preventDefault();
                          router.push(buildIndexHref(basePath, {}));
                        }}
                      >
                        Reset filters and search
                      </InlineLink>
                    ) : null}
                  </Stack>
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

      <Section fullWidth backgroundColor='subtle' paddingBlockEnd='normal' paddingBlockStart='normal'>
        <Grid className={styles.pillarsGrid}>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start' className={styles.sectionIntro}>
              <SectionIntro.Label>Trust &amp; Transparency</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                Built for transparency from day one
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Beyond our written agreements, see how we approach vulnerability disclosure, platform accessibility, and
                institutional data protection.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          {TRUST_PILLARS.map((pillar) => (
            <Grid.Column key={pillar.href} span={{ xsmall: 12, medium: 4 }}>
              <Pillar fullWidth className={styles.trustPillar}>
                <Pillar.Icon className={styles.trustPillarIcon} icon={pillar.icon} />
                <Pillar.Heading as='h3'>{pillar.heading}</Pillar.Heading>
                <Pillar.Description>{pillar.description}</Pillar.Description>
                <Pillar.Link arrowDirection='end' href={pillar.href}>
                  {pillar.linkLabel}
                </Pillar.Link>
              </Pillar>
            </Grid.Column>
          ))}
        </Grid>
      </Section>

      <Section fullWidth paddingBlockEnd='spacious' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <CTABanner hasBorder align='center' backgroundColor='subtle' variant='default'>
              <CTABanner.Heading as='h2'>Questions for our legal or privacy team?</CTABanner.Heading>
              <CTABanner.Description>
                Reach out for contractual inquiries, GDPR requests, or formal notices to {Organization.displayName} in{' '}
                {Organization.address.city}.
              </CTABanner.Description>
              <CTABanner.ButtonGroup>
                <Button as='a' href='/contact' variant='primary'>
                  Contact us
                </Button>
                <Button as='a' href={Organization.mailto('legal')} variant='secondary'>
                  Email {Organization.emails.legal}
                </Button>
              </CTABanner.ButtonGroup>
            </CTABanner>
          </Grid.Column>
        </Grid>
      </Section>
    </>
  );
};

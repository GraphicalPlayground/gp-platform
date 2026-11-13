// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { LegalFrontmatter, MdxDocument } from '@gp/content';
import { buildLegalIndex } from './legal-index.utils';

const semver = (value: string) => value as LegalFrontmatter['version'];

const makeDoc = (overrides: Partial<LegalFrontmatter>): MdxDocument<LegalFrontmatter> => {
  const slug = overrides.slug ?? 'sample-policy';

  return {
    slug,
    filePath: `/content/legal/${slug}.mdx`,
    relativePath: `${slug}.mdx`,
    rawContent: '',
    readingTimeMinutes: 2,
    frontmatter: {
      title: 'Sample Policy',
      slug,
      category: 'consumer',
      version: semver('0.1.0'),
      effectiveDate: new Date('2026-01-01T00:00:00Z'),
      summary: 'Sample summary for testing.',
      requiresExplicitConsent: false,
      locale: 'en',
      draft: false,
      ...overrides
    }
  };
};

const FIXTURE_DOCS: MdxDocument<LegalFrontmatter>[] = [
  makeDoc({
    slug: 'terms-of-service',
    title: 'Terms of Service',
    category: 'consumer',
    effectiveDate: new Date('2026-06-12T00:00:00Z'),
    requiresExplicitConsent: true,
    summary: 'Terms governing use of the platform.'
  }),
  makeDoc({
    slug: 'privacy',
    title: 'Privacy Policy',
    category: 'consumer',
    effectiveDate: new Date('2026-01-01T00:00:00Z'),
    requiresExplicitConsent: true,
    summary: 'Personal data rights and GDPR disclosures.'
  }),
  makeDoc({
    slug: 'data-processing',
    title: 'Data Processing Addendum',
    category: 'business',
    effectiveDate: new Date('2026-01-01T00:00:00Z'),
    updateDate: new Date('2026-07-01T00:00:00Z'),
    requiresExplicitConsent: false,
    summary: 'GDPR Article 28 processing terms for institutions.'
  }),
  makeDoc({
    slug: 'oss-notices',
    title: 'Open Source Software Notice',
    category: 'licensing',
    version: semver('1.0.0'),
    effectiveDate: new Date('2026-01-01T00:00:00Z'),
    requiresExplicitConsent: false,
    summary: 'Third-party license attributions.'
  })
];

describe('buildLegalIndex', () => {
  it('sorts by update/effective date descending and prioritizes explicit consent on ties', () => {
    const result = buildLegalIndex(FIXTURE_DOCS, {});

    assert.deepEqual(
      result.items.map((item) => item.slug),
      ['data-processing', 'terms-of-service', 'privacy', 'oss-notices']
    );
    assert.equal(result.allCount, 4);
    assert.equal(result.totalCount, 4);
  });

  it('filters by category and consent simultaneously', () => {
    const byCategory = buildLegalIndex(FIXTURE_DOCS, { category: 'business,licensing' });

    assert.deepEqual(
      byCategory.items.map((item) => item.slug),
      ['data-processing', 'oss-notices']
    );

    const byBoth = buildLegalIndex(FIXTURE_DOCS, { category: 'consumer', consent: 'explicit' });

    assert.deepEqual(
      byBoth.items.map((item) => item.slug),
      ['terms-of-service', 'privacy']
    );
  });

  it('matches keyword search with typo tolerance and defaults to relevance sort', () => {
    const result = buildLegalIndex(FIXTURE_DOCS, { q: 'privcy' });

    assert.equal(result.currentSort, 'relevance');
    assert.deepEqual(
      result.items.map((item) => item.slug),
      ['privacy']
    );
  });

  it('paginates results and clamps invalid page numbers', () => {
    const page2 = buildLegalIndex(FIXTURE_DOCS, { page: '2' }, { pageSize: 2 });
    const clamped = buildLegalIndex(FIXTURE_DOCS, { page: '99' }, { pageSize: 2 });

    assert.equal(page2.totalPages, 2);
    assert.equal(page2.currentPage, 2);
    assert.deepEqual(
      page2.items.map((item) => item.slug),
      ['privacy', 'oss-notices']
    );
    assert.equal(clamped.currentPage, 2);
  });
});

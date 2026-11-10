// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { Organization } from '@gp/constants';
import { SeoMetadata, Urls } from '@gp/seo';
import { LegalIndexPage } from '@/components/legal-index';
import type { SearchParams } from '@/components/legal-index';

const LEGAL_DESCRIPTION = `Terms of Service, Privacy Policy, licensing notices, and compliance commitments governing ${Organization.displayName}.`;

/**
 * @brief Metadata for the Legal overview/index page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/legal',
  title: 'Legal',
  description: LEGAL_DESCRIPTION
});

export default async function LegalPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return <LegalIndexPage description={LEGAL_DESCRIPTION} searchParams={await searchParams} title='Legal' />;
}

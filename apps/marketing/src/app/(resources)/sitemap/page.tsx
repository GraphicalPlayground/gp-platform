// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { Organization } from '@gp/constants';
import { JsonLdIds } from '@gp/seo/jsonld';
import { SeoMetadata } from '@gp/seo/metadata';
import { WebPageJsonLd } from '@gp/seo/react';
import { Urls } from '@gp/seo/utils';
import { UnderConstruction } from '@/components';

const SITEMAP_TITLE = 'Site Map';
const SITEMAP_DESCRIPTION = `Browse all ${Organization.displayName} product pages, learning archives, technical glossaries, community resources, and legal policies.`;

/**
 * @brief Metadata for the HTML Site Map page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/sitemap',
  title: SITEMAP_TITLE,
  description: SITEMAP_DESCRIPTION,
  keywords: [
    'Graphical Playground site map',
    'marketing routes',
    'graphics glossary index',
    'legal documents directory'
  ]
});

export default function SiteMapPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={{ '@id': JsonLdIds.website }}
        description={SITEMAP_DESCRIPTION}
        name={SITEMAP_TITLE}
        path='/sitemap'
      />
      <UnderConstruction
        description='A structured directory of every marketing, curriculum, product, legal, and ecosystem route across Graphical Playground is currently being assembled.'
        primaryAction={{ href: '/breakdowns', label: 'Explore breakdowns' }}
        route='/sitemap'
        secondaryAction={{ href: '/legal', label: 'Browse legal docs' }}
        section='Resources'
        title='Site Map'
        scope={[
          {
            detail: 'Direct navigation across gp-engine, gp-cloud, gp-studio, gp-platform, and gp-handbook',
            label: 'Platform & products index'
          },
          {
            detail: 'Links to breakdowns, guides, glossary terms, roadmaps, and showcases',
            label: 'Learning & research archive'
          },
          {
            detail: 'All policies, compliance addenda, and subdomain links',
            label: 'Governance & legal directory'
          }
        ]}
      />
    </>
  );
}

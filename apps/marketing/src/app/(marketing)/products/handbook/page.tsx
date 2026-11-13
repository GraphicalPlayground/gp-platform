// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { Repositories } from '@gp/constants';
import { JsonLdIds } from '@gp/seo/jsonld';
import { SeoMetadata } from '@gp/seo/metadata';
import { WebPageJsonLd } from '@gp/seo/react';
import { Urls } from '@gp/seo/utils';
import { UnderConstruction } from '@/components';

const HANDBOOK_TITLE = 'GP Handbook';

/**
 * @brief Metadata for the GP Handbook product page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/products/handbook',
  title: HANDBOOK_TITLE,
  description: Repositories.GpHandbook.description,
  keywords: [
    'GP Handbook',
    'gp-handbook',
    'graphics engineering handbook',
    'memory allocators',
    'graphics math foundations'
  ]
});

export default function ProductHandbookPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        description={Repositories.GpHandbook.description}
        name={HANDBOOK_TITLE}
        path='/products/handbook'
        mainEntity={{
          '@type': 'CreativeWork',
          'description': Repositories.GpHandbook.description,
          'isAccessibleForFree': true,
          'license': Repositories.GpHandbook.licenseUrl,
          'name': HANDBOOK_TITLE,
          'publisher': { '@id': JsonLdIds.organization },
          'sameAs': Repositories.GpHandbook.url,
          'url': `${Urls.BaseUrl}/products/handbook`
        }}
      />
      <UnderConstruction
        description={`${Repositories.GpHandbook.description} This dedicated product page is currently under construction.`}
        manifestLink={{ external: true, href: Repositories.GpHandbook.url, label: 'gp-handbook repo' }}
        parent={{ href: '/products', label: 'Products' }}
        primaryAction={{ external: true, href: Repositories.GpHandbook.url, label: 'Inspect gp-handbook on GitHub' }}
        route='/products/handbook'
        secondaryAction={{ href: '/glossary', label: 'Browse the glossary' }}
        section='Products'
        title='GP Handbook'
        scope={[
          {
            detail: 'Rendering theory connected directly to engine modules',
            label: 'Theory-to-implementation guide'
          },
          {
            detail: 'Memory allocators, platform abstractions, and math foundations',
            label: 'Engine patterns'
          },
          {
            detail: 'Linked glossary concepts and canonical industry literature',
            label: 'Reading cross-references'
          }
        ]}
      />
    </>
  );
}

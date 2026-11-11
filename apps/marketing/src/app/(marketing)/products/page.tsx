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

const PRODUCTS_TITLE = 'Products';
const PRODUCTS_DESCRIPTION = `Explore the ${Organization.displayName} ecosystem: GP Engine in C++23, GP Cloud OCI sandboxes, GP Studio frame debugger, GP Platform, and GP Handbook.`;

/**
 * @brief Metadata for the Products overview page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/products',
  title: PRODUCTS_TITLE,
  description: PRODUCTS_DESCRIPTION,
  keywords: ['Graphical Playground products', 'GP Engine', 'GP Cloud', 'GP Studio', 'GP Platform', 'GP Handbook']
});

export default function ProductsPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        description={PRODUCTS_DESCRIPTION}
        name={PRODUCTS_TITLE}
        path='/products'
        about={[
          { '@id': JsonLdIds.application('gp-platform') },
          { '@id': JsonLdIds.application('gp-engine') },
          { '@id': JsonLdIds.application('gp-docs') }
        ]}
      />
      <UnderConstruction
        description='An ecosystem overview connecting gp-engine, gp-cloud, gp-studio, gp-platform, and gp-handbook is currently under construction.'
        primaryAction={{ external: true, href: Organization.socials.github, label: 'Explore GitHub repositories' }}
        route='/products'
        secondaryAction={{ href: '/breakdowns', label: 'Explore breakdowns' }}
        section='Platform'
        title='Products'
        scope={[
          {
            detail: 'How gp-engine and gp-cloud compile and execute learner submissions',
            label: 'Core engine & runtime'
          },
          {
            detail: 'Interactive inspection in gp-studio paired with gp-handbook references',
            label: 'Visual workspace & guides'
          },
          {
            detail: 'Unified entry points across open-source and hosted surfaces',
            label: 'Architecture map'
          }
        ]}
      />
    </>
  );
}

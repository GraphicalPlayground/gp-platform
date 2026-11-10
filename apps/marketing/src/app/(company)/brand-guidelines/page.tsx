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

const BRAND_TITLE = 'Brand Guidelines';
const BRAND_DESCRIPTION = `Official logos, wordmarks, Mona Sans typography, and light and dark color tokens for ${Organization.displayName} contributors and partners.`;

/**
 * @brief Metadata for the Brand Guidelines page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/brand-guidelines',
  title: BRAND_TITLE,
  description: BRAND_DESCRIPTION,
  keywords: [
    'Graphical Playground brand guidelines',
    'GPlayd logo',
    'Mona Sans',
    'Hubot Sans',
    'Graphical Playground design tokens'
  ]
});

export default function BrandGuidelinesPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={{ '@id': JsonLdIds.organization }}
        description={BRAND_DESCRIPTION}
        name={BRAND_TITLE}
        path='/brand-guidelines'
      />
      <UnderConstruction
        description='We are documenting Graphical Playground wordmarks, Mona Sans typographic scales, light/dark surface tokens, and trademark rules for partners and contributors.'
        primaryAction={{ external: true, href: Organization.subdomain('docs'), label: 'Read documentation' }}
        route='/brand-guidelines'
        secondaryAction={{ href: '/', label: 'Return home' }}
        section='Company'
        title='Brand Guidelines'
        scope={[
          {
            detail: 'Icon, short, and long SVG assets with clear-space minimums',
            label: 'Brand marks & lockups'
          },
          {
            detail: 'Light and dark palette scales across canvas and accent roles',
            label: 'Color & contrast tokens'
          },
          {
            detail: 'Usage rules for Mona Sans, Hubot Sans, and Mona Sans Mono',
            label: 'Typographic specimen'
          }
        ]}
      />
    </>
  );
}

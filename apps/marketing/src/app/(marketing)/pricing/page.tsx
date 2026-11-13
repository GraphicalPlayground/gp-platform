// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { Organization } from '@gp/constants';
import { JsonLdIds } from '@gp/seo/jsonld';
import { SeoMetadata } from '@gp/seo/metadata';
import { JsonLd, WebPageJsonLd } from '@gp/seo/react';
import { Urls } from '@gp/seo/utils';
import { PricingView } from './pricing-view';

const PRICING_TITLE = 'Pricing';
const PRICING_DESCRIPTION = `Run ${Organization.displayName}, the full curriculum, and gp-engine locally for ${Organization.currencySymbol}0 ${Organization.currency} forever, or join the waitlist for browser-based OCI cloud GPUs and school cohort plans.`;
const PRICING_KEYWORDS = [
  'Graphical Playground pricing',
  'free graphics programming course',
  'learn graphics programming without a GPU',
  'cloud GPU rendering subscription',
  'OCI cloud GPU sandbox pricing',
  'local engine server C++23',
  'academic graphics engineering seats',
  'open-source graphics engine pricing'
];

const PRICING_CATALOG_JSON_LD: React.ComponentProps<typeof JsonLd>['data'] = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  '@id': `${Organization.url}/pricing/#catalog`,
  'name': `${Organization.displayName} Pricing Plans`,
  'description': PRICING_DESCRIPTION,
  'url': `${Organization.url}/pricing`,
  'itemListElement': [
    {
      '@type': 'Offer',
      'name': 'Open & Local',
      'description':
        'Open curriculum lessons, MIT-licensed gp-engine in C++23 and HLSL, and local engine server execution on your personal GPU.',
      'price': '0',
      'priceCurrency': Organization.currency,
      'availability': 'https://schema.org/InStock',
      'url': `${Organization.url}/pricing#plans`,
      'itemOffered': { '@id': JsonLdIds.application('gp-engine') },
      'seller': { '@id': JsonLdIds.organization }
    },
    {
      '@type': 'Offer',
      'name': 'Cloud GPU',
      'description':
        'Upcoming monthly cloud GPU subscription running isolated OCI containers directly in your browser without a dedicated workstation GPU. Exact EUR rates in finalization.',
      'priceCurrency': Organization.currency,
      'availability': 'https://schema.org/PreOrder',
      'url': `${Organization.url}/waitlist`,
      'itemOffered': { '@id': JsonLdIds.application('gp-platform') },
      'seller': { '@id': JsonLdIds.organization }
    },
    {
      '@type': 'Offer',
      'name': 'Schools & Teams',
      'description':
        'Custom cohort seat counts, cloud GPU quotas, academic terms, and onboarding for universities and engineering teams.',
      'priceCurrency': Organization.currency,
      'availability': 'https://schema.org/InStock',
      'url': Organization.mailto('sales'),
      'itemOffered': { '@id': JsonLdIds.application('gp-platform') },
      'seller': { '@id': JsonLdIds.organization }
    }
  ]
};

/**
 * @brief Metadata for the Pricing page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/pricing',
  title: PRICING_TITLE,
  description: PRICING_DESCRIPTION,
  keywords: PRICING_KEYWORDS
});

/**
 * @brief Server entry point for `/pricing`, emitting `WebPage`, `OfferCatalog`, and synced FAQ structured data.
 */
export default function PricingPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        description={PRICING_DESCRIPTION}
        keywords={PRICING_KEYWORDS}
        mainEntity={{ '@id': JsonLdIds.application('gp-platform') }}
        name={PRICING_TITLE}
        path='/pricing'
        about={[
          { '@id': JsonLdIds.application('gp-platform') },
          { '@id': JsonLdIds.application('gp-engine') },
          { '@id': JsonLdIds.organization },
          { '@id': JsonLdIds.contact('sales') },
          { '@id': JsonLdIds.contact('billing') }
        ]}
      />
      <JsonLd data={PRICING_CATALOG_JSON_LD} />
      <PricingView title={PRICING_TITLE} />
    </>
  );
}

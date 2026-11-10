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

const PRICING_TITLE = 'Pricing';
const PRICING_DESCRIPTION = `Run the open-source ${Organization.displayName} curriculum for free on your own GPU or subscribe to containerized cloud rendering for low-spec hardware.`;

/**
 * @brief Metadata for the Pricing page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/pricing',
  title: PRICING_TITLE,
  description: PRICING_DESCRIPTION,
  keywords: [
    'Graphical Playground pricing',
    'free graphics programming course',
    'cloud GPU rendering plan',
    'local engine server'
  ]
});

export default function PricingPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        description={PRICING_DESCRIPTION}
        mainEntity={{ '@id': JsonLdIds.application('gp-platform') }}
        name={PRICING_TITLE}
        path='/pricing'
      />
      <UnderConstruction
        description='Subscription tiers for containerized cloud rendering are currently being finalized. Both gp-engine and the core learning curriculum remain open source, including local engine server support.'
        primaryAction={{ href: '/waitlist', label: 'Join the waitlist' }}
        route='/pricing'
        secondaryAction={{ href: '/breakdowns', label: 'Explore breakdowns' }}
        section='Platform'
        title='Pricing'
        scope={[
          {
            detail: 'GPU compute quotas for browser-based Vulkan sessions',
            label: 'Cloud rendering plans'
          },
          {
            detail: 'Run the full curriculum on your own GPU with zero subscription',
            label: 'Local engine server'
          },
          {
            detail: 'Institutional seats and educational terms',
            label: 'Academic & student access'
          }
        ]}
      />
    </>
  );
}

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

const DONATE_TITLE = 'Donate';
const DONATE_DESCRIPTION = `Fund cloud GPU servers, domains, and open-source graphics engineering education through one-time or recurring donations to ${Organization.displayName}.`;

/**
 * @brief Metadata for the Donate page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/donate',
  title: DONATE_TITLE,
  description: DONATE_DESCRIPTION,
  keywords: ['donate Graphical Playground', 'support open-source graphics', 'fund cloud GPU education']
});

export default function DonatePage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={{ '@id': JsonLdIds.organization }}
        description={DONATE_DESCRIPTION}
        name={DONATE_TITLE}
        path='/donate'
      />
      <UnderConstruction
        description='Direct contribution flows and expense transparency breakdowns are currently in development to help offset cloud rendering servers, domains, and curriculum production.'
        primaryAction={{ external: true, href: Organization.socials.github, label: 'Explore GitHub repositories' }}
        route='/donate'
        secondaryAction={{ external: true, href: Organization.socials.discord, label: 'Join Discord' }}
        section='Company'
        title='Donate'
        scope={[
          {
            detail: 'One-time and recurring monthly community support',
            label: 'Contribution checkout'
          },
          {
            detail: 'Breakdown of GPU hosting, domains, and contributor bounties',
            label: 'Fund allocation'
          },
          {
            detail: 'Automatic acknowledgment synchronized with DONORS.md',
            label: 'Donor ledger'
          }
        ]}
      />
    </>
  );
}

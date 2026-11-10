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

const SPONSORS_TITLE = 'Sponsors';
const SPONSORS_DESCRIPTION = `Partner with ${Organization.displayName} to sponsor cloud GPU compute grants and hardware-free real-time graphics education for students.`;

/**
 * @brief Metadata for the Sponsors page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/sponsors',
  title: SPONSORS_TITLE,
  description: SPONSORS_DESCRIPTION,
  keywords: ['sponsor Graphical Playground', 'cloud GPU sponsorship', 'graphics education partners']
});

export default function SponsorsPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={{ '@id': JsonLdIds.organization }}
        description={SPONSORS_DESCRIPTION}
        name={SPONSORS_TITLE}
        path='/sponsors'
      />
      <UnderConstruction
        description='We are building the public sponsor showcase and partnership tiers for organizations helping keep real-time graphics education hardware-independent.'
        primaryAction={{ href: Organization.mailto('sponsor'), label: `Email ${Organization.emails.sponsor}` }}
        route='/sponsors'
        secondaryAction={{ external: true, href: Organization.socials.github, label: 'View GitHub organization' }}
        section='Company'
        title='Our Sponsors'
        scope={[
          {
            detail: 'Infrastructure grants, cloud GPU sponsorship, and curriculum backing',
            label: 'Partnership tiers'
          },
          {
            detail: 'Partner showcase synced with release attributions',
            label: 'Public recognition ledger'
          },
          {
            detail: 'How sponsor contributions fund compute and open tooling',
            label: 'Stewardship model'
          }
        ]}
      />
    </>
  );
}

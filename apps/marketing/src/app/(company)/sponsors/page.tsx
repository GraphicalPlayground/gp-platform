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
import { SponsorsView } from './sponsors-view';

const SPONSORS_TITLE = 'Sponsors';
const SPONSORS_DESCRIPTION = `Sponsor ${Organization.displayName} via GitHub Sponsors, direct donations, Open Collective, Buy Me A Coffee, or Thanks Dev to pay for cloud GPU workers and keep graphics education open. View our founding contributors and open sponsor tiers.`;

/**
 * @brief Metadata for the Sponsors page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/sponsors',
  title: SPONSORS_TITLE,
  description: SPONSORS_DESCRIPTION,
  keywords: [
    'sponsor Graphical Playground',
    'GitHub Sponsors GraphicalPlayground',
    'donate Graphical Playground',
    'Open Collective graphical-playground',
    'Buy Me A Coffee GraphicalPlayground',
    'Thanks Dev GraphicalPlayground',
    'cloud GPU sponsorship',
    'graphics education partners',
    'open-source graphics contributors'
  ]
});

/**
 * @brief Server entry point for `/sponsors`, emitting WebPage JSON-LD and rendering the sponsors view.
 */
export default function SponsorsPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        description={SPONSORS_DESCRIPTION}
        mainEntity={{ '@id': JsonLdIds.organization }}
        name={SPONSORS_TITLE}
        path='/sponsors'
        about={[
          { '@id': JsonLdIds.organization },
          { '@id': JsonLdIds.application('gp-platform') },
          { '@id': JsonLdIds.application('gp-engine') },
          { '@id': JsonLdIds.contact('sponsor') }
        ]}
      />
      <SponsorsView title='Our Sponsors' />
    </>
  );
}

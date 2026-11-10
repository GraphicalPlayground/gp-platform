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

const ABOUT_TITLE = 'About Us';
const ABOUT_DESCRIPTION = `Learn how five engineers from EPITECH Lyon built ${Organization.displayName}, the open-source C++23 graphics engine and cloud e-learning platform.`;

/**
 * @brief Metadata for the About page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/about',
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  keywords: [
    'Graphical Playground team',
    'EPITECH Innovative Project',
    'open-source graphics education',
    'gp-engine founders',
    'See the Concept Before the Code'
  ]
});

export default function AboutPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        description={ABOUT_DESCRIPTION}
        mainEntity={{ '@id': JsonLdIds.organization }}
        name={ABOUT_TITLE}
        path='/about'
        type='AboutPage'
        about={[
          { '@id': JsonLdIds.organization },
          { '@id': JsonLdIds.person('mallory-scotton') },
          { '@id': JsonLdIds.person('hugo-cathelain') },
          { '@id': JsonLdIds.person('nathan-fievet') },
          { '@id': JsonLdIds.person('ossan-msoili') },
          { '@id': JsonLdIds.person('raphael-ostier') }
        ]}
      />
      <UnderConstruction
        description='Our team overview, origins as an EPITECH Innovative Project, and the "See the Concept Before the Code" philosophy are currently being compiled for this page.'
        primaryAction={{ href: '/breakdowns', label: 'Read technical breakdowns' }}
        route='/about'
        secondaryAction={{ external: true, href: Organization.socials.github, label: 'View GitHub organization' }}
        section='Company'
        title='About'
        scope={[
          {
            detail: 'Five engineers building graphics systems, multiplayer runtimes, and tools',
            label: 'Founding team'
          },
          {
            detail: 'Visual pipeline diagrams before shader and C++23 implementation',
            label: 'Pedagogical model'
          },
          {
            detail: 'Shared architecture across gp-engine, gp-platform, and gp-docs',
            label: 'Open ecosystem'
          }
        ]}
      />
    </>
  );
}

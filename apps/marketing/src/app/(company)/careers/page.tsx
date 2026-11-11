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

const CAREERS_TITLE = 'Careers';
const CAREERS_DESCRIPTION = `Engineering roles and open-source contributor pathways across C++23 rendering, cloud GPU infrastructure, and graphics curriculum at ${Organization.displayName}.`;

/**
 * @brief Metadata for the Careers page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/careers',
  title: CAREERS_TITLE,
  description: CAREERS_DESCRIPTION,
  keywords: [
    'Graphical Playground careers',
    'graphics programming jobs',
    'C++23 open source contributor',
    'rendering engineer roles'
  ]
});

export default function CareersPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={{ '@id': JsonLdIds.organization }}
        description={CAREERS_DESCRIPTION}
        name={CAREERS_TITLE}
        path='/careers'
      />
      <UnderConstruction
        description={`Our open roles board and paid contributor pathways are currently being built. Every core repository is open source if you want to collaborate or write to ${Organization.emails.careers}.`}
        primaryAction={{ href: Organization.mailto('careers'), label: `Email ${Organization.emails.careers}` }}
        route='/careers'
        secondaryAction={{ external: true, href: Organization.socials.github, label: 'Explore GitHub repos' }}
        section='Company'
        title='Careers'
        scope={[
          {
            detail: 'Rendering, platform systems, and curriculum engineering positions',
            label: 'Open roles directory'
          },
          {
            detail: 'Paid and voluntary open-source contribution tracks',
            label: 'Contributor pathways'
          },
          {
            detail: 'How the team builds across C++23 and Next.js repositories',
            label: 'Engineering culture'
          }
        ]}
      />
    </>
  );
}

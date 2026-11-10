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

const EVENTS_TITLE = 'Events';
const EVENTS_DESCRIPTION = `Graphics programming workshops, shader sessions, SIGGRAPH notes, and community talks hosted by ${Organization.displayName}.`;

/**
 * @brief Metadata for the Events page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/events',
  title: EVENTS_TITLE,
  description: EVENTS_DESCRIPTION,
  keywords: [
    'Graphical Playground events',
    'graphics programming workshops',
    'SIGGRAPH notes',
    'shader programming sessions'
  ]
});

export default function EventsPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={{ '@id': JsonLdIds.organization }}
        description={EVENTS_DESCRIPTION}
        name={EVENTS_TITLE}
        path='/events'
      />
      <UnderConstruction
        description='A schedule of graphics programming workshops, conference notes, and community sessions is currently under construction.'
        parent={{ href: '/community', label: 'Community' }}
        primaryAction={{ external: true, href: Organization.socials.discord, label: 'Join Discord' }}
        route='/events'
        secondaryAction={{ href: '/showcases', label: 'Explore showcases' }}
        section='Community'
        title='Events'
        scope={[
          {
            detail: 'Guided sessions on shader authoring and engine subsystem architecture',
            label: 'Upcoming workshops'
          },
          {
            detail: 'Presentations, SIGGRAPH notes, and academic outreach',
            label: 'Conferences & talks'
          },
          {
            detail: 'Slides, recordings, and accompanying breakdown articles',
            label: 'Session archive'
          }
        ]}
      />
    </>
  );
}

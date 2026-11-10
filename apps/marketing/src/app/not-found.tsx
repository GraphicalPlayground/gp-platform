// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { Organization } from '@gp/constants';
import { SeoMetadata } from '@gp/seo/metadata';
import { Urls } from '@gp/seo/utils';
import { ROUTE_STATE_COMMON_CARDS, RouteStateView } from '@/components/route-state';

export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/404',
  title: 'Page Not Found',
  description: 'There is no page at this address on Graphical Playground.',
  noindex: true
});

/**
 * @brief Renders the 404 Not Found page when a requested route or article slug does not exist.
 */
export default function NotFound() {
  return (
    <RouteStateView
      showPathname
      description='There is no page at this address. Check the URL for typos, or go back to the homepage.'
      statusCode='HTTP 404'
      statusIcon='search'
      statusLabel='Not found'
      statusTone='blue'
      title='Page not found'
      breadcrumbs={[
        { href: '/', label: 'Home' },
        { href: '/404', label: '404' }
      ]}
      destinations={{
        description: 'These sections are open to read right now.',
        heading: 'Explore Graphical Playground',
        items: [ROUTE_STATE_COMMON_CARDS.breakdowns, ROUTE_STATE_COMMON_CARDS.glossary, ROUTE_STATE_COMMON_CARDS.faq],
        label: 'Available pages'
      }}
      panel={{
        footerLink: {
          href: '/faq',
          kind: 'link',
          label: 'Read FAQ'
        },
        footerText: `Status 404 · ${Organization.shortName}`,
        heading: 'Where to check next',
        items: [
          'Check the web address for typos or an outdated bookmark.',
          'Read engineering write-ups in technical breakdowns or the graphics glossary.',
          `Email ${Organization.emails.support} if a link on this site sent you here.`
        ],
        token: '404'
      }}
      primaryAction={{
        href: '/',
        kind: 'link',
        label: 'Go to homepage'
      }}
      secondaryAction={{
        href: '/breakdowns',
        kind: 'link',
        label: 'Browse breakdowns'
      }}
    />
  );
}

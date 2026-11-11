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
  path: '/403',
  title: 'Access Forbidden',
  description: 'You do not have permission to open this page on Graphical Playground.',
  noindex: true
});

/**
 * @brief Renders the HTTP 403 Forbidden page when an authenticated user lacks permission.
 */
export default function Forbidden() {
  return (
    <RouteStateView
      showPathname
      description='Your current account cannot view this resource. Sign in with another account if you expected access, or return to the homepage.'
      statusCode='HTTP 403'
      statusIcon='shield-lock'
      statusLabel='Access restricted'
      statusTone='red'
      title='You do not have permission to open this page'
      breadcrumbs={[
        { href: '/', label: 'Home' },
        { href: '/403', label: '403' }
      ]}
      destinations={{
        description: 'Our technical writing, glossary, and documentation stay open without special permissions.',
        heading: 'Open sections you can browse',
        items: [ROUTE_STATE_COMMON_CARDS.breakdowns, ROUTE_STATE_COMMON_CARDS.glossary, ROUTE_STATE_COMMON_CARDS.docs],
        label: 'Public pages'
      }}
      panel={{
        footerLink: {
          href: Organization.mailto('support'),
          kind: 'link',
          label: 'Contact support'
        },
        footerText: `Access control · ${Organization.shortName}`,
        heading: 'Why this happened',
        items: [
          'Some pages are limited to staff accounts or invited workspaces.',
          'You may be signed into a different account than the one with permission.',
          `Email ${Organization.emails.support} if you believe your access should be enabled.`
        ],
        token: '403'
      }}
      primaryAction={{
        href: '/',
        kind: 'link',
        label: 'Go to homepage'
      }}
      secondaryAction={{
        href: '/sign-in',
        kind: 'link',
        label: 'Switch account'
      }}
    />
  );
}

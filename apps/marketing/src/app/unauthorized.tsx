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
  path: '/401',
  title: 'Sign In Required',
  description: 'Sign in to open this page on Graphical Playground.',
  noindex: true
});

/**
 * @brief Renders the HTTP 401 Unauthorized page when a visitor must sign in first.
 */
export default function Unauthorized() {
  return (
    <RouteStateView
      showPathname
      description='This page requires an active Graphical Playground session. Sign in to continue, or head back to the public site.'
      statusCode='HTTP 401'
      statusIcon='lock'
      statusLabel='Sign-in required'
      statusTone='purple'
      title='Sign in to open this page'
      breadcrumbs={[
        { href: '/', label: 'Home' },
        { href: '/401', label: '401' }
      ]}
      destinations={{
        description: 'Read our public engine write-ups, glossary entries, and legal policies.',
        heading: 'Browse without signing in',
        items: [ROUTE_STATE_COMMON_CARDS.breakdowns, ROUTE_STATE_COMMON_CARDS.glossary, ROUTE_STATE_COMMON_CARDS.legal],
        label: 'Public pages'
      }}
      panel={{
        footerLink: {
          href: '/waitlist',
          kind: 'link',
          label: 'Join waitlist'
        },
        footerText: `Authentication · ${Organization.shortName}`,
        heading: 'Account options',
        items: [
          'Sign in with your email or connected OAuth provider to restore your session.',
          'Need an account? Open the sign-up or waitlist page to request access.',
          'Public guides, breakdowns, and legal notices do not require an account.'
        ],
        token: '401'
      }}
      primaryAction={{
        href: '/sign-in',
        kind: 'link',
        label: 'Sign in'
      }}
      secondaryAction={{
        href: '/',
        kind: 'link',
        label: 'Go to homepage'
      }}
    />
  );
}

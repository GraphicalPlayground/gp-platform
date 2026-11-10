// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useEffect } from 'react';
import { Organization } from '@gp/constants';
import { InlineCode } from '@gp/ui/components';
import { ROUTE_STATE_COMMON_CARDS, RouteStateView } from '@/components/route-state';

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry?: () => void;
}

/**
 * @brief Route-level error boundary fallback rendered when a marketing segment throws.
 */
export default function ErrorPage({ error, reset, unstable_retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    if (unstable_retry) {
      unstable_retry();

      return;
    }

    reset();
  };

  return (
    <RouteStateView
      description='Something failed while loading this page. Try reloading the route, or go back to the homepage.'
      diagnosticBadge={error.digest ? `Ref: ${error.digest}` : undefined}
      statusCode='Application error'
      statusIcon='alert'
      statusLabel='Page error'
      statusTone='red'
      title='This page ran into an error'
      breadcrumbs={[
        { href: '/', label: 'Home' },
        { href: '#error', label: 'Error' }
      ]}
      destinations={{
        description: 'Check platform uptime or read another section while this page recovers.',
        heading: 'Other places to check',
        items: [ROUTE_STATE_COMMON_CARDS.status, ROUTE_STATE_COMMON_CARDS.breakdowns, ROUTE_STATE_COMMON_CARDS.github],
        label: 'Helpful links'
      }}
      panel={{
        footerLink: {
          external: true,
          href: Organization.subdomain('status'),
          kind: 'link',
          label: 'System status'
        },
        footerText: `Error boundary · ${Organization.shortName}`,
        heading: 'Recovery steps',
        items: [
          'Select Try again to fetch and render this page once more.',
          'Check the status page to see if there is an active service incident.',
          error.digest ? (
            <>
              Include reference <InlineCode wrap={false}>{error.digest}</InlineCode> when emailing{' '}
              {Organization.emails.support}.
            </>
          ) : (
            `Send the URL to ${Organization.emails.support} if this keeps repeating.`
          )
        ],
        token: 'ERR'
      }}
      primaryAction={{
        icon: 'reload',
        kind: 'button',
        label: 'Try again',
        onClick: handleRetry
      }}
      secondaryAction={{
        href: '/',
        kind: 'link',
        label: 'Go to homepage'
      }}
    />
  );
}

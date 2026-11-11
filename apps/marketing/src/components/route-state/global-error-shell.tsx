// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { Organization } from '@gp/constants';
import { Box, BrandIcon, InlineCode, InlineLink, Stack, Text } from '@gp/ui/components';
import { ROUTE_STATE_COMMON_CARDS } from './route-state.presets';
import { RouteStateView } from './route-state-view';
import styles from './route-state.module.css';

export interface GlobalErrorShellProps {
  digest?: string;
  onRetry: () => void;
}

/**
 * @brief Self-contained global error shell used when the root layout fails and replaces `RootLayout`.
 */
export const GlobalErrorShell: React.FC<GlobalErrorShellProps> = ({ digest, onRetry }) => {
  const currentYear = new Date().getFullYear();

  const handleHardHome = () => {
    window.location.assign('/');
  };

  const timelineItems: React.ReactNode[] = [
    'Reload the page to reset the layout and fetch a clean copy.',
    'Check the system status page if Graphical Playground stays unreachable.',
    digest ? (
      <>
        Include reference <InlineCode wrap={false}>{digest}</InlineCode> when emailing {Organization.emails.support}.
      </>
    ) : (
      `Send the page URL to ${Organization.emails.support} if this keeps failing.`
    )
  ];

  return (
    <Box className={styles.globalFrame}>
      <header className={styles.globalHeader}>
        <Box className={styles.globalHeaderInner}>
          <Stack
            alignItems='center'
            direction='horizontal'
            flexWrap='wrap'
            gap={16}
            justifyContent='space-between'
            padding='none'
          >
            <InlineLink
              href='/'
              onClick={(event) => {
                event.preventDefault();
                handleHardHome();
              }}
            >
              <Stack alignItems='center' direction='horizontal' gap={12} padding='none'>
                <BrandIcon aria-hidden='true' fill='currentColor' height={24} variant='icon' />
                <Text as='span' size='200' weight='semibold'>
                  {Organization.displayName}
                </Text>
              </Stack>
            </InlineLink>

            <InlineLink href={Organization.subdomain('status')} rel='noopener noreferrer' target='_blank'>
              System status
            </InlineLink>
          </Stack>
        </Box>
      </header>

      <main className={styles.globalMain}>
        <RouteStateView
          description='A root layout error interrupted rendering before the page finished loading. Reload the page to start a fresh session.'
          diagnosticBadge={digest ? `Ref: ${digest}` : undefined}
          statusCode='Root layout error'
          statusIcon='alert'
          statusLabel='Application error'
          statusTone='red'
          title='The site could not load'
          destinations={{
            description: 'These external links stay available outside the main marketing shell.',
            heading: 'Check status or source',
            items: [ROUTE_STATE_COMMON_CARDS.status, ROUTE_STATE_COMMON_CARDS.docs, ROUTE_STATE_COMMON_CARDS.github],
            label: 'External resources'
          }}
          panel={{
            footerLink: {
              external: true,
              href: Organization.subdomain('status'),
              kind: 'link',
              label: 'System status'
            },
            footerText: `Root recovery · ${Organization.shortName}`,
            heading: 'What you can do',
            items: timelineItems,
            token: '500'
          }}
          primaryAction={{
            icon: 'reload',
            kind: 'button',
            label: 'Reload page',
            onClick: onRetry
          }}
          secondaryAction={{
            icon: 'arrow',
            kind: 'button',
            label: 'Go to homepage',
            onClick: handleHardHome
          }}
        />
      </main>

      <footer className={styles.globalFooter}>
        <Box className={styles.globalFooterInner}>
          <Stack
            alignItems='center'
            direction='horizontal'
            flexWrap='wrap'
            gap={12}
            justifyContent='space-between'
            padding='none'
          >
            <Text as='span' size='100' variant='muted'>
              &copy; {currentYear} {Organization.legalName}
            </Text>
            <Stack direction='horizontal' flexWrap='wrap' gap={16} padding='none'>
              <InlineLink href={Organization.subdomain('status')} rel='noopener noreferrer' target='_blank'>
                Status
              </InlineLink>
              <InlineLink href={Organization.socials.github} rel='noopener noreferrer' target='_blank'>
                GitHub
              </InlineLink>
              <InlineLink href={Organization.mailto('support')}>Support</InlineLink>
            </Stack>
          </Stack>
        </Box>
      </footer>
    </Box>
  );
};

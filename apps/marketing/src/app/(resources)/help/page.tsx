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

const HELP_TITLE = 'Help Center';
const HELP_DESCRIPTION = `Setup guides, local engine server walkthroughs, cloud rendering troubleshooting, and direct support options for ${Organization.displayName}.`;

/**
 * @brief Metadata for the Help Center page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/help',
  title: HELP_TITLE,
  description: HELP_DESCRIPTION,
  keywords: [
    'Graphical Playground help',
    'local engine server setup',
    'cloud rendering troubleshooting',
    'support@graphical-playground.com'
  ]
});

export default function HelpPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={{ '@id': JsonLdIds.organization }}
        description={HELP_DESCRIPTION}
        name={HELP_TITLE}
        path='/help'
      />
      <UnderConstruction
        description='Troubleshooting guides, local engine setup walkthroughs, and support routing are being compiled here. Platform docs and support email remain available now.'
        primaryAction={{ external: true, href: Organization.subdomain('docs'), label: 'Read documentation' }}
        route='/help'
        secondaryAction={{ href: Organization.mailto('support'), label: `Email ${Organization.emails.support}` }}
        section='Resources'
        title='Help Center'
        scope={[
          {
            detail: 'Cloud rendering sessions, browser support, and local engine server setup',
            label: 'Environment troubleshooting'
          },
          {
            detail: 'Waitlist, authentication, and workspace configuration guidance',
            label: 'Account & access'
          },
          {
            detail: 'Status monitoring, documentation links, and support email routing',
            label: 'Direct support paths'
          }
        ]}
      />
    </>
  );
}

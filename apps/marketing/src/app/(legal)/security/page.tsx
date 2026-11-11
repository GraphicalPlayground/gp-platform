// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { JsonLdIds } from '@gp/seo/jsonld';
import { SeoMetadata } from '@gp/seo/metadata';
import { WebPageJsonLd } from '@gp/seo/react';
import { Urls } from '@gp/seo/utils';
import { SecurityView } from './security-view';

const SECURITY_TITLE = 'Security & Vulnerability Disclosure';
const SECURITY_DESCRIPTION =
  'Report security vulnerabilities to Graphical Playground, review in-scope platform systems, response timelines, and coordinated safe harbor protections.';

/**
 * @brief Metadata for the Security & Vulnerability Disclosure page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/security',
  title: SECURITY_TITLE,
  description: SECURITY_DESCRIPTION,
  keywords: [
    'Graphical Playground security',
    'vulnerability disclosure policy',
    'security.txt',
    'coordinated disclosure',
    'security@graphical-playground.com'
  ]
});

/**
 * @brief Security overview and vulnerability disclosure entry point referenced by `SECURITY.md` and `/.well-known/security.txt`.
 */
export default function SecurityPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={{ '@id': JsonLdIds.organization }}
        description={SECURITY_DESCRIPTION}
        name={SECURITY_TITLE}
        path='/security'
      />
      <SecurityView title={SECURITY_TITLE} />
    </>
  );
}

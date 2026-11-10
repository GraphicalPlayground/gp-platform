// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { JsonLdIds } from '@gp/seo/jsonld';
import { SeoMetadata } from '@gp/seo/metadata';
import { WebPageJsonLd } from '@gp/seo/react';
import { Urls } from '@gp/seo/utils';
import { AccessibilityView } from './accessibility-view';

const ACCESSIBILITY_TITLE = 'Accessibility';
const ACCESSIBILITY_DESCRIPTION =
  'WCAG 2.1 Level AA target, RGAA 4.1 assessment status, known shader and editor limitations, and barrier reporting at Graphical Playground.';

/**
 * @brief Metadata for the Accessibility overview page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/accessibility',
  title: ACCESSIBILITY_TITLE,
  description: ACCESSIBILITY_DESCRIPTION,
  keywords: [
    'Graphical Playground accessibility',
    'WCAG 2.1 AA',
    'RGAA 4.1',
    'EN 301 549',
    'accessibility@graphical-playground.com'
  ]
});

/**
 * @brief Accessibility overview page summarizing Graphical Playground's conformance target and barrier reporting process.
 */
export default function AccessibilityPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={{ '@id': JsonLdIds.organization }}
        description={ACCESSIBILITY_DESCRIPTION}
        name={ACCESSIBILITY_TITLE}
        path='/accessibility'
      />
      <AccessibilityView title={ACCESSIBILITY_TITLE} />
    </>
  );
}

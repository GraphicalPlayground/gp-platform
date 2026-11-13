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
import { CertificationsView } from './certifications-view';

const CERTIFICATIONS_TITLE = 'Certifications';
const CERTIFICATIONS_DESCRIPTION = `Project-based graphics engineering certifications under development at ${Organization.displayName}, verifiable by certificate ID to help candidates stand out, support reviewers, and fund open platform infrastructure.`;

/**
 * @brief Metadata for the Certifications page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/certifications',
  title: CERTIFICATIONS_TITLE,
  description: CERTIFICATIONS_DESCRIPTION,
  keywords: [
    'Graphical Playground certifications',
    'graphics programming certification',
    'project-based rendering credential',
    'verify certificate ID',
    'HLSL shader certification',
    'C++23 graphics portfolio'
  ]
});

/**
 * @brief Server entry point for `/certifications`, emitting structured JSON-LD and rendering the interactive certifications view.
 */
export default function CertificationsPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        description={CERTIFICATIONS_DESCRIPTION}
        mainEntity={{ '@id': JsonLdIds.organization }}
        name={CERTIFICATIONS_TITLE}
        path='/certifications'
        about={[
          { '@id': JsonLdIds.organization },
          { '@id': JsonLdIds.application('gp-platform') },
          { '@id': JsonLdIds.application('gp-engine') }
        ]}
      />
      <CertificationsView title={CERTIFICATIONS_TITLE} />
    </>
  );
}

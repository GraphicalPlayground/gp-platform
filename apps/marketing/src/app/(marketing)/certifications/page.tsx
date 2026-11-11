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

const CERTIFICATIONS_TITLE = 'Certifications';
const CERTIFICATIONS_DESCRIPTION = `Earn project-based graphics engineering certifications backed by real rendering code, public showcases, and studio-aligned review criteria on ${Organization.displayName}.`;

/**
 * @brief Metadata for the Certifications page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/certifications',
  title: CERTIFICATIONS_TITLE,
  description: CERTIFICATIONS_DESCRIPTION,
  keywords: [
    'graphics programming certification',
    'project-based rendering credential',
    'AAA graphics portfolio',
    'Vulkan certification'
  ]
});

export default function CertificationsPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={{ '@id': JsonLdIds.organization }}
        description={CERTIFICATIONS_DESCRIPTION}
        name={CERTIFICATIONS_TITLE}
        path='/certifications'
      />
      <UnderConstruction
        description='We are building a project-based certification system tied to concrete rendering projects rather than multiple-choice exams. Full credential guidelines and verification details are currently under construction.'
        primaryAction={{ href: '/showcases', label: 'Explore showcases' }}
        route='/certifications'
        secondaryAction={{ href: '/breakdowns', label: 'Read technical breakdowns' }}
        section='Solutions'
        title='Certifications'
        scope={[
          {
            detail: 'Credentials earned by building real rendering systems rather than multiple-choice tests',
            label: 'Project-based verification'
          },
          {
            detail: 'Certificates linked directly to published project showcases and source repositories',
            label: 'Public proof & showcases'
          },
          {
            detail: 'Curriculum standards reviewed with graphics engineers for industry recognition',
            label: 'Studio endorsement model'
          }
        ]}
      />
    </>
  );
}

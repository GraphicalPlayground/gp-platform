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

const FEATURES_TITLE = 'Features';
const FEATURES_DESCRIPTION = `Interactive render-pipeline diagrams, browser shader compilation, OCI cloud GPU execution, and project certifications on ${Organization.displayName}.`;

/**
 * @brief Metadata for the Features page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/features',
  title: FEATURES_TITLE,
  description: FEATURES_DESCRIPTION,
  keywords: [
    'graphics programming platform features',
    'interactive pipeline diagrams',
    'browser shader compiler',
    'cloud GPU Vulkan',
    'project certifications'
  ]
});

export default function FeaturesPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={[{ '@id': JsonLdIds.application('gp-platform') }, { '@id': JsonLdIds.application('gp-engine') }]}
        description={FEATURES_DESCRIPTION}
        mainEntity={{ '@id': JsonLdIds.application('gp-platform') }}
        name={FEATURES_TITLE}
        path='/features'
      />
      <UnderConstruction
        description='A complete tour of interactive pipeline diagrams, live shader compilation, cloud GPU execution, and project-based certifications is currently under construction.'
        primaryAction={{ href: '/waitlist', label: 'Join the waitlist' }}
        route='/features'
        secondaryAction={{ href: '/breakdowns', label: 'Read technical breakdowns' }}
        section='Platform'
        title='Features'
        scope={[
          {
            detail: 'Interactive stage diagrams built around the See the Concept Before the Code method',
            label: 'Visual-first learning'
          },
          {
            detail: 'Mesh shaders, variable rate shading, virtualized geometry, and Gaussian splatting',
            label: 'Production rendering topics'
          },
          {
            detail: 'Concrete portfolio projects verified against industry rendering standards',
            label: 'Project certifications'
          }
        ]}
      />
    </>
  );
}

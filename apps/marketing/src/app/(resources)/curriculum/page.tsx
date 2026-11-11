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

const CURRICULUM_TITLE = 'Curriculum';
const CURRICULUM_DESCRIPTION = `Structured graphics engineering paths on ${Organization.displayName}, from vector math and rasterization to mesh shaders, virtualized geometry, and Gaussian splatting.`;

/**
 * @brief Metadata for the Curriculum overview page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/curriculum',
  title: CURRICULUM_TITLE,
  description: CURRICULUM_DESCRIPTION,
  keywords: [
    'graphics engineering curriculum',
    'learn Vulkan path',
    'mesh shaders course',
    'virtualized geometry',
    'Gaussian splatting',
    'See the Concept Before the Code'
  ]
});

export default function CurriculumPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={[{ '@id': JsonLdIds.organization }, { '@id': JsonLdIds.application('gp-engine') }]}
        description={CURRICULUM_DESCRIPTION}
        name={CURRICULUM_TITLE}
        path='/curriculum'
      />
      <UnderConstruction
        description='The interactive curriculum overview mapping foundational graphics math through production rendering techniques is currently under construction.'
        primaryAction={{ href: '/breakdowns', label: 'Read technical breakdowns' }}
        route='/curriculum'
        secondaryAction={{ href: '/glossary', label: 'Browse the glossary' }}
        section='Solutions'
        title='Curriculum'
        scope={[
          {
            detail: 'Progressive modules from vector math and rasterization to ray tracing and mesh shaders',
            label: 'Structured learning tracks'
          },
          {
            detail: 'Paired references from Real-Time Rendering, PBRT, GPU Pro, and GPU Zen',
            label: 'Canonical reading integration'
          },
          {
            detail: 'Visual concepts connected directly to C++23 engine code and shaders',
            label: 'Hands-on engine exercises'
          }
        ]}
      />
    </>
  );
}

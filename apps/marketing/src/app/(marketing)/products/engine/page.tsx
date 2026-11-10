// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { Repositories } from '@gp/constants';
import { JsonLdIds } from '@gp/seo/jsonld';
import { SeoMetadata } from '@gp/seo/metadata';
import { WebPageJsonLd } from '@gp/seo/react';
import { Urls } from '@gp/seo/utils';
import { UnderConstruction } from '@/components';

const ENGINE_TITLE = 'GP Engine';

/**
 * @brief Metadata for the GP Engine product page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/products/engine',
  title: ENGINE_TITLE,
  description: Repositories.GpEngine.description,
  keywords: [
    'gp-engine',
    'C++23 graphics engine',
    'open-source Vulkan engine',
    'DirectX 12',
    'Metal',
    'deconstructive engine architecture'
  ]
});

export default function ProductEnginePage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={[{ '@id': JsonLdIds.application('gp-engine') }, { '@id': JsonLdIds.sourceCode('gp-engine') }]}
        description={Repositories.GpEngine.description}
        mainEntity={{ '@id': JsonLdIds.application('gp-engine') }}
        name={ENGINE_TITLE}
        path='/products/engine'
      />
      <UnderConstruction
        description={`${Repositories.GpEngine.description} This dedicated product overview is currently under construction.`}
        manifestLink={{ external: true, href: Repositories.GpEngine.url, label: 'gp-engine repo' }}
        parent={{ href: '/products', label: 'Products' }}
        primaryAction={{ external: true, href: Repositories.GpEngine.url, label: 'Inspect gp-engine on GitHub' }}
        route='/products/engine'
        secondaryAction={{ href: '/breakdowns', label: 'Read technical breakdowns' }}
        section='Products'
        title='GP Engine'
        scope={[
          {
            detail: 'Readable, replaceable modules and a from-scratch math library',
            label: 'Deconstructive C++23 core'
          },
          {
            detail: 'Vulkan, DirectX 12/11, Metal, OpenGL, and console PAL',
            label: 'Backend compatibility matrix'
          },
          {
            detail: 'Compiling and rendering submitted shaders and scene graphs',
            label: 'Learner execution loop'
          }
        ]}
      />
    </>
  );
}

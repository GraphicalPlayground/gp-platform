// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { JsonLdIds } from '@gp/seo/jsonld';
import { SeoMetadata } from '@gp/seo/metadata';
import { WebPageJsonLd } from '@gp/seo/react';
import { Urls } from '@gp/seo/utils';
import { UnderConstruction } from '@/components';

const STUDIO_TITLE = 'GP Studio';
const STUDIO_DESCRIPTION =
  'Browser-based visual workspace and frame debugger for inspecting render passes, editing shaders, and debugging scene graphs in real time.';

/**
 * @brief Metadata for the GP Studio product page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/products/studio',
  title: STUDIO_TITLE,
  description: STUDIO_DESCRIPTION,
  keywords: ['GP Studio', 'browser shader editor', 'frame debugger', 'render pass inspector', 'scene graph visualizer']
});

export default function ProductStudioPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        description={STUDIO_DESCRIPTION}
        name={STUDIO_TITLE}
        path='/products/studio'
        mainEntity={{
          '@type': 'SoftwareApplication',
          'applicationCategory': 'DeveloperApplication',
          'description': STUDIO_DESCRIPTION,
          'name': STUDIO_TITLE,
          'operatingSystem': 'Web Browser',
          'provider': { '@id': JsonLdIds.organization },
          'url': `${Urls.BaseUrl}/products/studio`
        }}
      />
      <UnderConstruction
        description={`${STUDIO_DESCRIPTION} This product page is currently under construction while interactive captures and workflow previews are prepared.`}
        parent={{ href: '/products', label: 'Products' }}
        primaryAction={{ href: '/waitlist', label: 'Join the waitlist' }}
        route='/products/studio'
        secondaryAction={{ href: '/breakdowns', label: 'Read technical breakdowns' }}
        section='Products'
        title='GP Studio'
        scope={[
          {
            detail: 'Interactive stage diagrams and render-pass graphs',
            label: 'Visual pipeline inspection'
          },
          {
            detail: 'Edit shaders and scene descriptions with immediate visual feedback',
            label: 'Live shader workspace'
          },
          {
            detail: 'Inspect pipeline states without needing local discrete GPU tooling',
            label: 'Frame diagnostics'
          }
        ]}
      />
    </>
  );
}

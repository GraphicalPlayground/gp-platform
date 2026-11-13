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

const CLOUD_TITLE = 'GP Cloud';
const CLOUD_DESCRIPTION =
  'Containerized OCI cloud GPU environments for compiling, running, and debugging Vulkan render pipelines in any browser, even on a Chromebook.';

/**
 * @brief Metadata for the GP Cloud product page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/products/cloud',
  title: CLOUD_TITLE,
  description: CLOUD_DESCRIPTION,
  keywords: [
    'GP Cloud',
    'cloud GPU rendering',
    'OCI container Vulkan',
    'browser graphics programming',
    'learn Vulkan without a GPU'
  ]
});

export default function ProductCloudPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        description={CLOUD_DESCRIPTION}
        name={CLOUD_TITLE}
        path='/products/cloud'
        mainEntity={{
          '@type': 'SoftwareApplication',
          'applicationCategory': 'DeveloperApplication',
          'description': CLOUD_DESCRIPTION,
          'name': CLOUD_TITLE,
          'operatingSystem': 'Web Browser',
          'provider': { '@id': JsonLdIds.organization },
          'url': `${Urls.BaseUrl}/products/cloud`
        }}
      />
      <UnderConstruction
        description={`${CLOUD_DESCRIPTION} This product page is currently under construction while cloud compute benchmarks and architecture specs are finalized.`}
        parent={{ href: '/products', label: 'Products' }}
        primaryAction={{ href: '/waitlist', label: 'Join the waitlist' }}
        route='/products/cloud'
        secondaryAction={{ href: '/breakdowns', label: 'Read technical breakdowns' }}
        section='Products'
        title='GP Cloud'
        scope={[
          {
            detail: 'Isolated GPU compute environments for compiling learner shaders and scene graphs',
            label: 'OCI container sandboxes'
          },
          {
            detail: 'Full Vulkan pipeline execution streamed to standard web browsers',
            label: 'Chromebook & low-spec access'
          },
          {
            detail: 'Identical curriculum workflows across cloud GPUs and local hardware',
            label: 'Hybrid local-server parity'
          }
        ]}
      />
    </>
  );
}

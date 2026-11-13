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

const PLATFORM_TITLE = 'GP Platform';
const PLATFORM_DESCRIPTION =
  'The open-source Next.js learning platform uniting interactive pipeline visuals, cloud and local engine execution, and project certifications.';

/**
 * @brief Metadata for the GP Platform product page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/products/platform',
  title: PLATFORM_TITLE,
  description: PLATFORM_DESCRIPTION,
  keywords: ['GP Platform', 'gp-platform', 'graphics programming e-learning', 'Next.js learning platform', 'C++23 labs']
});

export default function ProductPlatformPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={[{ '@id': JsonLdIds.application('gp-platform') }, { '@id': JsonLdIds.sourceCode('gp-platform') }]}
        description={PLATFORM_DESCRIPTION}
        mainEntity={{ '@id': JsonLdIds.application('gp-platform') }}
        name={PLATFORM_TITLE}
        path='/products/platform'
      />
      <UnderConstruction
        description={`${Repositories.GpPlatform.description} This dedicated product page is currently under construction while the workspace tour is assembled.`}
        manifestLink={{ external: true, href: Repositories.GpPlatform.url, label: 'gp-platform repo' }}
        parent={{ href: '/products', label: 'Products' }}
        primaryAction={{ external: true, href: Repositories.GpPlatform.url, label: 'Inspect gp-platform on GitHub' }}
        route='/products/platform'
        secondaryAction={{ href: '/waitlist', label: 'Join the waitlist' }}
        section='Products'
        title='GP Platform'
        scope={[
          {
            detail: 'Unified marketing, learner app, admin console, and backend APIs',
            label: 'Monorepo architecture'
          },
          {
            detail: 'OCI containerized GPUs paired with local engine server support',
            label: 'Cloud & local execution'
          },
          {
            detail: 'Curriculum tracking tied to real rendering submissions',
            label: 'Project certifications'
          }
        ]}
      />
    </>
  );
}

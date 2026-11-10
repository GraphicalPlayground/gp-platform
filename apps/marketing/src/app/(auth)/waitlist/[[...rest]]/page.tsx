// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { JsonLdIds } from '@gp/seo/jsonld';
import { SeoMetadata } from '@gp/seo/metadata';
import { WebPageJsonLd } from '@gp/seo/react';
import { Urls } from '@gp/seo/utils';
import { Section, Spinner } from '@gp/ui/components';
import { WaitlistView } from '@/components/auth';

const WAITLIST_TITLE = 'Join the waitlist';
const WAITLIST_DESCRIPTION =
  'Request early access to Graphical Playground to write shaders, inspect graphics pipelines, and run Vulkan in your browser without a dedicated GPU.';

/**
 * @brief Metadata for the early-access waitlist page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/waitlist',
  title: WAITLIST_TITLE,
  description: WAITLIST_DESCRIPTION,
  keywords: [
    'Graphical Playground waitlist',
    'early access',
    'browser Vulkan sandbox',
    'cloud GPU graphics programming',
    'learn graphics engineering'
  ]
});

/**
 * @brief Waitlist route rendering the custom Graphical Playground early-access signup flow.
 */
export default function WaitlistPage() {
  return (
    <>
      <WebPageJsonLd
        about={{ '@id': JsonLdIds.application('gp-platform') }}
        description={WAITLIST_DESCRIPTION}
        name={WAITLIST_TITLE}
        path='/waitlist'
      />
      <Suspense
        fallback={
          <Section fullWidth backgroundColor='subtle'>
            <Spinner accessibleLabel='Loading waitlist form' size='medium' />
          </Section>
        }
      >
        <WaitlistView />
      </Suspense>
    </>
  );
}

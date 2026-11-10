// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { SeoMetadata } from '@gp/seo/metadata';
import { Urls } from '@gp/seo/utils';
import { Section, Spinner } from '@gp/ui/components';
import { WaitlistView } from '@/components/auth';

/**
 * @brief Metadata for the early-access waitlist page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/waitlist',
  title: 'Join the waitlist',
  description:
    'Request early access to Graphical Playground, the interactive platform for mastering real-time graphics programming and rendering engines.'
});

/**
 * @brief Waitlist route rendering the custom Graphical Playground early-access signup flow.
 */
export default function WaitlistPage() {
  return (
    <Suspense
      fallback={
        <Section fullWidth backgroundColor='subtle'>
          <Spinner accessibleLabel='Loading waitlist form' size='medium' />
        </Section>
      }
    >
      <WaitlistView />
    </Suspense>
  );
}

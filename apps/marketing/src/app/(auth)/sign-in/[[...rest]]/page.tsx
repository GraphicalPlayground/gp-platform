// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { SeoMetadata } from '@gp/seo/metadata';
import { Urls } from '@gp/seo/utils';
import { Section, Spinner } from '@gp/ui/components';
import { env } from '~env';
import { SignInView } from '@/components/auth';

/**
 * @brief Metadata for the sign-in page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/sign-in',
  title: 'Sign in',
  description:
    'Sign in to your Graphical Playground workspace to access interactive shaders, Vulkan modules, and render pipeline labs.',
  noindex: true
});

/**
 * @brief Sign-in route rendering the custom Graphical Playground authentication experience.
 */
export default function SignInPage() {
  const waitlistMode = env.NEXT_PUBLIC_WAITLIST_MODE === 'true';

  return (
    <Suspense
      fallback={
        <Section fullWidth backgroundColor='subtle'>
          <Spinner accessibleLabel='Loading sign-in form' size='medium' />
        </Section>
      }
    >
      <SignInView waitlistMode={waitlistMode} />
    </Suspense>
  );
}

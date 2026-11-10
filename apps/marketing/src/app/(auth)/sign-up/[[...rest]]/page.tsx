// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { SeoMetadata } from '@gp/seo/metadata';
import { Urls } from '@gp/seo/utils';
import { env } from '~env';
import { AuthLoadingView, SignUpView } from '@/components/auth';

/**
 * @brief Metadata for the sign-up page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/sign-up',
  title: 'Create account',
  description:
    'Create a Graphical Playground account to start building real-time graphics pipelines and shader labs in the browser.',
  noindex: true
});

/**
 * @brief Sign-up route rendering the custom Graphical Playground onboarding experience.
 */
export default function SignUpPage() {
  const waitlistMode = env.NEXT_PUBLIC_WAITLIST_MODE === 'true';

  return (
    <Suspense
      fallback={
        <AuthLoadingView
          accessibleLabel='Loading sign-up form'
          description='Loading your account registration options.'
          eyebrow='ONBOARDING // SIGN UP'
          statusText='Preparing sign-up...'
          title='Create account'
        />
      }
    >
      <SignUpView waitlistMode={waitlistMode} />
    </Suspense>
  );
}

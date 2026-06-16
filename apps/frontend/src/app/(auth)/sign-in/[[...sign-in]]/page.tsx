// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { SignIn } from '@clerk/nextjs';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Sign In to Graphical Playground',
  description: 'Sign in to your account to access the Graphical Playground platform.',
  robots: {
    index: false,
    follow: false
  }
});

export default function SignInPage() {
  return (
    <>
      <SignIn />
    </>
  );
}

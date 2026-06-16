// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { Waitlist } from '@clerk/nextjs';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Waitlist for Graphical Playground',
  description: 'Join the waitlist to be notified when Graphical Playground is available.',
  robots: {
    index: false,
    follow: false
  }
});
export default function WaitlistPage() {
  return (
    <>
      <Waitlist />
    </>
  );
}

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { createMetadata } from '@/utils/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Graphical Playground Legal',
  description:
    'The information provided here is for Graphical Playground customers and users who have questions about our terms, policies, intellectual property, and compliance.',
  keywords: [
    'legal',
    'acceptable use policy',
    'aup',
    'cookie policy',
    'cookie',
    'data processing agreement',
    'dpa',
    'end user license agreement',
    'eula',
    'open source softwares',
    'oss',
    'privacy policy',
    'privacy',
    'software services agreement',
    'ssa',
    'terms of service',
    'tos',
    'terms and conditions',
    't&c',
    'terms',
    'conditions'
  ]
});

export default function LegalLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full flex flex-col'>
      <header className=''></header>
      <main className='grow'>{children}</main>
    </div>
  );
}

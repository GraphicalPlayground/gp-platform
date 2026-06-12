// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { createMetadata } from '@/utils/metadata';
import { LegalNav } from '@/components/legal-nav';

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
      <main className='w-[calc(min(var(--max-content-width),100vw)-var(--gutter)*2)] mx-auto py-20'>
        <div className='min-[960px]:grid min-[960px]:gap-[calc(var(--col-width)*3)] min-[960px]:grid-cols-[calc(var(--col-width)*14)_calc(var(--col-width)*27)] min-[1440px]:grid-cols-[calc(var(--col-width)*12)_calc(var(--col-width)*26)] min-[1920px]:grid-cols-[calc(var(--col-width)*13)_calc(var(--col-width)*24)]'>
          <aside className='w-full mb-12 md:mt-4'>
            <LegalNav />
          </aside>
          <div className='w-full min-h-[50vh] bg-red-500'>{children}</div>
        </div>
      </main>
    </div>
  );
}

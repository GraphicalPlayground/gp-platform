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
      <header className='w-full bg-[url("/images/dithered/sphere-dithered.png")] bg-center bg-no-repeat bg-cover h-64 md:h-96 flex flex-col items-center justify-center gap-3'>
        <div className='w-[90%] max-w-[20rem] md:max-w-none md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col items-center justify-center gap-4 md:gap-5'>
          <div className='w-full flex items-center justify-center bg-(--gp-primary) px-6 py-4 md:px-8 md:py-6 rounded-3xl md:rounded-4xl'>
            <img
              src='/images/logo-long-text-black.svg'
              alt='Graphical Playground Logo'
              className='w-full h-auto'
              draggable={false}
            />
          </div>

          <div className='w-full px-4 md:px-6 flex justify-center'>
            <span className='bg-(--gp-pink) text-black text-2xl md:text-4xl px-5 md:px-6 pt-1.5 md:pt-2.5 pb-1 md:pb-2 rounded-full'>
              Legal
            </span>
          </div>
        </div>
      </header>
      <main className='w-[calc(min(var(--max-content-width),100vw)-var(--gutter)*2)] mx-auto py-20'>
        <div className='min-[960px]:grid min-[960px]:gap-[calc(var(--col-width)*3)] min-[960px]:grid-cols-[calc(var(--col-width)*14)_calc(var(--col-width)*27)] min-[1440px]:grid-cols-[calc(var(--col-width)*12)_calc(var(--col-width)*26)] min-[1920px]:grid-cols-[calc(var(--col-width)*13)_calc(var(--col-width)*24)]'>
          <aside className='w-full mb-12 md:mt-4 min-[960px]:sticky min-[960px]:top-32 self-start'>
            <LegalNav />
          </aside>
          <div className='w-full min-h-[50vh]'>{children}</div>
        </div>
      </main>
    </div>
  );
}

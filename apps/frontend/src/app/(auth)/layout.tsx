// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { Link } from '@gp/react';

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen w-full bg-white'>
      <div className='hidden lg:flex lg:w-1/2 bg-gray-100 dark:bg-gray-800 items-center justify-center relative overflow-hidden'>
        <div className='absolute inset-0 bg-[url(/images/dithered/thewitcher4-dithered.png)] bg-no-repeat bg-cover'></div>

        <div className='h-full justify-center flex flex-col z-10 w-full'>
          <div className='relative flex flex-col items-center gap-3 w-fit mx-auto'>
            <div className='bg-(--gp-primary) text-black rounded-full pt-2 pb-1 px-6 text-3xl -translate-x-8 xl:text-4xl xl:-translate-x-12 2xl:text-6xl 2xl:px-10 2xl:pt-3 2xl:pb-2 2xl:-translate-x-24'>
              Use it
            </div>
            <div className='bg-(--gp-primary) text-black rounded-full pt-2 pb-1 px-6 text-3xl translate-x-4 xl:text-4xl xl:translate-x-8 2xl:text-6xl 2xl:px-10 2xl:pt-3 2xl:pb-2 2xl:translate-x-12'>
              Understand it
            </div>
            <div className='bg-(--gp-primary) text-black rounded-full pt-2 pb-1 px-6 text-3xl -translate-x-4 xl:text-4xl xl:-translate-x-8 2xl:text-6xl 2xl:px-10 2xl:pt-3 2xl:pb-2 2xl:-translate-x-16'>
              Rewrite it
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 inset-0 z-0 bg-[radial-gradient(#00000020_1px,transparent_1px)] bg-size-[20px_20px] mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_80%,transparent_100%)]'>
        <div className='w-full max-w-sm lg:max-w-md'>{children}</div>
      </div>
    </div>
  );
}

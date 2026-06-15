// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen w-full bg-white'>
      <div className='hidden lg:flex lg:w-1/2 bg-gray-100 dark:bg-gray-800 items-center justify-center relative overflow-hidden'>
        <div className='absolute inset-0 bg-linear-to-br from-blue-600 to-indigo-800'></div>

        <div className='relative z-10 flex flex-col items-center justify-center p-12 text-center text-white'>
          <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl mb-4'>Graphical Playground</h1>
          <p className='text-lg text-blue-100 max-w-md'>
            Welcome back. Sign in to access your dashboard, connect with the community, and keep building.
          </p>
        </div>
      </div>
      <div className='flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24'>
        <div className='w-full max-w-sm lg:max-w-md'>
          <div className='lg:hidden mb-8 text-center'>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>Graphical Playground</h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

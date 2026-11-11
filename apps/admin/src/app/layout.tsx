// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SeoMetadata } from '@gp/seo/metadata';
import { Urls } from '@gp/seo/utils';

import './globals.css';

/**
 * @brief Root metadata for the admin app. Never indexed: this is a private, authenticated product surface.
 */
export const metadata: Metadata = SeoMetadata.for('admin', { baseUrl: Urls.SubDomain('admin') }).base();

/**
 * @brief This function defines the root layout for the application.
 * @param children - The child components to be rendered within the layout.
 * @returns The root layout component.
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    await auth.protect();
  }

  if (sessionClaims?.metadata?.role !== 'admin') {
    redirect('https://graphical-playground.com');
  }

  return (
    <html lang='en' className='h-full antialiased scroll-smooth'>
      <body className='min-h-full flex flex-col scroll-smooth'>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}

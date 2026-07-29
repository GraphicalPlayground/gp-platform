// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { JsonLd } from '@gp/seo/react';
import { graph } from '@gp/seo/jsonld';
import { SeoMetadata } from '@gp/seo/metadata';
import { Urls } from '@gp/seo/utils';

import './globals.css';

/**
 * @brief Root metadata for every page of the marketing site, unless overridden by a more specific page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).base();

/**
 * @brief This function defines the root layout for the application.
 * @param children - The child components to be rendered within the layout.
 * @returns The root layout component.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='min-h-screen antialiased scroll-smooth'>
      <body className='min-h-screen flex flex-col scroll-smooth'>
        <JsonLd data={graph} />
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import './globals.css';
import type { Metadata } from 'next';
import { createMetadata } from '@/utils/metadata';
import { JsonLd } from '@/components/jsonld';
import { organization, persons, website, softwareSourceCode, softwareApplication, faqPage } from '@/config/schema.org';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { CookieBanner } from '@/components/cookie-banner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`h-full antialiased ${inter.variable}`}>
      <body className='min-h-full flex flex-col'>
        <ClerkProvider waitlistUrl='/waitlist'>
          <JsonLd
            data={[organization, ...Object.values(persons), website, softwareSourceCode, softwareApplication, faqPage]}
          />
          {children}
          <CookieBanner />
        </ClerkProvider>
      </body>
    </html>
  );
}

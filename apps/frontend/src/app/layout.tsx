// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import './globals.css';
import type { Metadata } from 'next';
import { createMetadata } from '@/utils/metadata';
import { JsonLd } from '@/components/jsonld';
import { organization, persons } from '@/config/schema.org';

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full antialiased'>
      <body className='min-h-full flex flex-col'>
        <JsonLd data={[organization, ...Object.values(persons)]} />
        {children}
      </body>
    </html>
  );
}

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';

import './globals.css';

/**
 * @brief This function defines the root layout for the application.
 * @param children - The child components to be rendered within the layout.
 * @returns The root layout component.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='h-full antialiased scroll-smooth'>
      <body className='min-h-full flex flex-col scroll-smooth'>{children}</body>
    </html>
  );
}

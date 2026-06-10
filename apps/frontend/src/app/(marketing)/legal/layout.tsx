// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';

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

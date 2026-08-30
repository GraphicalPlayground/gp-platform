// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { SubdomainNavBarHeader } from '@/components/header';

export default function ChangelogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubdomainNavBarHeader fixed={false} links={[]} title='Changelogs' />
      <main className='w-full'>{children}</main>
    </>
  );
}

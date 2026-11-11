// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { MarketingSubNav } from '@/components';
import { sitemapSubNav } from '@/data/sub-nav';

export default function SiteMapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingSubNav {...sitemapSubNav} />
      {children}
    </>
  );
}

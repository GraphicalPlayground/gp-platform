// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { MarketingSubNav } from '@/components';
import { contentSubNavs } from '@/data/sub-nav';

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingSubNav {...contentSubNavs.guides} />
      {children}
    </>
  );
}

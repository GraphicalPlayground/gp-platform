// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { ContentIndexPage } from '@/components/content-index';
import type { SearchParams } from '@/components/content-index';

export default async function GuidesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <ContentIndexPage
      basePath='/guides'
      description='Step-by-step guides to learn graphics programming, from your first triangle to production techniques.'
      searchParams={await searchParams}
      title='Guides'
      type='guide'
    />
  );
}

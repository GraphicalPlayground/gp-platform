// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { ContentIndexPage } from '@/components/content-index';
import type { SearchParams } from '@/components/content-index';

export default async function ComparisonsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <ContentIndexPage
      basePath='/comparisons'
      description='Side-by-side comparisons of graphics APIs, techniques, and tools to help you pick the right one.'
      searchParams={await searchParams}
      title='Comparisons'
      type='comparison'
    />
  );
}

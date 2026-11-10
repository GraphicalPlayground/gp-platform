// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { ContentIndexPage } from '@/components/content-index';
import type { SearchParams } from '@/components/content-index';

export default async function ResearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <ContentIndexPage
      searchable
      basePath='/research'
      description='Our research notes and summaries of papers shaping modern real-time rendering.'
      searchParams={await searchParams}
      searchPlaceholder='Search research...'
      title='Research'
      type='research'
    />
  );
}

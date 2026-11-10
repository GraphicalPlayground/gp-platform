// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { ContentIndexPage } from '@/components/content-index';
import type { SearchParams } from '@/components/content-index';

export default async function RoadmapsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <ContentIndexPage
      basePath='/roadmaps'
      description='Where the Graphical Playground engine, platform, and curriculum are headed next.'
      searchParams={await searchParams}
      title='Roadmaps'
      type='roadmap'
    />
  );
}

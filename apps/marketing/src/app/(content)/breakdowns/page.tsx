// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { ContentIndexPage } from '@/components/content-index';
import type { SearchParams } from '@/components/content-index';

export default async function BreakdownsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <ContentIndexPage
      basePath='/breakdowns'
      description='In-depth technical breakdowns of how real-time rendering techniques and engine systems actually work.'
      searchParams={await searchParams}
      title='Breakdowns'
      type='breakdown'
    />
  );
}

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { ContentIndexPage } from '@/components/content-index';
import type { SearchParams } from '@/components/content-index';

export default async function InterviewsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <ContentIndexPage
      basePath='/interviews'
      description='Conversations with graphics engineers and technical artists about how they build what they build.'
      searchParams={await searchParams}
      title='Interviews'
      type='interview'
    />
  );
}

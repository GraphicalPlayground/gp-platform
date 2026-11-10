// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { ContentIndexPage } from '@/components/content-index';
import type { SearchParams } from '@/components/content-index';

export default async function ShowcasesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <ContentIndexPage
      searchable
      basePath='/showcases'
      description='Projects built by the community with Graphical Playground.'
      searchParams={await searchParams}
      searchPlaceholder='Search showcases...'
      title='Showcases'
      type='showcase'
    />
  );
}

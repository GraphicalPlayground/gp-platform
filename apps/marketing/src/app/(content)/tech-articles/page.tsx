// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { ContentIndexPage } from '@/components/content-index';
import type { SearchParams } from '@/components/content-index';

export default async function TechArticlesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <ContentIndexPage
      searchable
      basePath='/tech-articles'
      description='Technical articles on graphics APIs, shaders, engine architecture, and performance.'
      searchParams={await searchParams}
      searchPlaceholder='Search tech articles...'
      title='Tech Articles'
      type='tech-article'
    />
  );
}

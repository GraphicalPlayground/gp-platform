// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { ContentIndexPage } from '@/components/content-index';
import type { SearchParams } from '@/components/content-index';

export default async function ChangelogsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <ContentIndexPage
      basePath='/changelogs'
      description='Every release of the Graphical Playground engine and platform, with what changed and why.'
      searchParams={await searchParams}
      title='Changelogs'
      type='changelog'
    />
  );
}

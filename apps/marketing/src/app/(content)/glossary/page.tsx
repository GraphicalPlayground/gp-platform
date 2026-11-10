// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { ContentIndexPage } from '@/components/content-index';
import type { SearchParams } from '@/components/content-index';

export default async function GlossaryPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <ContentIndexPage
      basePath='/glossary'
      description='Clear definitions of the graphics programming and engine architecture terms you will run into.'
      searchParams={await searchParams}
      title='Glossary'
      type='glossary'
    />
  );
}

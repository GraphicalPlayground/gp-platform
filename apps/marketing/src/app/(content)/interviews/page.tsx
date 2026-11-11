// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { ContentIndexPage } from '@/components/content-index';
import type { SearchParams } from '@/components/content-index';
import { ARTICLE_ROUTES } from '@/lib/article-routes';
import { buildContentIndexMetadata } from '@/lib/content-metadata';

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  return buildContentIndexMetadata('interview', await searchParams);
}

export default async function InterviewsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const route = ARTICLE_ROUTES.interview;

  return (
    <ContentIndexPage
      searchable
      basePath={route.basePath}
      description={route.description}
      searchParams={await searchParams}
      searchPlaceholder='Search interviews...'
      title={route.label}
      type='interview'
    />
  );
}

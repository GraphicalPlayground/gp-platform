// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { ContentIndexPage } from '@/components/content-index';
import type { SearchParams } from '@/components/content-index';

export default async function TestimonialsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <ContentIndexPage
      basePath='/testimonials'
      description='What learners and engineers say about learning with Graphical Playground.'
      searchParams={await searchParams}
      title='Testimonials'
      type='testimonial'
    />
  );
}

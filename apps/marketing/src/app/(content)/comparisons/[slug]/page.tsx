// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cms } from '@/lib/cms';
import type { Metadata } from 'next';
import { Urls, SeoMetadata } from '@gp/seo';

export async function generateStaticParams() {
  return (await cms.articles.getComparisons()).map((entries) => ({ slug: entries.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = await cms.articles.getBySlug(slug);

  if (!doc) {
    return {};
  }

  return SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).article(doc.frontmatter, `/comparisons/${slug}`);
}

export default function ComparisonSlugPage() {
  return <div>Comparison Slug</div>;
}

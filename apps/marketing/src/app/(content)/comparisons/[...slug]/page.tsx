// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cms } from '@/lib/cms';
import type { Metadata } from 'next';
import { Urls, SeoMetadata } from '@gp/seo';
import { Article } from '@/components/article';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return (await cms.articles.getComparisons()).map((entries) => ({ slug: entries.slug.split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = await cms.articles.getBySlug(slug.join('/'));

  if (!doc) {
    return {};
  }

  return SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).article(
    doc.frontmatter,
    `/comparisons/${slug.join('/')}`
  );
}

export default async function ComparisonSlugPage({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const { slug } = await params;
  const doc = await cms.articles.getCompiledBySlug(slug instanceof Array ? slug.join('/') : slug);

  if (!doc) {
    return notFound();
  }

  return <Article article={doc} basePath='/comparisons' />;
}

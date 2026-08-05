// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';

import { cms } from '@/lib/cms';
import type { Metadata } from 'next';
import { Urls, SeoMetadata } from '@gp/seo';

export async function generateStaticParams() {
  return (await cms.articles.getBreakdowns()).map((entries) => ({ slug: entries.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = await cms.articles.getBySlug(slug);

  if (!doc) {
    return {};
  }

  return SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).article(doc.frontmatter, `/breakdowns/${slug}`);
}

export default function BreakdownSlugPage() {
  return <div>Breakdown Slug</div>;
}

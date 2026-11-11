// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Article } from '@/components/article';
import { generateArticleSlugMetadata, getTypedCompiledArticle } from '@/lib/article-page';
import { cms } from '@/lib/cms';

export async function generateStaticParams() {
  return (await cms.articles.getTechArticles()).map((entries) => ({ slug: entries.slug.split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;

  return generateArticleSlugMetadata('tech-article', slug);
}

export default async function TechArticleSlugPage({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const { slug } = await params;
  const doc = await getTypedCompiledArticle('tech-article', slug);

  if (!doc) {
    return notFound();
  }

  return <Article article={doc} basePath='/tech-articles' />;
}

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { notFound } from 'next/navigation';
import { SeoMetadata } from '@gp/seo/metadata';
import { Urls } from '@gp/seo/utils';
import { Prose } from '@gp/ui/components';

export async function generateStaticParams() {
  return (await cms.legal.getSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = await cms.legal.getBySlug(slug);

  if (!doc) {
    return {};
  }

  return SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).legal(doc.frontmatter, `/legal/${slug}`);
}

export default async function LegalSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await cms.legal.getCompiledBySlug(slug);

  if (!doc) {
    return notFound();
  }

  return (
    <article className='w-full'>
      <h1>{doc.frontmatter.title}</h1>
      <div className='w-full max-w-3xl mx-auto'>
        <Prose variant='editorial'>{doc.content}</Prose>
      </div>
    </article>
  );
}

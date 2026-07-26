// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cms } from '@/lib/cms';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return (await cms.legal.getSlugs()).map((slug) => ({ slug }));
}

export default async function LegalSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await cms.legal.getCompiledBySlug(slug);

  if (!doc) {
    return notFound();
  }

  return (
    <article>
      <h1>{doc.frontmatter.title}</h1>
      {doc.content}
    </article>
  );
}

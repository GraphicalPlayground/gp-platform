// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { Keywords, Organization } from '@gp/constants';
import { JsonLdIds } from '@gp/seo/jsonld';
import { SeoMetadata } from '@gp/seo/metadata';
import { CourseJsonLd, FaqJsonLd, WebPageJsonLd } from '@gp/seo/react';
import { Urls } from '@gp/seo/utils';
import { HomeView } from '@/components/home';
import type { FeaturedGlossaryCard } from '@/components/home';
import { FEATURED_GLOSSARY_SLUGS, HOME_COURSE_DATA } from '@/data/home';
import { getArticlePath } from '@/lib/article-routes';
import { getDevDraftTokenLabel } from '@/lib/article-status';
import { cms } from '@/lib/cms';
import { jsonLdEntries } from './content';

const HOME_TITLE = 'Learn 3D Graphics Programming by Building It';
const HOME_DESCRIPTION =
  'An interactive platform where learners inspect and rebuild a C++23 graphics engine, running shaders and render pipelines from any browser or on their own hardware.';

const SUBTOPIC_LABELS: Record<string, string> = {
  'animation-and-vfx': 'Animation & VFX',
  'engine-architecture': 'Engine Architecture',
  'lighting-and-gi': 'Lighting & GI',
  'materials-and-shading': 'Materials & Shading',
  'math-and-geometry': 'Math & Geometry',
  'optimization-and-culling': 'Optimization & Culling',
  'physics-and-collision': 'Physics & Collision',
  'post-processing': 'Post-Processing',
  'rendering-core': 'Rendering Core',
  'shaders-and-gpu': 'Shaders & GPU'
};

function formatSlugLabel(raw: string): string {
  return SUBTOPIC_LABELS[raw] ?? raw.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function resolveGlossarySubtopic(relativePath: string, explicitSubtopic?: string): string {
  if (explicitSubtopic) return explicitSubtopic;

  const segments = relativePath.split(/[\\/]/);
  const folder = segments.length >= 2 ? segments[segments.length - 2] : undefined;

  return folder && folder !== 'glossary' ? folder : 'rendering-core';
}

/**
 * @brief Metadata for the marketing home page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/',
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  keywords: [...Keywords]
});

/**
 * @brief Principal home page of the marketing application.
 * @returns A JSX page displaying the interactive 3D shader hero, Gridline platform sections, live glossary matrix, and FAQ.
 */
export default async function HomePage() {
  const glossaryEntries = await cms.articles.getGlossaryEntries({ locale: 'en' });
  const subtopicSet = new Set<string>();
  const bySlug = new Map(glossaryEntries.map((doc) => [doc.slug, doc]));

  for (const doc of glossaryEntries) {
    subtopicSet.add(resolveGlossarySubtopic(doc.relativePath, doc.frontmatter.subtopic));
  }

  const resolvedFeatured = FEATURED_GLOSSARY_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (doc): doc is NonNullable<typeof doc> => Boolean(doc)
  );
  const fallbackPool = glossaryEntries.filter((doc) => !FEATURED_GLOSSARY_SLUGS.includes(doc.slug));
  const selectedDocs = [...resolvedFeatured, ...fallbackPool].slice(0, 6);

  const featuredGlossary: FeaturedGlossaryCard[] = selectedDocs.map((doc) => {
    const rawSubtopic = resolveGlossarySubtopic(doc.relativePath, doc.frontmatter.subtopic);

    return {
      difficulty: formatSlugLabel(doc.frontmatter.difficulty),
      draftLabel: getDevDraftTokenLabel(doc.frontmatter),
      href: getArticlePath('glossary', doc.slug),
      shortDefinition: doc.frontmatter.shortDefinition,
      slug: doc.slug,
      subtopic: formatSlugLabel(rawSubtopic),
      title: doc.frontmatter.title
    };
  });

  return (
    <>
      <WebPageJsonLd
        about={[{ '@id': JsonLdIds.organization }, { '@id': JsonLdIds.application('gp-engine') }]}
        description={HOME_DESCRIPTION}
        keywords={[...Keywords]}
        mainEntity={{ '@id': JsonLdIds.application('gp-platform') }}
        name={`${HOME_TITLE} | ${Organization.displayName}`}
        path='/'
      />
      <CourseJsonLd
        description={HOME_COURSE_DATA.description}
        educationalLevel={HOME_COURSE_DATA.educationalLevel}
        inLanguage={HOME_COURSE_DATA.inLanguage}
        name={HOME_COURSE_DATA.name}
        offer={{ price: 0, priceCurrency: Organization.currency }}
        path={HOME_COURSE_DATA.path}
        prerequisites={HOME_COURSE_DATA.prerequisites}
      />
      <FaqJsonLd
        description={HOME_DESCRIPTION}
        items={jsonLdEntries}
        name={`${HOME_TITLE} | ${Organization.displayName}`}
        path='/'
      />
      <HomeView
        featuredGlossary={featuredGlossary}
        glossaryCount={glossaryEntries.length}
        subtopicCount={subtopicSet.size}
      />
    </>
  );
}

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { ArticleType } from '@gp/content';

export interface ArticleRouteMeta {
  basePath: string;
  label: string;
  title: string;
  description: string;
  keywords: string[];
}

/**
 * @brief Single source of truth mapping each `@gp/content` article type to its marketing route and metadata.
 */
export const ARTICLE_ROUTES: Record<ArticleType, ArticleRouteMeta> = {
  'breakdown': {
    basePath: '/breakdowns',
    label: 'Breakdowns',
    title: 'Technical Breakdowns',
    description:
      'Architecture breakdowns of game engines and real-time rendering pipelines, covering system design, prerequisites, and primary sources.',
    keywords: [
      'game engine architecture breakdown',
      'rendering pipeline analysis',
      'AAA game engines',
      'graphics engine internals',
      'gp-engine architecture'
    ]
  },
  'changelog': {
    basePath: '/changelogs',
    label: 'Changelogs',
    title: 'Changelogs',
    description:
      'Release notes for gp-engine and the Graphical Playground platform, detailing new rendering features, API changes, and bug fixes.',
    keywords: [
      'Graphical Playground changelog',
      'gp-engine releases',
      'platform release notes',
      'graphics engine updates'
    ]
  },
  'comparison': {
    basePath: '/comparisons',
    label: 'Comparisons',
    title: 'Comparisons',
    description:
      'Side-by-side comparisons of graphics APIs, rendering pipelines, and engine architectures to help you pick the right tool for a workload.',
    keywords: [
      'Vulkan vs DirectX 12',
      'graphics API comparison',
      'rendering pipeline comparison',
      'game engine comparison'
    ]
  },
  'glossary': {
    basePath: '/glossary',
    label: 'Glossary',
    title: 'Graphics Engineering Glossary',
    description:
      'Clear definitions of real-time rendering, shader programming, GPU hardware, and game engine architecture terms with related topics.',
    keywords: [
      'graphics programming glossary',
      'real-time rendering terms',
      'GPU shader glossary',
      'game engine terminology',
      'computer graphics definitions'
    ]
  },
  'guide': {
    basePath: '/guides',
    label: 'Guides',
    title: 'Guides',
    description:
      'Step-by-step graphics programming guides covering Vulkan pipelines, shaders, math foundations, and C++23 engine modules from the ground up.',
    keywords: [
      'learn Vulkan step by step',
      'graphics programming tutorials',
      'shader writing guide',
      'C++23 game engine tutorial'
    ]
  },
  'interview': {
    basePath: '/interviews',
    label: 'Interviews',
    title: 'Interviews',
    description:
      'Conversations with graphics engineers, rendering architects, and technical artists about how production engines and pipelines are built.',
    keywords: ['graphics engineer interviews', 'rendering architect Q&A', 'AAA engine developer interviews']
  },
  'research': {
    basePath: '/research',
    label: 'Research',
    title: 'Research',
    description:
      'Technical research notes, benchmarks, and summaries of real-time rendering papers covering global illumination, geometry, and shading.',
    keywords: [
      'real-time rendering research',
      'graphics programming benchmarks',
      'SIGGRAPH paper notes',
      'GPU rendering research'
    ]
  },
  'roadmap': {
    basePath: '/roadmaps',
    label: 'Roadmaps',
    title: 'Roadmaps',
    description:
      'Planned, in-progress, and shipped milestones across gp-engine, cloud GPU sandboxes, GP Studio, and the Graphical Playground curriculum.',
    keywords: ['Graphical Playground roadmap', 'gp-engine milestones', 'graphics curriculum roadmap']
  },
  'showcase': {
    basePath: '/showcases',
    label: 'Showcases',
    title: 'Showcases',
    description:
      'Rendering projects, custom shaders, and engine modules built by Graphical Playground learners, complete with source repositories.',
    keywords: [
      'graphics programming showcase',
      'Vulkan student projects',
      'shader portfolio',
      'Graphical Playground projects'
    ]
  },
  'tech-article': {
    basePath: '/tech-articles',
    label: 'Tech Articles',
    title: 'Tech Articles',
    description:
      'Engineering write-ups on Vulkan, shaders, memory allocators, platform abstraction layers, and real-time GPU performance optimization.',
    keywords: [
      'graphics engineering articles',
      'Vulkan technical blog',
      'C++23 memory allocators',
      'shader optimization'
    ]
  },
  'testimonial': {
    basePath: '/testimonials',
    label: 'Testimonials',
    title: 'Testimonials',
    description:
      'Stories and feedback from students and graphics engineers learning real-time rendering and engine architecture on Graphical Playground.',
    keywords: ['Graphical Playground testimonials', 'graphics programming learner reviews', 'student feedback']
  }
};

/**
 * @brief Resolves the canonical site-relative path for a given article type and slug.
 */
export const getArticlePath = (type: ArticleType, slug: string): string => `${ARTICLE_ROUTES[type].basePath}/${slug}`;

/**
 * @brief Finds route metadata matching a content index `basePath` (e.g. `/breakdowns`).
 */
export const findArticleRouteByBasePath = (basePath: string): ArticleRouteMeta | undefined =>
  Object.values(ARTICLE_ROUTES).find((route) => route.basePath === basePath);

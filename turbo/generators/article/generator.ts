// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { PlopTypes } from '@turbo/gen';
import path from 'node:path';

/**
 * @brief Mirrors `articleFrontmatterUnionSchema`'s discriminant values (see
 * `packages/content/src/article/union.ts`) - kept as a local literal (no cross-package import)
 * to match the self-contained style of the `component` generator.
 */
export const ARTICLE_TYPES = [
  'guide',
  'comparison',
  'tech-article',
  'glossary',
  'breakdown',
  'interview',
  'changelog',
  'roadmap',
  'showcase',
  'research',
  'testimonial'
] as const;

/**
 * @brief Mirrors the folder mapping documented in `content/articles/README.md`.
 */
export const ARTICLE_TYPE_TO_FOLDER: Record<string, string> = {
  guide: 'guides',
  comparison: 'comparisons',
  'tech-article': 'tech-articles',
  glossary: 'glossary',
  breakdown: 'breakdowns',
  interview: 'interviews',
  changelog: 'changelogs',
  roadmap: 'roadmaps',
  showcase: 'showcases',
  research: 'research',
  testimonial: 'testimonials'
};

/**
 * @brief Mirrors `articleCategorySchema` (see `packages/content/src/article/category.ts`).
 */
const ARTICLE_CATEGORIES = [
  'uncategorized',
  'rendering-pipeline',
  'graphics-apis',
  'shaders',
  'engine-architecture',
  'math-for-graphics',
  'physics-simulation',
  'performance-optimization',
  'tooling',
  'career-and-certification',
  'industry-news'
];

function toKebabCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '');
}

/**
 * @brief The generator configuration for scaffolding a new article MDX file.
 * @details Prompts for the common frontmatter fields shared by every article type; type-specific
 * required fields (e.g. `comparison.subjects`, `interview.interviewee`) are left as `TODO`
 * placeholders in the per-type template for the author to fill in.
 */
export const articleGenerator: PlopTypes.PlopGeneratorConfig = {
  description: 'Adds a new article to content/articles',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Article type?',
      choices: [...ARTICLE_TYPES]
    },
    {
      type: 'input',
      name: 'title',
      message: 'Title?'
    },
    {
      type: 'input',
      name: 'slug',
      message: 'Slug? (kebab-case)',
      default: (answers: { title: string }) => toKebabCase(answers.title ?? '')
    },
    {
      type: 'list',
      name: 'category',
      message: 'Category?',
      choices: ARTICLE_CATEGORIES,
      default: 'uncategorized'
    },
    {
      type: 'list',
      name: 'difficulty',
      message: 'Difficulty?',
      choices: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author name?'
    },
    {
      type: 'input',
      name: 'locale',
      message: 'Locale?',
      default: 'en'
    },
    {
      type: 'input',
      name: 'glossarySubfolder',
      message: 'Glossary topic subfolder? (e.g. rendering-core)',
      when: (answers: { type: string }) => answers.type === 'glossary'
    }
  ],
  actions: [
    {
      type: 'add',
      path: 'content/articles/{{articleFolder type}}/{{#if glossarySubfolder}}{{glossarySubfolder}}/{{/if}}{{kebabCase slug}}.mdx',
      templateFile: path.resolve(__dirname, 'article/templates/{{type}}.mdx.hbs')
    }
  ]
};

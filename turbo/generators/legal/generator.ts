// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { PlopTypes } from '@turbo/gen';
import path from 'node:path';

/**
 * @brief Mirrors `legalCategorySchema` (see `packages/content/src/legal/category.ts`).
 */
const LEGAL_CATEGORIES = ['consumer', 'business', 'licensing'];

function toKebabCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '');
}

/**
 * @brief The generator configuration for scaffolding a new legal document MDX file.
 * @details Two variants: `default` (most legal docs) and `subprocessors` (adds the
 * `subprocessors` array required by `subprocessorsFrontmatterSchema`).
 */
export const legalGenerator: PlopTypes.PlopGeneratorConfig = {
  description: 'Adds a new legal document to content/legal',
  prompts: [
    {
      type: 'list',
      name: 'variant',
      message: 'Variant?',
      choices: ['default', 'subprocessors'],
      default: 'default'
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
      choices: LEGAL_CATEGORIES
    },
    {
      type: 'list',
      name: 'requiresExplicitConsent',
      message: 'Requires explicit consent?',
      choices: ['false', 'true'],
      default: 'false'
    },
    {
      type: 'input',
      name: 'locale',
      message: 'Locale?',
      default: 'en'
    }
  ],
  actions: [
    {
      type: 'add',
      path: 'content/legal/{{kebabCase slug}}.mdx',
      templateFile: path.resolve(__dirname, 'legal/templates/{{variant}}.mdx.hbs')
    }
  ]
};

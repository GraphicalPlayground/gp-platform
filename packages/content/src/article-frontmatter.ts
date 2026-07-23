// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { articleCategorySchema } from './article-category';
import { authorSchema } from './author';
import { difficultySchema } from './difficulty';
import { faqEntrySchema } from './faq';

export const articleSeoOverrideSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional()
});

export type ArticleSeoOverride = z.infer<typeof articleSeoOverrideSchema>;

export const articleFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  category: articleCategorySchema,
  tags: z.array(z.string().min(1)).default([]),
  difficulty: difficultySchema,
  author: authorSchema,
  datePublished: z.iso.date(),
  dateModified: z.iso.date().optional(),
  coverImage: z.url(),
  coverImageAlt: z.string().min(1),
  readingTimeMinutes: z.number().int().positive().optional(),
  locale: z.string().min(2).default('en'),
  draft: z.boolean().default(false),
  noindex: z.boolean().default(false),
  canonicalUrl: z.url().optional(),
  relatedSlugs: z.array(z.string().min(1)).default([]),
  faq: z.array(faqEntrySchema).optional(),
  seo: articleSeoOverrideSchema.optional()
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

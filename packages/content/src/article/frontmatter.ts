// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { authorSchema } from '../shared/author';
import { difficultySchema } from '../shared/difficulty';
import { faqEntrySchema } from '../shared/faq';
import { publishStatusSchema } from '../shared/publish-status';
import { semverSchema } from '../shared/semver';
import { articleCategorySchema } from './category';

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
  datePublished: z.date(),
  dateModified: z.date().optional(),
  coverImage: z.url().optional(),
  coverImageAlt: z.string().min(1).optional(),
  readingTimeMinutes: z.number().int().positive().optional(),
  locale: z.string().min(2).default('en'),
  translationGroupId: z.string().min(1).optional(),
  draft: z.boolean().default(false),
  publishStatus: publishStatusSchema.optional(),
  publishAt: z.date().optional(),
  reviewedBy: z.string().min(1).optional(),
  approvedBy: z.string().min(1).optional(),
  contentVersion: semverSchema.optional(),
  noindex: z.boolean().default(false),
  canonicalUrl: z.url().optional(),
  relatedSlugs: z.array(z.string().min(1)).default([]),
  faq: z.array(faqEntrySchema).optional(),
  seo: articleSeoOverrideSchema.optional()
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

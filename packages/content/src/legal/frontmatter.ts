// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { legalCategorySchema } from './category';
import { publishStatusSchema, semverSchema } from '../shared';

export const legalFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: legalCategorySchema,
  version: semverSchema,
  effectiveDate: z.date(),
  updateDate: z.date().optional(),
  summary: z.string().min(1),
  requiresExplicitConsent: z.boolean(),
  locale: z.string().min(2).default('en'),
  translationGroupId: z.string().min(1).optional(),
  draft: z.boolean().optional().default(false),
  publishStatus: publishStatusSchema.optional(),
  publishAt: z.date().optional(),
  reviewedBy: z.string().min(1).optional(),
  approvedBy: z.string().min(1).optional()
});

export type LegalFrontmatter = z.infer<typeof legalFrontmatterSchema>;

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { legalCategorySchema } from './category';

export const legalFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: legalCategorySchema,
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'version must be semver (x.y.z)'),
  effectiveDate: z.date(),
  summary: z.string().min(1),
  requiresExplicitConsent: z.boolean(),
  draft: z.boolean().optional().default(false),
});

export type LegalFrontmatter = z.infer<typeof legalFrontmatterSchema>;

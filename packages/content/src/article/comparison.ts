// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { articleFrontmatterSchema } from './frontmatter';

export const comparisonSubjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  pros: z.array(z.string().min(1)).default([]),
  cons: z.array(z.string().min(1)).default([]),
  bestFor: z.string().min(1).optional()
});

export type ComparisonSubject = z.infer<typeof comparisonSubjectSchema>;

export const comparisonFrontmatterSchema = articleFrontmatterSchema.extend({
  type: z.literal('comparison'),
  subjects: z.array(comparisonSubjectSchema).min(2),
  verdict: z.string().min(1).optional()
});

export type ComparisonFrontmatter = z.infer<typeof comparisonFrontmatterSchema>;

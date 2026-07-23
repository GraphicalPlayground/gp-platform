// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { articleFrontmatterSchema } from './frontmatter';

export const roadmapStatusSchema = z.enum(['planned', 'in-progress', 'shipped']);

export type RoadmapStatus = z.infer<typeof roadmapStatusSchema>;

export const roadmapFrontmatterSchema = articleFrontmatterSchema.extend({
  type: z.literal('roadmap'),
  status: roadmapStatusSchema,
  targetQuarter: z
    .string()
    .regex(/^\d{4}-Q[1-4]$/, 'targetQuarter must be like 2026-Q3')
    .optional(),
  relatedChangelogSlug: z.string().min(1).optional()
});

export type RoadmapFrontmatter = z.infer<typeof roadmapFrontmatterSchema>;

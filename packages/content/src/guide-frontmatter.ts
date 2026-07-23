// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { articleFrontmatterSchema } from './article-frontmatter';

export const guideFrontmatterSchema = articleFrontmatterSchema.extend({
  type: z.literal('guide'),
  prerequisites: z.array(z.string().min(1)).default([]),
  estimatedTimeMinutes: z.number().int().positive(),
  toolsRequired: z.array(z.string().min(1)).default([])
});

export type GuideFrontmatter = z.infer<typeof guideFrontmatterSchema>;

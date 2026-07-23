// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { referenceSchema } from '../shared/reference';
import { articleFrontmatterSchema } from './frontmatter';

export const breakdownFrontmatterSchema = articleFrontmatterSchema.extend({
  type: z.literal('breakdown'),
  subject: z.string().min(1),
  prerequisites: z.array(z.string().min(1)).default([]),
  sources: z.array(referenceSchema).default([])
});

export type BreakdownFrontmatter = z.infer<typeof breakdownFrontmatterSchema>;

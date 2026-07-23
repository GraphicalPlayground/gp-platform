// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { articleFrontmatterSchema } from './frontmatter';

export const techArticleFrontmatterSchema = articleFrontmatterSchema.extend({
  type: z.literal('tech-article'),
  prerequisites: z.array(z.string().min(1)).default([])
});

export type TechArticleFrontmatter = z.infer<typeof techArticleFrontmatterSchema>;

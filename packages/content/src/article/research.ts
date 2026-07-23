// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { authorSchema } from '../shared/author';
import { referenceSchema } from '../shared/reference';
import { articleFrontmatterSchema } from './frontmatter';

export const researchFrontmatterSchema = articleFrontmatterSchema.extend({
  type: z.literal('research'),
  abstract: z.string().min(1),
  contributors: z.array(authorSchema).default([]),
  references: z.array(referenceSchema).default([]),
  methodology: z.string().min(1).optional(),
  datasetUrl: z.url().optional()
});

export type ResearchFrontmatter = z.infer<typeof researchFrontmatterSchema>;

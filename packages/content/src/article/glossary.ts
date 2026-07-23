// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { articleFrontmatterSchema } from './frontmatter';

export const glossaryFrontmatterSchema = articleFrontmatterSchema.extend({
  type: z.literal('glossary'),
  term: z.string().min(1),
  shortDefinition: z.string().min(1).max(300),
  relatedTerms: z.array(z.string().min(1)).default([])
});

export type GlossaryFrontmatter = z.infer<typeof glossaryFrontmatterSchema>;

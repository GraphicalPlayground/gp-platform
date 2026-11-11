// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { legalFrontmatterSchema } from './frontmatter';

export const subprocessorSchema = z.object({
  name: z.string().min(1),
  purpose: z.string().min(1),
  location: z.string().min(1),
  dpaUrl: z.url().optional()
});

export type Subprocessor = z.infer<typeof subprocessorSchema>;

export const subprocessorsFrontmatterSchema = legalFrontmatterSchema.extend({
  subprocessors: z.array(subprocessorSchema)
});

export type SubprocessorsFrontmatter = z.infer<typeof subprocessorsFrontmatterSchema>;

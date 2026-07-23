// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

export const articleCategorySchema = z.enum([
  'rendering-pipeline',
  'graphics-apis',
  'shaders',
  'engine-architecture',
  'math-for-graphics',
  'physics-simulation',
  'performance-optimization',
  'tooling',
  'career-and-certification',
  'industry-news'
]);

export type ArticleCategory = z.infer<typeof articleCategorySchema>;

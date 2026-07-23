// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { comparisonFrontmatterSchema } from './comparison';
import { glossaryFrontmatterSchema } from './glossary';
import { guideFrontmatterSchema } from './guide';
import { techArticleFrontmatterSchema } from './tech-article';

export const articleFrontmatterUnionSchema = z.discriminatedUnion('type', [
  guideFrontmatterSchema,
  comparisonFrontmatterSchema,
  techArticleFrontmatterSchema,
  glossaryFrontmatterSchema
]);

export type Article = z.infer<typeof articleFrontmatterUnionSchema>;

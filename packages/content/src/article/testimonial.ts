// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { articleFrontmatterSchema } from './frontmatter';

export const testimonialFrontmatterSchema = articleFrontmatterSchema.extend({
  type: z.literal('testimonial'),
  quote: z.string().min(1)
});

export type TestimonialFrontmatter = z.infer<typeof testimonialFrontmatterSchema>;

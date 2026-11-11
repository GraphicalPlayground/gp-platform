// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { socialLinkSchema } from '../shared/author';
import { articleFrontmatterSchema } from './frontmatter';

export const intervieweeSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  company: z.string().min(1).optional(),
  avatarUrl: z.url().optional(),
  url: z.url().optional(),
  socialLinks: z.array(socialLinkSchema).default([])
});

export type Interviewee = z.infer<typeof intervieweeSchema>;

export const interviewFormatSchema = z.enum(['text', 'video', 'podcast']);

export type InterviewFormat = z.infer<typeof interviewFormatSchema>;

export const interviewFrontmatterSchema = articleFrontmatterSchema.extend({
  type: z.literal('interview'),
  interviewee: intervieweeSchema,
  format: interviewFormatSchema.default('text'),
  highlightQuote: z.string().min(1).optional()
});

export type InterviewFrontmatter = z.infer<typeof interviewFrontmatterSchema>;

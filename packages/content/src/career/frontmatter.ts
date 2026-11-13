// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { publishStatusSchema } from '../shared/publish-status';

export const careerDepartmentSchema = z.enum([
  'engineering',
  'research',
  'curriculum',
  'infrastructure',
  'community',
  'design',
  'operations'
]);

export type CareerDepartment = z.infer<typeof careerDepartmentSchema>;

export const careerEngagementSchema = z.enum(['open-source', 'internship', 'contract', 'part-time', 'full-time']);

export type CareerEngagementType = z.infer<typeof careerEngagementSchema>;

export const careerFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  department: careerDepartmentSchema.default('engineering'),
  engagement: careerEngagementSchema.default('open-source'),
  location: z.string().min(1).default('Remote'),
  open: z.boolean().default(true),
  skills: z.array(z.string().min(1)).default([]),
  repositories: z.array(z.string().min(1)).default([]),
  applyUrl: z.url().optional(),
  contactEmail: z.string().min(1).optional(),
  locale: z.string().min(2).default('en'),
  translationGroupId: z.string().min(1).optional(),
  draft: z.boolean().default(false),
  publishStatus: publishStatusSchema.optional(),
  publishAt: z.date().optional(),
  postedAt: z.date().optional()
});

export type CareerFrontmatter = z.infer<typeof careerFrontmatterSchema>;

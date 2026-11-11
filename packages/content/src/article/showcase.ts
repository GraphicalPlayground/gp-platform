// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { socialLinkSchema } from '../shared/author';
import { articleFrontmatterSchema } from './frontmatter';

export const showcaseCreatorSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  avatarUrl: z.url().optional(),
  url: z.url().optional(),
  socialLinks: z.array(socialLinkSchema).default([])
});

export type ShowcaseCreator = z.infer<typeof showcaseCreatorSchema>;

export const showcaseFrontmatterSchema = articleFrontmatterSchema.extend({
  type: z.literal('showcase'),
  creator: showcaseCreatorSchema,
  projectUrl: z.url().optional(),
  repositoryUrl: z.url().optional(),
  technologies: z.array(z.string().min(1)).default([]),
  certificateSlug: z.string().min(1).optional()
});

export type ShowcaseFrontmatter = z.infer<typeof showcaseFrontmatterSchema>;

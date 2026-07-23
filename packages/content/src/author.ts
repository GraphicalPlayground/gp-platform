// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

export const socialLinkSchema = z.object({
  platform: z.string().min(1),
  url: z.url()
});

export type SocialLink = z.infer<typeof socialLinkSchema>;

export const authorSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  avatarUrl: z.url().optional(),
  bio: z.string().min(1).optional(),
  url: z.url().optional(),
  socialLinks: z.array(socialLinkSchema).default([])
});

export type Author = z.infer<typeof authorSchema>;

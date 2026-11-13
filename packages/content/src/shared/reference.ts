// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

export const referenceSchema = z.object({
  title: z.string().min(1),
  url: z.url()
});

export type Reference = z.infer<typeof referenceSchema>;

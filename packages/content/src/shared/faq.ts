// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

export const faqEntrySchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1)
});

export type FaqEntry = z.infer<typeof faqEntrySchema>;

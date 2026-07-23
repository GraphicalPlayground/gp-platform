// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

export const legalCategorySchema = z.enum(['consumer', 'business', 'licensing']);

export type LegalCategory = z.infer<typeof legalCategorySchema>;

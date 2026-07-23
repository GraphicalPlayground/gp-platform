// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

export const difficultySchema = z.enum(['beginner', 'intermediate', 'advanced']);

export type Difficulty = z.infer<typeof difficultySchema>;

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';
import { isSemver } from '@gp/types';
import type { Semver } from '@gp/types';

export const semverSchema = z
  .string()
  .refine(isSemver, {
    message: 'Invalid semantic version format (expected e.g., "1.0.0", "2.1.0-beta.1")'
  })
  .transform((val) => val as Semver);

export type SemverSchemaInput = z.input<typeof semverSchema>;
export type SemverSchemaOutput = z.output<typeof semverSchema>;

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

import { articleFrontmatterSchema } from './frontmatter';

export const changelogEntryTypeSchema = z.enum(['feature', 'improvement', 'fix', 'deprecation', 'breaking']);

export type ChangelogEntryType = z.infer<typeof changelogEntryTypeSchema>;

export const changelogFrontmatterSchema = articleFrontmatterSchema.extend({
  type: z.literal('changelog'),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'version must be semver (x.y.z)').optional(),
  changeTypes: z.array(changelogEntryTypeSchema).min(1)
});

export type ChangelogFrontmatter = z.infer<typeof changelogFrontmatterSchema>;

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { z } from 'zod';

export const publishStatusSchema = z.enum(['draft', 'in-review', 'scheduled', 'published', 'archived']);

export type PublishStatus = z.infer<typeof publishStatusSchema>;

/**
 * @brief Structural shape every collection's frontmatter must satisfy for publish-workflow resolution.
 */
export interface PublishWorkflowFields {
  draft?: boolean;
  publishStatus?: PublishStatus;
  publishAt?: Date;
  reviewedBy?: string;
  approvedBy?: string;
}

/**
 * @brief Resolves the effective publish status, reconciling the legacy `draft` boolean with the newer
 * `publishStatus` enum and auto-promoting a `scheduled` document whose `publishAt` has passed.
 */
export function resolvePublishStatus(frontmatter: PublishWorkflowFields, now: Date = new Date()): PublishStatus {
  const status = frontmatter.publishStatus ?? (frontmatter.draft ? 'draft' : 'published');

  if (status === 'scheduled' && frontmatter.publishAt && frontmatter.publishAt.getTime() <= now.getTime()) {
    return 'published';
  }

  return status;
}

/**
 * @brief Whether a document is currently visible to the public (i.e. resolves to `'published'`).
 */
export function isPubliclyVisible(frontmatter: PublishWorkflowFields, now?: Date): boolean {
  return resolvePublishStatus(frontmatter, now) === 'published';
}

/**
 * @brief Semantic checks Zod's per-field validation can't express without breaking the `.extend()`/
 * `discriminatedUnion` chains that depend on `articleFrontmatterSchema` staying a plain `ZodObject`.
 * @returns A human-readable error message, or `null` if the frontmatter is internally consistent.
 */
export function validatePublishWorkflow(frontmatter: PublishWorkflowFields): string | null {
  if (frontmatter.publishStatus === 'scheduled' && !frontmatter.publishAt) {
    return 'publishStatus "scheduled" requires a publishAt date';
  }

  return null;
}

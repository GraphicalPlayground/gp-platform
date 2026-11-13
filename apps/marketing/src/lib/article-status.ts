// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Article, PublishStatus } from '@gp/content';

export type ArticlePublishFields = Pick<Article, 'draft' | 'publishAt' | 'publishStatus'>;

const UNPUBLISHED_LABELS: Partial<Record<PublishStatus, string>> = {
  'archived': 'Archived article',
  'draft': 'Draft article',
  'in-review': 'In review',
  'scheduled': 'Scheduled article'
};

/**
 * @brief Resolves an article's effective publish status without importing Node-only CMS code.
 */
export function resolveArticlePublishStatus(frontmatter: ArticlePublishFields, now: Date = new Date()): PublishStatus {
  const status = frontmatter.publishStatus ?? (frontmatter.draft ? 'draft' : 'published');

  if (status === 'scheduled' && frontmatter.publishAt && frontmatter.publishAt.getTime() <= now.getTime()) {
    return 'published';
  }

  return status;
}

/**
 * @brief Returns the human-readable label for an unpublished article, or `null` when published.
 */
export function getDraftArticleLabel(frontmatter: ArticlePublishFields, now: Date = new Date()): string | null {
  return UNPUBLISHED_LABELS[resolveArticlePublishStatus(frontmatter, now)] ?? null;
}

/**
 * @brief Returns the dev-mode draft token label for an article, or `undefined` in production or when published.
 */
export function getDevDraftTokenLabel(
  frontmatter: ArticlePublishFields,
  now: Date = new Date(),
  nodeEnv: string | undefined = process.env['NODE_ENV']
): string | undefined {
  if (nodeEnv === 'production') {
    return undefined;
  }

  return getDraftArticleLabel(frontmatter, now) ?? undefined;
}

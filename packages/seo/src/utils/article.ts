// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Article } from '@gp/content';
import { Persons } from '@gp/constants';

/**
 * @brief Resolves the display/meta description for an article, falling back to `lede` when `description` is empty or `TODO`.
 */
export const resolveArticleDescription = (article: Article): string => {
  const seoDescription = article.seo?.description?.trim();

  if (seoDescription) return seoDescription;

  const trimmed = article.description.trim();

  if (trimmed.length === 0 || trimmed.toUpperCase() === 'TODO') {
    return article.lede;
  }

  return article.description;
};

/**
 * @brief Looks up a team member from `@gp/constants` by their URL slug (e.g. `mallory-scotton`).
 */
export const findPersonBySlug = (slug: string) => Object.values(Persons).find((person) => person.slug() === slug);

/**
 * @brief Normalizes a list of article authors (slugs or objects) into display names for metadata tags.
 */
export const resolveAuthorNames = (author: Article['author']): string[] => {
  const list = Array.isArray(author) ? author : [author];

  return list.map((entry) => {
    if (typeof entry !== 'string') return entry.name;

    return findPersonBySlug(entry)?.fullName ?? entry;
  });
};

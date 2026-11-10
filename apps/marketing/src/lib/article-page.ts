// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Metadata } from 'next';
import type { Article, ArticleType, CompiledMdxDocument } from '@gp/content';
import { SeoMetadata, Urls } from '@gp/seo';
import { ARTICLE_ROUTES } from './article-routes';
import { cms } from './cms';

/**
 * @brief Resolves a slug array or string into a normalized CMS slug string.
 */
export const normalizeSlugParam = (slug: string | string[]): string => (Array.isArray(slug) ? slug.join('/') : slug);

/**
 * @brief Loads an article only when its `frontmatter.type` matches the route's expected type.
 */
export const getTypedCompiledArticle = async (
  expectedType: ArticleType,
  slug: string | string[]
): Promise<CompiledMdxDocument<Article> | undefined> => {
  const doc = await cms.articles.getCompiledBySlug(normalizeSlugParam(slug));

  if (!doc || doc.frontmatter.type !== expectedType) {
    return undefined;
  }

  return doc;
};

/**
 * @brief Generates page metadata for an article `[...slug]` route, guarding against cross-type slug matches.
 */
export const generateArticleSlugMetadata = async (
  expectedType: ArticleType,
  slug: string | string[]
): Promise<Metadata> => {
  const normalizedSlug = normalizeSlugParam(slug);
  const doc = await cms.articles.getBySlug(normalizedSlug);

  if (!doc || doc.frontmatter.type !== expectedType) {
    return {};
  }

  const basePath = ARTICLE_ROUTES[expectedType].basePath;
  const frontmatter =
    doc.frontmatter.type === 'glossary'
      ? {
          ...doc.frontmatter,
          seo: {
            ...doc.frontmatter.seo,
            title: doc.frontmatter.seo?.title ?? `${doc.frontmatter.title}: Definition & Meaning`
          }
        }
      : doc.frontmatter;

  return SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).article(frontmatter, `${basePath}/${normalizedSlug}`);
};

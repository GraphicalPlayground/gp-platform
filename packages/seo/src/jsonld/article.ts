// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Article as SchemaArticle, WithContext } from 'schema-dts';
import type { Article as ArticleFrontmatter } from '@gp/content';
import { JsonLdIds } from './ids';
import { Urls } from '../utils';

/**
 * @brief Builds the JSON-LD `Article` representation of an `@gp/content` article, for any of its 10 article types
 * (guide, comparison, glossary, ...) since they all extend the same base frontmatter fields.
 * @param article - The article's frontmatter.
 * @param path - The path the article is served at, e.g. `/guides/my-guide`.
 */
export const buildArticleJsonLd = (article: ArticleFrontmatter, path: string): WithContext<SchemaArticle> => {
  const url = `${Urls.BaseUrl}${path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    'headline': article.title,
    'description': article.seo?.description ?? article.description,
    'image': article.coverImage,
    'datePublished': article.datePublished.toISOString(),
    'dateModified': article.dateModified?.toISOString() ?? article.datePublished.toISOString(),
    'author': {
      '@type': 'Person',
      'name': typeof article.author === 'string' ? article.author : article.author.name,
      ...(typeof article.author !== 'string' && article.author.url && { url: article.author.url })
    },
    'publisher': { '@id': JsonLdIds.organization },
    'mainEntityOfPage': { '@type': 'WebPage', '@id': url },
    'keywords': article.tags,
    'inLanguage': article.locale,
    'isAccessibleForFree': true
  };
};

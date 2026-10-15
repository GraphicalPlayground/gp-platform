// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { ArticleLeaf as SchemaArticle, WithContext } from 'schema-dts';
import type { Article as ArticleFrontmatter } from '@gp/content';
import { Organization, Persons } from '@gp/constants';
import { JsonLdIds } from './ids';
import type { PersonSlug } from './ids';

/**
 * @brief Builds the JSON-LD `Article` representation of an `@gp/content` article, for any of its 10 article types
 * (guide, comparison, glossary, ...) since they all extend the same base frontmatter fields.
 * @param article The article's frontmatter.
 * @param path The path the article is served at, e.g. `/guides/my-guide`.
 */
export const buildArticleJsonLd = (article: ArticleFrontmatter, path: string): WithContext<SchemaArticle> => {
  const url = `${Organization.url}${path}`;

  const getPersonFromSlug = (slug: string) => {
    const person = Object.values(Persons).find((p) => p.slug() === slug);

    if (!person) {
      return undefined;
    }

    return {
      '@type': 'Person' as const,
      '@id': JsonLdIds.person(slug as PersonSlug)
    };
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    'headline': article.title,
    'description': article.seo?.description ?? article.description,
    'image': article.coverImage,
    'datePublished': article.datePublished.toISOString(),
    'dateModified': article.dateModified?.toISOString() ?? article.datePublished.toISOString(),
    'author': Array.isArray(article.author)
      ? [...article.author.map((author) => getPersonFromSlug(author) ?? { '@type': 'Person' as const, 'name': author })]
      : typeof article.author === 'string'
        ? [getPersonFromSlug(article.author) ?? { '@type': 'Person' as const, 'name': article.author }]
        : [{ '@type': 'Person' as const, 'name': article.author.name, 'url': article.author.url }],
    'publisher': { '@id': JsonLdIds.organization },
    'mainEntityOfPage': { '@type': 'WebPage', '@id': url },
    'keywords': article.tags,
    'inLanguage': article.locale,
    'isAccessibleForFree': true
  };
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Graph, Thing, Article as SchemaArticle, FAQPage, WebPage, Person } from 'schema-dts';
import type { Article, SchemaEntity } from '@gp/content';
import { Organization, Persons } from '@gp/constants';
import { JsonLdIds } from './ids';
import type { PersonSlug } from './ids';

/**
 * @brief Builds a rich JSON-LD `@graph` representation of an `@gp/content` article.
 * @param article The article's frontmatter.
 * @param path The path the article is served at, e.g. `/guides/my-guide`.
 */
export const buildArticleJsonLd = (article: Article, path: string): Graph => {
  const url = article.canonicalUrl ?? `${Organization.url}${path}`;
  const articleId = `${url}#article`;
  const webpageId = `${url}#webpage`;

  const getPersonFromSlug = (slug: string): Person | undefined => {
    const person = Object.values(Persons).find((p) => p.slug() === slug);

    if (!person) return undefined;

    return {
      '@type': 'Person',
      '@id': JsonLdIds.person(slug as PersonSlug)
    };
  };

  const authors = Array.isArray(article.author)
    ? article.author.map((author) => getPersonFromSlug(author) ?? { '@type': 'Person' as const, 'name': author })
    : typeof article.author === 'string'
      ? [getPersonFromSlug(article.author) ?? { '@type': 'Person' as const, 'name': article.author }]
      : [{ '@type': 'Person' as const, 'name': article.author.name, 'url': article.author.url }];

  const schemaType = article.type === 'tech-article' ? 'TechArticle' : 'Article';

  const mapEntities = (entities?: SchemaEntity[]): Thing[] | undefined => {
    if (!entities || entities.length === 0) return undefined;

    return entities.map(
      (entity) =>
        ({
          '@type': entity.type,
          'name': entity.name,
          'sameAs': entity.sameAs.length === 1 ? entity.sameAs[0] : entity.sameAs
        }) as Thing
    );
  };

  let synonyms: string[] = [];
  let citations: (string | { '@type': 'WebPage'; 'url': string; 'name'?: string })[] = [];

  if (article.type === 'breakdown') {
    synonyms = article.synonims ?? [];

    if (article.sources) {
      citations = article.sources.map((source) => {
        if (typeof source === 'string') return source;

        return {
          '@type': 'WebPage',
          'url': source.url,
          'name': source.title
        };
      });
    }
  }

  const articleSchema: SchemaArticle = {
    '@type': schemaType,
    '@id': articleId,
    'mainEntityOfPage': { '@id': webpageId },
    'headline': article.seo?.title ?? article.title,
    ...(synonyms.length > 0 && { alternateName: synonyms }),
    ...(citations.length > 0 && { citation: citations as Thing[] }),
    'description': article.seo?.description ?? article.description,
    'abstract': article.lede,
    'image': article.coverImage,
    'datePublished': article.datePublished.toISOString(),
    'dateModified': article.dateModified?.toISOString() ?? article.datePublished.toISOString(),
    'author': authors,
    'publisher': { '@id': JsonLdIds.organization },
    'keywords': article.tags,
    'about': mapEntities(article.about),
    'mentions': mapEntities(article.mentions),
    'inLanguage': article.locale,
    'isAccessibleForFree': true,
    'version': article.contentVersion,
    ...(article.reviewedBy && {
      reviewedBy: getPersonFromSlug(article.reviewedBy) ?? { '@type': 'Person', 'name': article.reviewedBy }
    })
  } as SchemaArticle;

  const webPageSchema: WebPage = {
    '@type': 'WebPage',
    '@id': webpageId,
    'url': url,
    'name': article.seo?.title ?? article.title,
    'description': article.seo?.description ?? article.description,
    'isPartOf': { '@id': `${Organization.url}/#website` }
  };

  const graphNodes: Thing[] = [webPageSchema, articleSchema];

  if (article.faq && article.faq.length > 0) {
    const faqSchema: FAQPage = {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      'mainEntity': article.faq.map((qa) => ({
        '@type': 'Question',
        'name': qa.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': qa.answer
        }
      }))
    };

    graphNodes.push(faqSchema);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graphNodes
  };
};

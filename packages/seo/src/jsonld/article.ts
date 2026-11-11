// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type {
  Article as SchemaArticle,
  DefinedTerm,
  FAQPage,
  Graph,
  Person,
  ScholarlyArticle,
  SoftwareSourceCode,
  TechArticle,
  Thing,
  WebPage
} from 'schema-dts';
import type { Article, Author, Reference, SchemaEntity } from '@gp/content';
import { Organization } from '@gp/constants';
import { findPersonBySlug, resolveArticleDescription } from '../utils/article';
import { JsonLdIds } from './ids';
import type { PersonSlug } from './ids';

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

const mapPerson = (entry: Author): Person | Person[] => {
  if (Array.isArray(entry)) {
    return entry.map((slug) => mapPerson(slug) as Person);
  }

  if (typeof entry !== 'string') {
    return {
      '@type': 'Person',
      'name': entry.name,
      ...(entry.url && { url: entry.url })
    };
  }

  const person = findPersonBySlug(entry);

  if (!person) {
    return { '@type': 'Person', 'name': entry };
  }

  return {
    '@type': 'Person',
    '@id': JsonLdIds.person(entry as PersonSlug),
    'name': person.fullName,
    'url': person.url
  };
};

const mapReferences = (references: Reference[]): Thing[] =>
  references.map((source) => {
    if (typeof source === 'string') return source as unknown as Thing;

    return {
      '@type': 'WebPage',
      'url': source.url,
      ...(source.title && { name: source.title })
    } as WebPage;
  });

const resolveArticleSchemaType = (type: Article['type']): 'ScholarlyArticle' | 'TechArticle' | 'Article' => {
  switch (type) {
    case 'research':
      return 'ScholarlyArticle';
    case 'tech-article':
    case 'breakdown':
    case 'guide':
    case 'changelog':
      return 'TechArticle';
    default:
      return 'Article';
  }
};

/**
 * @brief Builds a rich JSON-LD `@graph` representation of an `@gp/content` article.
 * @param article The article's frontmatter.
 * @param path The path the article is served at, e.g. `/guides/my-guide`.
 */
export const buildArticleJsonLd = (article: Article, path: string): Graph => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = article.canonicalUrl ?? `${Organization.url}${normalizedPath}`;
  const articleId = `${url}#article`;
  const webpageId = `${url}#webpage`;
  const title = article.seo?.title ?? article.title;
  const description = resolveArticleDescription(article);
  const image = article.coverImage ?? `${Organization.url}/opengraph-image`;

  const authors = Array.isArray(article.author)
    ? article.author.map((entry) => mapPerson(entry) as Person)
    : [mapPerson(article.author) as Person];

  const schemaType = resolveArticleSchemaType(article.type);
  const baseAbout = mapEntities(article.about) ?? [];
  const baseMentions = mapEntities(article.mentions) ?? [];
  const graphNodes: Thing[] = [];

  const typeSpecificProps: Record<string, unknown> = {
    articleSection: article.category,
    educationalLevel: article.difficulty
  };

  let mainWebPageEntity: Thing = { '@id': articleId } as Thing;

  if (article.type === 'breakdown') {
    typeSpecificProps['proficiencyLevel'] = article.difficulty;
    if (article.synonims.length > 0) typeSpecificProps['alternateName'] = article.synonims;
    if (article.sources.length > 0) typeSpecificProps['citation'] = mapReferences(article.sources);
  } else if (article.type === 'tech-article') {
    typeSpecificProps['proficiencyLevel'] = article.difficulty;
  } else if (article.type === 'guide') {
    typeSpecificProps['proficiencyLevel'] = article.difficulty;
    typeSpecificProps['timeRequired'] = `PT${article.estimatedTimeMinutes}M`;
    if (article.toolsRequired.length > 0) {
      typeSpecificProps['dependencies'] = article.toolsRequired.join(', ');
    }
  } else if (article.type === 'research') {
    typeSpecificProps['abstract'] = article.abstract;
    if (article.references.length > 0) typeSpecificProps['citation'] = mapReferences(article.references);
    if (article.contributors.length > 0) {
      typeSpecificProps['contributor'] = article.contributors.flatMap((c) => mapPerson(c));
    }
    if (article.datasetUrl) typeSpecificProps['isBasedOn'] = article.datasetUrl;
  } else if (article.type === 'glossary') {
    const termId = `${url}#term`;
    const definedTerm: DefinedTerm = {
      '@type': 'DefinedTerm',
      '@id': termId,
      'name': article.term,
      'description': article.shortDefinition,
      'url': url,
      ...(article.synonims.length > 0 && { alternateName: article.synonims }),
      'inDefinedTermSet': {
        '@type': 'DefinedTermSet',
        '@id': `${Organization.url}/glossary#termset`,
        'name': `${Organization.displayName} Graphics Engineering Glossary`,
        'url': `${Organization.url}/glossary`
      }
    };

    graphNodes.push(definedTerm);
    baseAbout.push({ '@id': termId } as Thing);
    mainWebPageEntity = { '@id': termId } as Thing;
  } else if (article.type === 'interview') {
    const { company, name, socialLinks, title: roleTitle, url: intervieweeUrl } = article.interviewee;
    const intervieweeNode: Person = {
      '@type': 'Person',
      'name': name,
      'jobTitle': roleTitle,
      ...(company && { worksFor: { '@type': 'Organization', 'name': company } }),
      ...(intervieweeUrl && { url: intervieweeUrl }),
      ...(socialLinks.length > 0 && { sameAs: socialLinks.map((link) => link.url) })
    };

    baseMentions.push(intervieweeNode);
    typeSpecificProps['contributor'] = intervieweeNode;
  } else if (article.type === 'comparison') {
    for (const subject of article.subjects) {
      baseAbout.push({
        '@type': 'Thing',
        'name': subject.name,
        'description': subject.description
      });
    }
  } else if (article.type === 'changelog') {
    if (article.version ?? article.contentVersion) {
      typeSpecificProps['version'] = article.version ?? article.contentVersion;
    }
  } else if (article.type === 'showcase') {
    const projectNode: SoftwareSourceCode = {
      '@type': 'SoftwareSourceCode',
      '@id': `${url}#project`,
      'name': title,
      'description': description,
      ...(article.projectUrl && { url: article.projectUrl }),
      ...(article.repositoryUrl && { codeRepository: article.repositoryUrl }),
      ...(article.technologies.length > 0 && { programmingLanguage: article.technologies }),
      'creator': {
        '@type': 'Person',
        'name': article.creator.name,
        ...(article.creator.url && { url: article.creator.url })
      }
    };

    baseAbout.push(projectNode);
  }

  const articleSchema: SchemaArticle | TechArticle | ScholarlyArticle = {
    '@type': schemaType,
    '@id': articleId,
    'mainEntityOfPage': { '@id': webpageId },
    'isPartOf': { '@id': JsonLdIds.website },
    'headline': title,
    'description': description,
    'abstract': article.type === 'research' ? article.abstract : article.lede,
    'image': image,
    'datePublished': article.datePublished.toISOString(),
    'dateModified': (article.dateModified ?? article.datePublished).toISOString(),
    'author': authors,
    'publisher': { '@id': JsonLdIds.organization },
    ...(article.tags.length > 0 && { keywords: article.tags }),
    ...(baseAbout.length > 0 && { about: baseAbout }),
    ...(baseMentions.length > 0 && { mentions: baseMentions }),
    'inLanguage': article.locale,
    'isAccessibleForFree': true,
    ...(article.contentVersion && { version: article.contentVersion }),
    ...(article.reviewedBy && { reviewedBy: mapPerson(article.reviewedBy) }),
    ...typeSpecificProps
  } as SchemaArticle | TechArticle | ScholarlyArticle;

  const webPageSchema: WebPage = {
    '@type': 'WebPage',
    '@id': webpageId,
    'url': url,
    'name': title,
    'description': description,
    'inLanguage': article.locale,
    'datePublished': article.datePublished.toISOString(),
    'dateModified': (article.dateModified ?? article.datePublished).toISOString(),
    'primaryImageOfPage': { '@type': 'ImageObject', 'url': image },
    'mainEntity': mainWebPageEntity,
    'breadcrumb': { '@id': JsonLdIds.breadcrumb(normalizedPath) },
    'isPartOf': { '@id': JsonLdIds.website }
  };

  graphNodes.unshift(webPageSchema, articleSchema);

  if (article.faq && article.faq.length > 0) {
    const faqSchema: FAQPage = {
      '@type': 'FAQPage',
      '@id': JsonLdIds.faq(normalizedPath),
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

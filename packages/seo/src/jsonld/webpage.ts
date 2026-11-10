// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type {
  AboutPage,
  ContactPage,
  CreativeWork,
  FAQPage,
  ItemPage,
  ProfilePage,
  SearchResultsPage,
  SoftwareApplication,
  Thing,
  WebPage,
  WithContext
} from 'schema-dts';
import { Organization } from '@gp/constants';
import { JsonLdIds } from './ids';

export type WebPageSchemaType =
  'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'ItemPage' | 'ProfilePage' | 'SearchResultsPage';

export type WebPageSchemaUnion =
  WebPage | AboutPage | ContactPage | FAQPage | ItemPage | ProfilePage | SearchResultsPage;

export type JsonLdRef = { '@id': string } | Thing | SoftwareApplication | CreativeWork;

/**
 * @brief Input for {@link buildWebPageJsonLd}.
 */
export interface WebPageJsonLdInput {
  path: string;
  name: string;
  description: string;
  type?: WebPageSchemaType;
  inLanguage?: string;
  datePublished?: string;
  dateModified?: string;
  version?: string;
  keywords?: string[];
  about?: JsonLdRef | JsonLdRef[];
  mainEntity?: JsonLdRef;
  primaryImageOfPage?: string;
  hasBreadcrumb?: boolean;
}

/**
 * @brief Builds a JSON-LD `WebPage` (or specialized `AboutPage`/`ContactPage`...) linked into the global site graph.
 */
export const buildWebPageJsonLd = (input: WebPageJsonLdInput): WithContext<WebPageSchemaUnion> => {
  const normalizedPath = input.path === '/' ? '' : input.path.startsWith('/') ? input.path : `/${input.path}`;
  const url = `${Organization.url}${normalizedPath}`;
  const image = input.primaryImageOfPage ?? `${Organization.url}/opengraph-image`;

  return {
    '@context': 'https://schema.org',
    '@type': input.type ?? 'WebPage',
    '@id': JsonLdIds.webpage(input.path),
    'url': url,
    'name': input.name,
    'description': input.description,
    'inLanguage': input.inLanguage ?? 'en',
    'isPartOf': { '@id': JsonLdIds.website },
    'publisher': { '@id': JsonLdIds.organization },
    'primaryImageOfPage': {
      '@type': 'ImageObject',
      'url': image
    },
    ...(input.hasBreadcrumb && { breadcrumb: { '@id': JsonLdIds.breadcrumb(input.path) } }),
    ...(input.datePublished && { datePublished: input.datePublished }),
    ...(input.dateModified && { dateModified: input.dateModified }),
    ...(input.version && { version: input.version }),
    ...(input.keywords?.length && { keywords: input.keywords }),
    ...(input.about && { about: input.about as Thing | Thing[] }),
    ...(input.mainEntity && { mainEntity: input.mainEntity as Thing })
  };
};

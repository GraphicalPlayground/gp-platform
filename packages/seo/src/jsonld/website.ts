// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { WithContext, WebSite, SearchAction } from 'schema-dts';
import { Organization, Keywords } from '@gp/constants';
import { JsonLdIds } from './ids';

type SearchActionWithQueryInput = SearchAction & { 'query-input': string };

/**
 * @brief JSON-LD representation of the Graphical Playground website.
 */
export const website: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': JsonLdIds.website,
  'name': Organization.displayName,
  'alternateName': Organization.alternateNames,
  'url': Organization.url,
  'description': Organization.description,
  'about': { '@id': JsonLdIds.organization },
  'publisher': { '@id': JsonLdIds.organization },
  'creator': { '@id': JsonLdIds.organization },
  'owner': { '@id': JsonLdIds.organization },
  'maintainer': { '@id': JsonLdIds.organization },
  'copyrightHolder': { '@id': JsonLdIds.organization },
  'copyrightNotice': 'Copyright (c) Graphical Playground. All rights reserved.',
  'copyrightYear': new Date().getFullYear(),
  'license': `${Organization.url}/legal/terms-of-service`,
  'inLanguage': [{ '@id': JsonLdIds.language('en') }, { '@id': JsonLdIds.language('fr') }],
  'isAccessibleForFree': true,
  'isFamilyFriendly': true,
  'keywords': Keywords,
  'teaches': Keywords,
  'potentialAction': {
    '@type': 'SearchAction',
    'target': {
      '@type': 'EntryPoint',
      'urlTemplate': `${Organization.url}/glossary?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  } as SearchActionWithQueryInput,
  'sameAs': [Organization.subdomain('docs'), Organization.subdomain('status'), ...Object.values(Organization.socials)]
};

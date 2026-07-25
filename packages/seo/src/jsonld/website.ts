// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { WithContext, WebSite } from 'schema-dts';
import { JsonLdIds, Urls } from './ids';
import { keywords } from './keywords';

/**
 * @brief JSON-LD representation of the Graphical Playground website.
 */
export const website: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': JsonLdIds.website,
  'name': 'Graphical Playground',
  'alternateName': ['GPlayd', 'GP', 'Graphical Playground Platform', 'gp-platform'],
  'url': Urls.BaseUrl,
  'description':
    'An interactive, browser-based platform where students deconstruct and rebuild graphics-engine systems from the ground up, from raw Vulkan commands to full render pipelines. Explore creative coding, canvas experiments, and real-time graphics programming.',
  'publisher': { '@id': JsonLdIds.organization },
  'creator': { '@id': JsonLdIds.organization },
  'owner': { '@id': JsonLdIds.organization },
  'maintainer': { '@id': JsonLdIds.organization },
  'copyrightHolder': { '@id': JsonLdIds.organization },
  'copyrightNotice': 'Copyright (c) Graphical Playground. All rights reserved.',
  'copyrightYear': new Date().getFullYear(),
  'inLanguage': [{ '@id': JsonLdIds.language('en') }, { '@id': JsonLdIds.language('fr') }],
  'isAccessibleForFree': true,
  'isFamilyFriendly': true,
  'keywords': keywords,
  'teaches': keywords,
  'sameAs': [Urls.SubDomain('docs'), Urls.SubDomain('status'), ...Object.values(Urls.Socials)]
};

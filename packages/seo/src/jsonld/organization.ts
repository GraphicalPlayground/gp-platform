// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Organization, WithContext } from 'schema-dts';
import { JsonLdIds, Urls } from './ids';
import { keywords } from './keywords';

/**
 * @brief JSON-LD representation of the Graphical Playground organization.
 */
export const organization: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': JsonLdIds.organization,
  'name': 'Graphical Playground',
  'alternateName': ['GPlayd', 'GP'],
  'legalName': 'Graphical Playground',
  'description':
    'An interactive, browser-based platform where students deconstruct and rebuild graphics-engine systems from the ground up, from raw Vulkan commands to full render pipelines. Explore creative coding, canvas experiments, and real-time graphics programming.',
  'url': Urls.BaseUrl,
  'logo': {
    '@type': 'ImageObject',
    '@id': JsonLdIds.logo,
    'url': `${Urls.BaseUrl}/icons/icon-square-512x512.png`,
    'contentUrl': `${Urls.BaseUrl}/icons/icon-square-512x512.png`,
    'caption': 'Graphical Playground Logo'
  },
  'image': {
    '@id': JsonLdIds.logo
  },
  'email': Urls.Mail('support'),
  'foundingLocation': { '@id': `${Urls.BaseUrl}/#localization` },
  'location': { '@id': `${Urls.BaseUrl}/#localization` },
  'legalAddress': { '@id': `${Urls.BaseUrl}/#localization` },
  'sameAs': Object.values(Urls.Socials),
  'founder': [
    { '@id': JsonLdIds.person('mallory-scotton') },
    { '@id': JsonLdIds.person('hugo-cathelain') },
    { '@id': JsonLdIds.person('ossan-msoili') },
    { '@id': JsonLdIds.person('raphael-ostier') },
    { '@id': JsonLdIds.person('nathan-fievet') }
  ],
  'knowsLanguage': [{ '@id': JsonLdIds.language('en') }, { '@id': JsonLdIds.language('fr') }],
  'knowsAbout': keywords,
  'contactPoint': [
    { '@id': JsonLdIds.contact('support') },
    { '@id': JsonLdIds.contact('legal') },
    { '@id': JsonLdIds.contact('press') },
    { '@id': JsonLdIds.contact('sales') },
    { '@id': JsonLdIds.contact('security') }
  ]
};

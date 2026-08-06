// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Organization as SchemaOrganization, WithContext } from 'schema-dts';
import { Organization } from '@gp/constants';
import { JsonLdIds } from './ids';

/**
 * @brief JSON-LD representation of the Graphical Playground organization.
 */
export const organization: WithContext<SchemaOrganization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': JsonLdIds.organization,
  'name': Organization.name,
  'alternateName': Organization.alternateNames,
  'legalName': Organization.legalName,
  'description': Organization.description,
  'url': Organization.url,
  'logo': {
    '@type': 'ImageObject',
    '@id': JsonLdIds.logo,
    'url': `${Organization.url}/icons/icon-square-512x512.png`,
    'contentUrl': `${Organization.url}/icons/icon-square-512x512.png`,
    'caption': Organization.product('Logo')
  },
  'image': {
    '@id': JsonLdIds.logo
  },
  'email': Organization.mailto('support'),
  'foundingDate': Organization.foundingDate.toISOString(),
  'foundingLocation': { '@id': JsonLdIds.localization },
  'location': { '@id': JsonLdIds.localization },
  'legalAddress': { '@id': JsonLdIds.localization },
  'sameAs': [Organization.subdomain('docs'), Organization.subdomain('status'), ...Object.values(Organization.socials)],
  'founder': [
    { '@id': JsonLdIds.person('mallory-scotton') },
    { '@id': JsonLdIds.person('hugo-cathelain') },
    { '@id': JsonLdIds.person('ossan-msoili') },
    { '@id': JsonLdIds.person('raphael-ostier') },
    { '@id': JsonLdIds.person('nathan-fievet') }
  ],
  'knowsLanguage': [{ '@id': JsonLdIds.language('en') }, { '@id': JsonLdIds.language('fr') }],
  'knowsAbout': Organization.knowsAbout,
  'contactPoint': [
    { '@id': JsonLdIds.contact('support') },
    { '@id': JsonLdIds.contact('legal') },
    { '@id': JsonLdIds.contact('press') },
    { '@id': JsonLdIds.contact('sales') },
    { '@id': JsonLdIds.contact('security') }
  ]
};

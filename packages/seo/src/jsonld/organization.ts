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
  'name': Organization.displayName,
  'alternateName': Organization.alternateNames,
  'legalName': Organization.legalName,
  'description': Organization.description,
  'slogan': Organization.tagline,
  'url': Organization.url,
  'logo': {
    '@type': 'ImageObject',
    '@id': JsonLdIds.logo,
    'url': `${Organization.url}/favicon.svg`,
    'contentUrl': `${Organization.url}/favicon.svg`,
    'encodingFormat': 'image/svg+xml',
    'width': { '@type': 'QuantitativeValue', 'value': 512 },
    'height': { '@type': 'QuantitativeValue', 'value': 512 },
    'caption': Organization.product('Logo')
  },
  'image': {
    '@id': JsonLdIds.logo
  },
  'email': Organization.mailto('support'),
  'foundingDate': Organization.foundingDate.toISOString(),
  'foundingLocation': {
    '@type': 'Place',
    'address': { '@id': JsonLdIds.localization }
  },
  'location': { '@id': JsonLdIds.localization },
  'address': { '@id': JsonLdIds.localization },
  'publishingPrinciples': `${Organization.url}/legal`,
  'sameAs': [Organization.subdomain('docs'), Organization.subdomain('status'), ...Object.values(Organization.socials)],
  'founder': [
    { '@id': JsonLdIds.person('mallory-scotton') },
    { '@id': JsonLdIds.person('hugo-cathelain') },
    { '@id': JsonLdIds.person('ossan-msoili') },
    { '@id': JsonLdIds.person('raphael-ostier') },
    { '@id': JsonLdIds.person('nathan-fievet') }
  ],
  'owns': [
    { '@id': JsonLdIds.application('gp-platform') },
    { '@id': JsonLdIds.application('gp-engine') },
    { '@id': JsonLdIds.application('gp-docs') }
  ],
  'knowsLanguage': [{ '@id': JsonLdIds.language('en') }, { '@id': JsonLdIds.language('fr') }],
  'knowsAbout': Organization.knowsAbout,
  'contactPoint': [
    { '@id': JsonLdIds.contact('support') },
    { '@id': JsonLdIds.contact('contact') },
    { '@id': JsonLdIds.contact('security') },
    { '@id': JsonLdIds.contact('marketing') },
    { '@id': JsonLdIds.contact('legal') },
    { '@id': JsonLdIds.contact('sponsor') },
    { '@id': JsonLdIds.contact('press') },
    { '@id': JsonLdIds.contact('billing') },
    { '@id': JsonLdIds.contact('partnerships') },
    { '@id': JsonLdIds.contact('feedback') },
    { '@id': JsonLdIds.contact('accessibility') },
    { '@id': JsonLdIds.contact('abuse') },
    { '@id': JsonLdIds.contact('careers') },
    { '@id': JsonLdIds.contact('privacy') },
    { '@id': JsonLdIds.contact('sales') }
  ]
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { PostalAddress, WithContext } from 'schema-dts';
import { Organization } from '@gp/constants';
import { JsonLdIds } from './ids';

/**
 * @brief JSON-LD representation of the Graphical Playground localization.
 */
export const localization: WithContext<PostalAddress> = {
  '@context': 'https://schema.org',
  '@type': 'PostalAddress',
  '@id': JsonLdIds.localization,
  'addressCountry': Organization.address.country,
  'addressLocality': Organization.address.city,
  'postalCode': Organization.address.postalCode,
  'streetAddress': Organization.address.line1,
  'addressRegion': Organization.address.state,
  'availableLanguage': [{ '@id': JsonLdIds.language('en') }, { '@id': JsonLdIds.language('fr') }],
  'email': Organization.mailto('support')
};

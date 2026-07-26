// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { PostalAddress, WithContext } from 'schema-dts';
import { JsonLdIds } from './ids';
import { Urls } from '../utils';

/**
 * @brief JSON-LD representation of the Graphical Playground localization.
 */
export const localization: WithContext<PostalAddress> = {
  '@context': 'https://schema.org',
  '@type': 'PostalAddress',
  '@id': JsonLdIds.localization,
  'addressCountry': 'FR',
  'addressLocality': 'Lyon',
  'postalCode': '69007',
  'streetAddress': '2 rue Professeur Charles Appleton',
  'addressRegion': 'Auvergne-Rhône-Alpes',
  'availableLanguage': [{ '@id': JsonLdIds.language('en') }, { '@id': JsonLdIds.language('fr') }],
  'email': Urls.Mail('support')
};

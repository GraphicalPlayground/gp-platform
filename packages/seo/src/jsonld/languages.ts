// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { WithContext, Language } from 'schema-dts';
import { JsonLdIds } from './ids';
import type { LanguageSlug } from './ids';

/**
 * @brief A collection of JSON-LD representations of languages used in the Graphical Playground platform.
 */
export const languages: Record<LanguageSlug, WithContext<Language>> = {
  en: {
    '@context': 'https://schema.org',
    '@type': 'Language',
    '@id': JsonLdIds.language('en'),
    'name': 'English',
    'alternateName': [
      'en',
      'eng',
      'en-US',
      'en-GB',
      'en-AU',
      'en-CA',
      'en-NZ',
      'en-ZA',
      'en-IE',
      'en-IN',
      'en-PH',
      'en-SG',
      'en-HK',
      'en-MY'
    ]
  },
  fr: {
    '@context': 'https://schema.org',
    '@type': 'Language',
    '@id': JsonLdIds.language('fr'),
    'name': 'French',
    'alternateName': [
      'fr',
      'fra',
      'fre',
      'fr-FR',
      'fr-CA',
      'fr-BE',
      'fr-CH',
      'fr-LU',
      'fr-MC',
      'fr-CM',
      'fr-CI',
      'fr-SN',
      'fr-MA',
      'fr-DZ',
      'fr-TN'
    ]
  }
};

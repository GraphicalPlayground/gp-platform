// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { Urls } from '../utils';

export type ContactSlug = 'support' | 'legal' | 'press' | 'sales' | 'security';
export type LanguageSlug = 'en' | 'fr';
export type PersonSlug = 'mallory-scotton' | 'hugo-cathelain' | 'ossan-msoili' | 'raphael-ostier' | 'nathan-fievet';
export type SoftwareSlug = 'gp-platform' | 'gp-engine' | 'gp-docs';

/**
 * @brief A collection of JSON-LD IDs for various entities used in the Graphical Playground platform.
 */
export const JsonLdIds = {
  organization: `${Urls.BaseUrl}/#organization`,
  website: `${Urls.BaseUrl}/#website`,
  person: (slug: PersonSlug) => `${Urls.BaseUrl}/team/${slug}#person`,
  logo: `${Urls.BaseUrl}/#logo`,
  localization: `${Urls.BaseUrl}/#localization`,
  language: (lang: LanguageSlug) => `${Urls.BaseUrl}/#language-${lang}`,
  contact: (slug: ContactSlug) => `${Urls.BaseUrl}/#contact-${slug}`,
  sourceCode: (slug: SoftwareSlug) => `${Urls.BaseUrl}/#software-source-code-${slug}`,
  application: (slug: SoftwareSlug) => `${Urls.BaseUrl}/#software-application-${slug}`
} as const;

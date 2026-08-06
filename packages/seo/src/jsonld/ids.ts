// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { Organization } from '@gp/constants';

export type ContactSlug = 'support' | 'legal' | 'press' | 'sales' | 'security';
export type LanguageSlug = 'en' | 'fr';
export type PersonSlug = 'mallory-scotton' | 'hugo-cathelain' | 'ossan-msoili' | 'raphael-ostier' | 'nathan-fievet';
export type SoftwareSlug = 'gp-platform' | 'gp-engine' | 'gp-docs';

/**
 * @brief A collection of JSON-LD IDs for various entities used in the Graphical Playground platform.
 */
export const JsonLdIds = {
  organization: `${Organization.url}/#organization`,
  website: `${Organization.url}/#website`,
  person: (slug: PersonSlug) => `${Organization.url}/team/${slug}#person`,
  logo: `${Organization.url}/#logo`,
  localization: `${Organization.url}/#localization`,
  language: (lang: LanguageSlug) => `${Organization.url}/#language-${lang}`,
  contact: (slug: ContactSlug) => `${Organization.url}/#contact-${slug}`,
  sourceCode: (slug: SoftwareSlug) => `${Organization.url}/#software-source-code-${slug}`,
  application: (slug: SoftwareSlug) => `${Organization.url}/#software-application-${slug}`
} as const;

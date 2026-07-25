// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/* Base domain for the Graphical Playground platform */
const BASE_DOMAIN = 'graphical-playground.com';

/**
 * @brief A collection of URLs used in the Graphical Playground platform.
 */
export const Urls = {
  /**
   * @brief The base URL for the Graphical Playground platform.
   */
  BaseUrl: `https://${BASE_DOMAIN}`,

  /**
   * @brief Generates a URL for a subdomain of the Graphical Playground platform.
   * @param sub - The subdomain to generate the URL for.
   * @returns The full URL for the specified subdomain.
   */
  SubDomain: (sub: string) => `https://${sub}.${BASE_DOMAIN}`,

  /**
   * @brief A collection of social media URLs for the Graphical Playground platform.
   */
  Socials: {
    LinkedIn: 'https://www.linkedin.com/company/GraphicalPlayground',
    GitHub: 'https://github.com/GraphicalPlayground',
    Discord: `https://discord.${BASE_DOMAIN}`
  },

  /**
   * @brief Generates a mailto link for the specified user on the Graphical Playground platform.
   * @param user - The user to generate the mailto link for.
   * @returns The mailto link for the specified user.
   */
  Mail: (user: string) => `mailto:${user}@${BASE_DOMAIN}`
} as const;

export type ContactSlug = 'support' | 'legal' | 'press' | 'sales' | 'security';
export type LanguageSlug = 'en' | 'fr';
export type PersonSlug = 'mallory-scotton' | 'hugo-cathelain' | 'ossan-msoili' | 'raphael-ostier' | 'nathan-fievet';

/**
 * @brief A collection of JSON-LD IDs for various entities used in the Graphical Playground platform.
 */
export const JsonLdIds = {
  organization: `${Urls.BaseUrl}/#organization`,
  website: `${Urls.BaseUrl}/#website`,
  person: (slug: PersonSlug) => `${Urls.BaseUrl}/team/${slug}#person`,
  software: `${Urls.BaseUrl}/#software`,
  logo: `${Urls.BaseUrl}/#logo`,
  localization: `${Urls.BaseUrl}/#localization`,
  language: (lang: LanguageSlug) => `${Urls.BaseUrl}/#language-${lang}`,
  contact: (slug: ContactSlug) => `${Urls.BaseUrl}/#contact-${slug}`
} as const;

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/* Base domain for the Graphical Playground platform */
const BASE_DOMAIN = 'graphical-playground.com';

/**
 * @brief Strips trailing slashes from a URL, without relying on a backtracking-prone regex.
 * @param url - The URL to trim.
 * @returns The URL without any trailing slashes.
 */
export const trimTrailingSlash = (url: string): string => {
  let end = url.length;
  while (end > 0 && url[end - 1] === '/') end--;
  return url.slice(0, end);
};

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
   * @brief Generates a URL for a GitHub repository under the Graphical Playground organization.
   * @param slug - The slug of the repository to generate the URL for.
   * @returns The full URL for the specified GitHub repository.
   */
  Repository: (slug: string) => `https://github.com/GraphicalPlayground/${slug}`,

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

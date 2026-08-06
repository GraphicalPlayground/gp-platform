// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { Organization } from '@gp/constants';

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
 * @brief Backwards-compatible facade over `@gp/constants`'s `Organization`, kept for the app-level consumers
 * (`apps/marketing`, `apps/app`, `apps/admin`) that import `Urls` from `@gp/seo/utils`. New code within `@gp/seo`
 * itself should import `Organization` from `@gp/constants` directly instead.
 */
export const Urls = {
  BaseUrl: Organization.url,
  SubDomain: Organization.subdomain,
  Repository: (name: string) => Organization.repository(name),
  Socials: Organization.socials,
  Mail: Organization.mailto
} as const;

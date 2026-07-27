// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { MetadataRoute } from 'next';
import type { AppTarget } from '../utils/target';
import { isPubliclyIndexable } from '../utils/target';
import { trimTrailingSlash } from '../utils/urls';

/**
 * @brief A single sitemap entry, relative to the app's base URL.
 */
export interface SitemapEntry {
  /**
   * @brief Path of the page relative to the app's base URL, e.g. '/about'.
   */
  path: string;

  lastModified?: string | Date;
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority?: number;

  /**
   * @brief Maps a locale to the path of its translated version of this page, for hreflang alternates.
   */
  alternateLocales?: Record<string, string>;
}

/**
 * @brief Builds `MetadataRoute.Sitemap` entries for a given app target.
 * @details Non-indexable targets (admin, app) always resolve to an empty sitemap, regardless of the entries passed
 * in — mirrors {@link SeoRobots}'s target-aware defaults so a stray entry can never leak a private route.
 */
export class SeoSitemap {
  private constructor(
    private readonly target: AppTarget,
    private readonly baseUrl: string
  ) {}

  /**
   * @brief Factory method to create a SeoSitemap instance for a specific target and base URL.
   * @param target - The app target (admin, app, or marketing) to generate the sitemap for.
   * @param baseUrl - The canonical base URL of the app.
   */
  static for(target: AppTarget, baseUrl: string): SeoSitemap {
    return new SeoSitemap(target, baseUrl);
  }

  /**
   * @brief Turns a list of entries into a Next.js sitemap, or an empty sitemap for non-indexable targets.
   * @param entries - The pages to include in the sitemap.
   */
  build(entries: SitemapEntry[]): MetadataRoute.Sitemap {
    if (!isPubliclyIndexable(this.target)) return [];

    const base = trimTrailingSlash(this.baseUrl);

    return entries.map((entry) => ({
      url: `${base}${entry.path}`,
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      ...(entry.alternateLocales && {
        alternates: {
          languages: Object.fromEntries(
            Object.entries(entry.alternateLocales).map(([locale, path]) => [locale, `${base}${path}`])
          )
        }
      })
    }));
  }
}

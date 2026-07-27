// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { MetadataRoute } from 'next';
import { SeoSitemap } from '@gp/seo/sitemap';
import { Urls } from '@gp/seo/utils';

/**
 * @brief Generates the sitemap for the website.
 * @returns An object representing the sitemap entries.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return SeoSitemap.for('marketing', Urls.BaseUrl).build([
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/pricing', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
    { path: '/careers', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/events', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/security', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/sponsors', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/community', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/press', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/help', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/donate', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/accessibility', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/legal', changeFrequency: 'monthly', priority: 0.4 }
    // Append dynamic entries here by mapping over `cms.articles.getAll()` / `cms.legal.getAll()`
    // (see apps/marketing/src/lib/cms.ts) once those content routes render real content.
  ]);
}

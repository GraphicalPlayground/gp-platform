// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { siteConfig } from '@/config/site';
import type { MetadataRoute } from 'next';

/**
 * @brief Generates the sitemap for the website.
 * @returns An object representing the sitemap entries.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.links.website;
  const lastModified = new Date();

  // prettier-ignore
  const staticRoutes: MetadataRoute.Sitemap = [
    // HIGH PRIORITY
    { url: `${baseUrl}`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/features`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.8 },

    // MEDIUM PRIORITY
    { url: `${baseUrl}/changelog`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/security`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/help`, lastModified, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/careers`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/press`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/sponsors`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/accessibility`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/brand-guidelines`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/licensing`, lastModified, changeFrequency: 'yearly', priority: 0.5 },

    // LOW PRIORITY
    { url: `${baseUrl}/legal/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/legal/tos`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/legal/aup`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/legal/cookie`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/legal/dpa`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/legal/eula`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/legal/oss`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/legal/ssa`, lastModified, changeFrequency: 'yearly', priority: 0.2 }
  ];

  return [...staticRoutes];
}

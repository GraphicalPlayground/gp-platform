// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { MetadataRoute } from 'next';
import { SeoSitemap } from '@gp/seo/sitemap';
import { Urls } from '@gp/seo/utils';

/**
 * @brief Generates the sitemap for the website. Always empty: `admin` is a private, authenticated
 * product surface and is never publicly indexed.
 * @returns An object representing the sitemap entries.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return SeoSitemap.for('admin', Urls.SubDomain('admin')).build([]);
}

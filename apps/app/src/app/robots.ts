// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { MetadataRoute } from 'next';
import { SeoRobots } from '@gp/seo/robots';
import { Urls } from '@gp/seo/utils';

/**
 * @brief This function generates the robots.txt content for the website.
 * It allows all user agents to access the entire site and specifies the location of the sitemap.
 * @returns An object representing the robots.txt rules and sitemap location.
 */
export default function robots(): MetadataRoute.Robots {
  return SeoRobots.for('app', {
    baseUrl: Urls.SubDomain('app')
  }).toMetadataRoute();
}

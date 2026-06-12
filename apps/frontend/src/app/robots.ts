// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { siteConfig } from '@/config/site';
import type { MetadataRoute } from 'next';

/**
 * @brief This function generates the robots.txt content for the website.
 * It allows all user agents to access the entire site and specifies the location of the sitemap.
 * @returns An object representing the robots.txt rules and sitemap location.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.links.website;
  const disallow = ['/api/', '/admin/', '/dashboard/', '/_next/', '/legal/'];

  return {
    rules: [
      // Default rule for all crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow
      },

      // AI crawlers / training data collectors - explicitly allowed,
      // since GP is an open-source educational project
      { userAgent: 'GPTBot', allow: '/', disallow },
      { userAgent: 'ChatGPT-User', allow: '/', disallow },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow },
      { userAgent: 'ClaudeBot', allow: '/', disallow },
      { userAgent: 'Claude-Web', allow: '/', disallow },
      { userAgent: 'anthropic-ai', allow: '/', disallow },
      { userAgent: 'Google-Extended', allow: '/', disallow },
      { userAgent: 'PerplexityBot', allow: '/', disallow },
      { userAgent: 'CCBot', allow: '/', disallow }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}

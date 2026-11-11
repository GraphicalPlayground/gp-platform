// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { MetadataRoute } from 'next';
import { SeoSitemap } from '@gp/seo/sitemap';
import type { SitemapEntry } from '@gp/seo/sitemap';
import { Urls } from '@gp/seo/utils';
import { getArticlePath } from '@/lib/article-routes';
import { cms } from '@/lib/cms';

/**
 * @brief Generates the sitemap for the website.
 * @returns An object representing the sitemap entries.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Collect all legal and article documents from the CMS to include in the sitemap.
  const legals: SitemapEntry[] = (await cms.legal.getAll()).map((doc) => ({
    path: `/legal/${doc.slug}`,
    changeFrequency: 'yearly',
    priority: 0.4,
    lastModified: doc.frontmatter.updateDate ?? doc.frontmatter.effectiveDate
  }));

  // Collect all indexable article documents from the CMS to include in the sitemap.
  const articles: SitemapEntry[] = (await cms.articles.getAll())
    .filter((doc) => !doc.frontmatter.noindex)
    .map((doc) => ({
      path: getArticlePath(doc.frontmatter.type, doc.slug),
      changeFrequency: 'weekly',
      priority: 0.6,
      lastModified: doc.frontmatter.dateModified ?? doc.frontmatter.datePublished
    }));

  return SeoSitemap.for('marketing', Urls.BaseUrl).build([
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/curriculum', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/certifications', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/features', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/pricing', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/waitlist', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/faq', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
    { path: '/careers', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/events', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/security', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/sponsors', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/brand-guidelines', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/products', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/products/engine', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/products/cloud', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/products/studio', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/products/platform', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/products/handbook', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/community', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/press', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/help', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/sitemap', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/donate', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/accessibility', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/legal', changeFrequency: 'monthly', priority: 0.5 },
    ...legals,
    { path: '/breakdowns', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/changelogs', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/comparisons', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/glossary', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/guides', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/interviews', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/research', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/roadmaps', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/showcases', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/tech-articles', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/testimonials', changeFrequency: 'monthly', priority: 0.6 },
    ...articles
  ]);
}

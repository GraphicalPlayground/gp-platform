// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Metadata } from 'next';
import type { ArticleType } from '@gp/content';
import { SeoMetadata } from '@gp/seo/metadata';
import { Urls } from '@gp/seo/utils';
import type { SearchParams } from '@/components/content-index';
import { ARTICLE_ROUTES } from './article-routes';

/**
 * @brief Returns true when any search, filter, sort, or pagination query parameter has a non-empty value.
 */
export const hasActiveQueryParams = (searchParams: SearchParams): boolean =>
  Object.values(searchParams).some((value) => {
    if (Array.isArray(value)) return value.some((entry) => entry.trim().length > 0);

    return typeof value === 'string' && value.trim().length > 0;
  });

/**
 * @brief Builds page metadata for any content index route, keeping a clean canonical URL and marking filtered views `noindex, follow`.
 */
export const buildContentIndexMetadata = (type: ArticleType, searchParams: SearchParams): Metadata => {
  const route = ARTICLE_ROUTES[type];
  const isFiltered = hasActiveQueryParams(searchParams);

  return SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
    path: route.basePath,
    title: route.title,
    description: route.description,
    keywords: route.keywords,
    ...(isFiltered && { noindex: true, follow: true })
  });
};

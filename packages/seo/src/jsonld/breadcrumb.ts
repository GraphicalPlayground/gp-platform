// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { BreadcrumbList, WithContext } from 'schema-dts';
import { Organization } from '@gp/constants';

/**
 * @brief A single crumb in a breadcrumb trail.
 */
export interface BreadcrumbItem {
  name: string;

  /**
   * @brief Path of the crumb relative to the site's base URL, e.g. '/guides'.
   */
  path: string;
}

/**
 * @brief Builds the JSON-LD `BreadcrumbList` representation of a breadcrumb trail.
 * @details Pure data builder, meant to be rendered via `<BreadcrumbJsonLd>` right next to the actual visual
 * breadcrumb component, from the exact same `items` array — never generated independently from page frontmatter,
 * to guarantee the structured data can't drift from what's visibly rendered.
 * @param items - The trail of crumbs, from the site root to the current page.
 */
export const buildBreadcrumbJsonLd = (items: BreadcrumbItem[]): WithContext<BreadcrumbList> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': items.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.name,
    'item': `${Organization.url}${item.path}`
  }))
});

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { CollectionPageLeaf, WithContext } from 'schema-dts';
import { Organization } from '@gp/constants';

/**
 * @brief A single entry in a collection/catalog listing, e.g. a course card on a catalog page.
 */
export interface CollectionListItem {
  name: string;

  /**
   * @brief Path of the item relative to the site's base URL, e.g. '/courses/vulkan-fundamentals'.
   */
  path: string;

  image?: string;
}

/**
 * @brief Input for {@link buildCollectionPageJsonLd}.
 */
export interface CollectionPageJsonLdInput {
  name: string;
  description: string;

  /**
   * @brief Path the listing page is served at, e.g. `/courses`.
   */
  path: string;

  items: CollectionListItem[];
}

/**
 * @brief Builds the JSON-LD `CollectionPage`/`ItemList` representation of a catalog or listing page.
 * @details Pure data builder, meant to be rendered via a `<CollectionJsonLd>` right next to the actual listing
 * component, from the exact same `items` array — never generated independently from the rendered cards, to
 * guarantee the structured data can't drift from what's visibly shown.
 * @param input - The listing page's name/description and the items it lists, in display order.
 */
export const buildCollectionPageJsonLd = (input: CollectionPageJsonLdInput): WithContext<CollectionPageLeaf> => {
  const url = `${Organization.url}${input.path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    'url': url,
    'name': input.name,
    'description': input.description,
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': input.items.length,
      'itemListElement': input.items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': `${Organization.url}${item.path}`,
        ...(item.image && { image: item.image })
      }))
    }
  };
};

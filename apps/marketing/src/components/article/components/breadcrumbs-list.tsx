// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { Breadcrumbs } from '@gp/ui/components';
import type { BreadcrumbItem } from '@gp/seo/jsonld';
import { BreadcrumbJsonLd } from '@gp/seo/react';

type BreadcrumbsListProps = {
  items: BreadcrumbItem[];
  selectLastItem?: boolean;
};

/**
 * @brief Renders a list of breadcrumbs and the corresponding JSON-LD structured data.
 * @details This component is meant to be used in article pages, where the breadcrumb trail is generated from the
 * article's frontmatter. The `items` prop should be passed the exact same array of crumbs that is used to render the
 */
export const BreadcrumbsList: React.FC<BreadcrumbsListProps> = ({ items, selectLastItem = false }) => {
  return (
    <>
      <Breadcrumbs>
        {items.map(({ name, path }, index) => {
          return (
            <Breadcrumbs.Item
              key={`${name}-${index}`}
              data-ref={`article-breadcrumb-link-${name}`}
              href={path}
              {...(selectLastItem && index === items.length - 1 && { selected: true })}
            >
              {name}
            </Breadcrumbs.Item>
          );
        })}
      </Breadcrumbs>
      <BreadcrumbJsonLd items={items} />
    </>
  );
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cms } from '@/lib/cms';
import type { ArticleType } from '@gp/content';
import { CollectionJsonLd } from '@gp/seo/react';
import { ContentIndex } from './content-index';
import type { ContentIndexProps } from './content-index';
import { buildContentIndex } from './content-index.utils';
import type { SearchParams } from './content-index.utils';

export interface ContentIndexPageProps extends Pick<
  ContentIndexProps,
  'title' | 'description' | 'basePath' | 'emptyStateMessage' | 'showSpotlight'
> {
  /**
   * @brief Article type listed by this index.
   */
  type: ArticleType;
  searchParams: SearchParams;
  pageSize?: number;
}

/**
 * @brief Server entry point of a content index: loads the articles, applies the URL filters and emits the JSON-LD.
 */
export async function ContentIndexPage({ pageSize, searchParams, type, ...props }: ContentIndexPageProps) {
  const docs = await cms.articles.getByType(type);
  const index = buildContentIndex(docs, searchParams, { basePath: props.basePath, pageSize });

  return (
    <>
      <CollectionJsonLd
        description={props.description}
        items={index.items.map((item) => ({ name: item.title, path: item.href, image: item.coverImage }))}
        name={props.title}
        path={props.basePath}
      />
      <ContentIndex {...props} {...index} />
    </>
  );
}

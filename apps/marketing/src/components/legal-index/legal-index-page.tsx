// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cms } from '@/lib/cms';
import { CollectionJsonLd } from '@gp/seo/react';
import { LegalIndex } from './legal-index';
import type { LegalIndexProps } from './legal-index';
import { buildLegalIndex } from './legal-index.utils';
import type { SearchParams } from './legal-index.utils';

export interface LegalIndexPageProps extends Pick<
  LegalIndexProps,
  'title' | 'description' | 'basePath' | 'emptyStateMessage'
> {
  searchParams: SearchParams;
  pageSize?: number;
}

/**
 * @brief Server entry point of the legal overview/index page: loads published legal docs, applies URL filters, and emits JSON-LD.
 */
export async function LegalIndexPage({ basePath = '/legal', pageSize, searchParams, ...props }: LegalIndexPageProps) {
  const docs = await cms.legal.getAll({ includeDrafts: false });
  const index = buildLegalIndex(docs, searchParams, { basePath, pageSize });

  return (
    <>
      <CollectionJsonLd
        description={props.description}
        items={index.items.map((item) => ({ name: item.title, path: item.href }))}
        name={props.title}
        path={basePath}
      />
      <LegalIndex {...props} {...index} basePath={basePath} />
    </>
  );
}

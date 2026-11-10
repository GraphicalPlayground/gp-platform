// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { buildArticleJsonLd } from '../jsonld/article';
import { JsonLd } from './JsonLd';
import type { Article as ArticleFrontmatter } from '@gp/content';

/**
 * @brief Props for the ArticleJsonLd component.
 */
export interface ArticleJsonLdProps {
  article: ArticleFrontmatter;
  path: string;
}

/**
 * @brief Renders the JSON-LD `Article` (or `TechArticle` / `ScholarlyArticle`) `@graph` for an `@gp/content` article.
 */
export const ArticleJsonLd = ({ article, path }: ArticleJsonLdProps) => (
  <JsonLd data={buildArticleJsonLd(article, path)} />
);

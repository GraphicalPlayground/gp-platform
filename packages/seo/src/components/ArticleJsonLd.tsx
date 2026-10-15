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
 * @brief Renders the JSON-LD `FAQPage` for a list of FAQ entries.
 * @details Render this right next to your visual FAQ component, passing it the exact same `items` array, so the
 * structured data can never drift from what's actually shown on the page.
 */
export const ArticleJsonLd = ({ article, path }: ArticleJsonLdProps) => (
  <JsonLd data={buildArticleJsonLd(article, path)} />
);

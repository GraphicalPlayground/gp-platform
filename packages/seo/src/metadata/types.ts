// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Metadata } from 'next';
import type { LanguageCode } from '@gp/types/primitives';

/**
 * @brief A single social preview image, shared between Open Graph and Twitter cards.
 */
export interface SeoImage {
  url: string;
  width?: number;
  height?: number;
  alt: string;
}

/**
 * @brief The kind of content a page represents, mapped to the Open Graph `og:type` value.
 */
export type SeoContentType = 'website' | 'article';

/**
 * @brief Options shared by every page generated for a given app target.
 */
export interface SeoMetadataOptions {
  /**
   * @brief Canonical base URL of the app.
   * @example https://graphical-playground.com
   */
  baseUrl: string;

  /**
   * @brief Title used when a page doesn't provide its own.
   */
  defaultTitle?: string;

  /**
   * @brief Printf-style template applied to every page title, e.g. '%s | Graphical Playground'.
   */
  titleTemplate?: string;

  /**
   * @brief Description used when a page doesn't provide its own.
   */
  description?: string;

  /**
   * @brief Primary locale of the app.
   * @default 'en'
   */
  locale?: LanguageCode;

  /**
   * @brief Other locales this app is also available in, used for `alternates.languages`.
   */
  alternateLocales?: LanguageCode[];

  /**
   * @brief Twitter/X handle of the site, e.g. '@graphicalplayground', used for `twitter:site`.
   */
  twitterSite?: string;

  /**
   * @brief Search-console-style ownership verification tokens.
   */
  verification?: Metadata['verification'];
}

/**
 * @brief Per-page input for {@link SeoMetadata.page}.
 */
export interface PageMetadataInput {
  /**
   * @brief Path of the page relative to the app's base URL, e.g. '/about'.
   */
  path: string;

  title?: string;
  description?: string;
  type?: SeoContentType;
  images?: SeoImage[];
  keywords?: string[];

  /**
   * @brief Overrides the target's default indexing decision for this one page.
   */
  noindex?: boolean;

  /**
   * @brief ISO 8601 timestamps, only meaningful when `type` is 'article'.
   */
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;

  locale?: LanguageCode;

  /**
   * @brief Maps a locale to the path of its translated version of this page, for hreflang alternates.
   */
  alternateLocales?: Partial<Record<LanguageCode, string>>;
}

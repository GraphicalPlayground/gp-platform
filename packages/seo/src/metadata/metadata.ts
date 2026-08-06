// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Metadata } from 'next';
import type { Article, LegalFrontmatter } from '@gp/content';
import { Organization, Keywords } from '@gp/constants';
import type { AppTarget } from '../utils/target';
import { isPubliclyIndexable } from '../utils/target';
import { trimTrailingSlash } from '../utils/urls';
import { SeoRobots } from '../robots/robots';
import type { PageMetadataInput, SeoMetadataOptions } from './types';
import { buildOpenGraph, buildTwitter } from './opengraph';
import { mergeMetadata } from './merge';

/**
 * @brief Builds Next.js Metadata API objects for a given app target (admin, app, or marketing).
 * @details Rich SEO/GEO metadata (Open Graph, Twitter cards, keywords, verification) only ever gets generated for
 * the marketing target — admin and app are private, authenticated surfaces that must never look attractive to a
 * crawler, so {@link isPubliclyIndexable} gates every optional field on top of the robots/noindex defaults.
 */
export class SeoMetadata {
  private constructor(
    private readonly target: AppTarget,
    private readonly options: SeoMetadataOptions
  ) {}

  /**
   * @brief Factory method to create a SeoMetadata instance for a specific target and options.
   * @param target - The app target (admin, app, or marketing) to generate metadata for.
   * @param options - App-wide metadata options (base URL, title template, locales, ...).
   */
  static for(target: AppTarget, options: SeoMetadataOptions): SeoMetadata {
    return new SeoMetadata(target, options);
  }

  /**
   * @brief Resolves a path relative to the app's base URL into an absolute URL.
   */
  private resolveUrl(path: string): string {
    return `${trimTrailingSlash(this.options.baseUrl)}${path}`;
  }

  /**
   * @brief Root layout metadata: title template, icons, robots meta tag, and (marketing-only) Open Graph/Twitter
   * defaults. This is a defense-in-depth layer alongside {@link SeoRobots}'s robots.txt and middleware headers.
   */
  base(): Metadata {
    const indexable = isPubliclyIndexable(this.target);
    const homeInput: PageMetadataInput = {
      path: '/',
      title: this.options.defaultTitle ?? Organization.name,
      description: this.options.description ?? Organization.description
    };

    return {
      metadataBase: new URL(this.options.baseUrl),
      title: {
        default: this.options.defaultTitle ?? Organization.name,
        template: this.options.titleTemplate ?? `%s | ${Organization.name}`
      },
      description: this.options.description ?? Organization.description,
      applicationName: Organization.name,
      generator: 'Next.js',
      referrer: 'strict-origin-when-cross-origin',
      formatDetection: { email: false, address: false, telephone: false },
      robots: SeoRobots.pageRobots(indexable),
      icons: { icon: '/favicon.svg' },
      ...(indexable && {
        keywords: [...Keywords],
        alternates: { canonical: '/' },
        openGraph: buildOpenGraph(this.target, homeInput, this.options, this.resolveUrl('/')),
        twitter: buildTwitter(this.target, homeInput, this.options),
        verification: this.options.verification
      })
    };
  }

  /**
   * @brief Per-page metadata for use in a route's `generateMetadata`/`metadata` export.
   * @param input - Title, description, canonical path, and other page-specific fields.
   */
  page(input: PageMetadataInput): Metadata {
    const url = this.resolveUrl(input.path);
    const indexable = isPubliclyIndexable(this.target) && input.noindex !== true;

    const languages = input.alternateLocales
      ? Object.fromEntries(
          Object.entries(input.alternateLocales)
            .filter((entry): entry is [string, string] => entry[1] !== undefined)
            .map(([locale, path]) => [locale, this.resolveUrl(path)])
        )
      : undefined;

    return {
      title: input.title,
      description: input.description,
      keywords: input.keywords,
      robots: input.noindex !== undefined ? SeoRobots.pageRobots(indexable) : undefined,
      alternates: { canonical: url, ...(languages && { languages }) },
      openGraph: buildOpenGraph(this.target, input, this.options, url),
      twitter: buildTwitter(this.target, input, this.options)
    };
  }

  /**
   * @brief Convenience builder deriving full page Metadata from an `@gp/content` article frontmatter object.
   * @details Works across every article type (guide, comparison, glossary, ...) since they all extend the same
   * base `articleFrontmatterSchema` fields.
   * @param frontmatter - The article's frontmatter.
   * @param path - The path the article is served at, e.g. `/guides/my-guide`.
   */
  article(frontmatter: Article, path: string): Metadata {
    const metadata = this.page({
      path,
      title: frontmatter.seo?.title ?? frontmatter.title,
      description: frontmatter.seo?.description ?? frontmatter.description,
      type: 'article',
      images: frontmatter.coverImage ? [{ url: frontmatter.coverImage, alt: frontmatter.coverImageAlt ?? '' }] : [],
      keywords: frontmatter.tags,
      noindex: frontmatter.noindex || frontmatter.draft,
      publishedTime: frontmatter.datePublished.toISOString(),
      modifiedTime: frontmatter.dateModified?.toISOString(),
      authors: [typeof frontmatter.author === 'string' ? frontmatter.author : frontmatter.author.name],
      section: frontmatter.category,
      locale: frontmatter.locale
    });

    return frontmatter.canonicalUrl
      ? mergeMetadata(metadata, { alternates: { canonical: frontmatter.canonicalUrl } })
      : metadata;
  }

  /**
   * @brief Convenience builder deriving page Metadata from an `@gp/content` legal document frontmatter object.
   * @param frontmatter - The legal document's frontmatter.
   * @param path - The path the document is served at, e.g. `/legal/privacy-policy`.
   */
  legal(frontmatter: LegalFrontmatter, path: string): Metadata {
    return this.page({
      path,
      title: frontmatter.title,
      description: frontmatter.summary,
      noindex: frontmatter.draft
    });
  }
}

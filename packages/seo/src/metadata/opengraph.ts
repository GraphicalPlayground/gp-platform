// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Metadata } from 'next';
import { Organization } from '@gp/constants';
import type { AppTarget } from '../utils/target';
import { isPubliclyIndexable } from '../utils/target';
import { trimTrailingSlash } from '../utils/urls';
import type { PageMetadataInput, SeoImage, SeoMetadataOptions } from './types';

const DEFAULT_OG_IMAGE_DIMENSIONS = { width: 1200, height: 630 } as const;

/**
 * @brief Normalizes a list of SeoImage into the shape Open Graph/Twitter card metadata expects.
 */
const toOgImages = (images?: SeoImage[]) =>
  images?.map((image) => ({ url: image.url, width: image.width, height: image.height, alt: image.alt }));

const resolveFallbackOgImages = (input: PageMetadataInput, options: SeoMetadataOptions, title: string) => {
  const explicit = toOgImages(input.images);

  if (explicit?.length) return explicit;
  if (input.path === '/') return undefined;

  return [
    {
      url: `${trimTrailingSlash(options.baseUrl)}/opengraph-image`,
      width: DEFAULT_OG_IMAGE_DIMENSIONS.width,
      height: DEFAULT_OG_IMAGE_DIMENSIONS.height,
      alt: title
    }
  ];
};

/**
 * @brief Builds Open Graph metadata for a page. Only marketing gets rich social previews: app/admin are behind
 * auth and never publicly indexed, so there is no reason to render social preview data for them.
 * @param target - The app target the page belongs to.
 * @param input - The page-level metadata input.
 * @param options - The app-wide metadata options.
 * @param resolvedUrl - The fully-qualified, absolute URL of the page.
 * @returns Open Graph metadata, or undefined when the target isn't publicly indexable.
 */
export const buildOpenGraph = (
  target: AppTarget,
  input: PageMetadataInput,
  options: SeoMetadataOptions,
  resolvedUrl: string
): Metadata['openGraph'] | undefined => {
  if (!isPubliclyIndexable(target)) return undefined;

  const title = input.title ?? options.defaultTitle ?? Organization.displayName;
  const description = input.description ?? options.description ?? Organization.description;
  const images = resolveFallbackOgImages(input, options, title);
  const locale = input.locale ?? options.locale ?? 'en';

  if (input.type === 'article') {
    return {
      type: 'article',
      siteName: Organization.displayName,
      title,
      description,
      url: resolvedUrl,
      locale,
      ...(images?.length && { images }),
      ...(input.publishedTime && { publishedTime: input.publishedTime }),
      ...(input.modifiedTime && { modifiedTime: input.modifiedTime }),
      ...(input.authors?.length && { authors: input.authors }),
      ...(input.section && { section: input.section }),
      ...(input.keywords?.length && { tags: input.keywords })
    };
  }

  return {
    type: 'website',
    siteName: Organization.displayName,
    title,
    description,
    url: resolvedUrl,
    locale,
    ...(images?.length && { images })
  };
};

/**
 * @brief Builds Twitter/X card metadata for a page. Marketing-only, mirroring {@link buildOpenGraph}.
 * @param target - The app target the page belongs to.
 * @param input - The page-level metadata input.
 * @param options - The app-wide metadata options.
 * @returns Twitter card metadata, or undefined when the target isn't publicly indexable.
 */
export const buildTwitter = (
  target: AppTarget,
  input: PageMetadataInput,
  options: SeoMetadataOptions
): Metadata['twitter'] | undefined => {
  if (!isPubliclyIndexable(target)) return undefined;

  const title = input.title ?? options.defaultTitle ?? Organization.displayName;
  const images = resolveFallbackOgImages(input, options, title)?.map((image) => image.url);

  return {
    card: 'summary_large_image',
    ...(options.twitterSite && { site: options.twitterSite }),
    title,
    description: input.description ?? options.description ?? Organization.description,
    ...(images?.length && { images })
  };
};

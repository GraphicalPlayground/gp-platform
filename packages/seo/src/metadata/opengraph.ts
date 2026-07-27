// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Metadata } from 'next';
import type { AppTarget } from '../utils/target';
import { isPubliclyIndexable } from '../utils/target';
import type { PageMetadataInput, SeoImage, SeoMetadataOptions } from './types';
import { Constants } from '../utils/constants';

/**
 * @brief Normalizes a list of SeoImage into the shape Open Graph/Twitter card metadata expects.
 */
const toOgImages = (images?: SeoImage[]) =>
  images?.map((image) => ({ url: image.url, width: image.width, height: image.height, alt: image.alt }));

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

  const title = input.title ?? options.defaultTitle ?? Constants.name;
  const description = input.description ?? options.description ?? Constants.description;
  const images = toOgImages(input.images);
  const locale = input.locale ?? options.locale ?? 'en';

  if (input.type === 'article') {
    return {
      type: 'article',
      siteName: Constants.name,
      title,
      description,
      url: resolvedUrl,
      locale,
      images,
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime,
      authors: input.authors,
      section: input.section,
      tags: input.keywords
    };
  }

  return {
    type: 'website',
    siteName: Constants.name,
    title,
    description,
    url: resolvedUrl,
    locale,
    images
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

  const images = toOgImages(input.images)?.map((image) => image.url);

  return {
    card: images?.length ? 'summary_large_image' : 'summary',
    site: options.twitterSite,
    title: input.title ?? options.defaultTitle ?? Constants.name,
    description: input.description ?? options.description ?? Constants.description,
    images
  };
};

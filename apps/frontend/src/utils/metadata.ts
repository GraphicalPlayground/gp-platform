// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

/**
 * @brief Interface defining the shape of options that can be passed to the createMetadata function to customize the metadata for a Next.js page.
 */
interface CreateMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: Metadata['openGraph'] | { type: string };
  twitter?: Metadata['twitter'] | { card: string };
  robots?: Metadata['robots'];
}

/**
 * @brief Creates a comprehensive metadata object for a Next.js page, merging default site-wide metadata with page-specific overrides.
 * @param options An object containing optional overrides for metadata properties such as title, description, keywords, Open Graph, Twitter card, and robots directives.
 * @returns A Metadata object that can be used in Next.js page components to set up SEO and social sharing metadata.
 */
export function createMetadata(options?: CreateMetadataOptions): Metadata {
  const {
    title = `${siteConfig.name} | Build Graphics Engines from Scratch`,
    description = siteConfig.description,
    robots = { index: true, follow: true, nocache: true },
    keywords = [],
    openGraph = {
      type: 'website',
      locale: 'en-US',
      title: siteConfig.name,
      description: description,
      url: siteConfig.links.website,
      siteName: siteConfig.name,
      images: [
        {
          url: '/images/gplayd-social-card.png',
          width: 1200,
          height: 630,
          alt: description
        }
      ]
    },
    twitter = {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: description,
      creator: '@GraphicalPlayground',
      images: ['/images/gplayd-social-card.png']
    }
  } = options || {};

  return {
    title,
    description,
    applicationName: siteConfig.name,
    creator: siteConfig.authors[0]?.name,
    publisher: siteConfig.authors[0]?.name,
    robots,
    generator: 'Next.js',
    authors: siteConfig.authors,
    keywords: [...siteConfig.keywords, ...keywords],
    referrer: 'origin-when-cross-origin',
    alternates: {
      canonical: siteConfig.links.website,
      languages: {
        'en-US': siteConfig.links.website
      }
    },
    icons: {
      icon: 'icons/favicon.svg'
    },
    openGraph,
    twitter,
    pinterest: {
      richPin: true
    },
    appleWebApp: {
      capable: true,
      title: siteConfig.name,
      statusBarStyle: 'default'
    },
    formatDetection: {
      telephone: false,
      email: false,
      address: false
    },
    abstract: description,
    category: 'Education',
    classification: 'Education',
    manifest: '/manifest.webmanifest'
  } as Metadata;
}

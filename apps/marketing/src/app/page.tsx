// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { SeoMetadata } from '@gp/seo/metadata';
import { Urls } from '@gp/seo/utils';

/**
 * @brief Metadata for the marketing home page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/',
  title: 'Learn Graphics Programming by Building It',
  description:
    'An interactive, browser-based platform where students deconstruct and rebuild graphics-engine systems from the ground up, from raw Vulkan commands to full render pipelines.'
});

/**
 * @brief Principal home page of the marketing application.
 * @returns A JSX page displaying the home page content.
 */
export default function HomePage() {
  return <div />;
}

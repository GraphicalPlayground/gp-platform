// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { SeoMetadata } from '@gp/seo/metadata';
import { Urls, Constants } from '@gp/seo/utils';

/**
 * @brief Metadata for the About page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/about',
  title: 'About',
  description: `Who builds ${Constants.name} and why.`
});

export default function AboutPage() {
  return <div>About</div>;
}

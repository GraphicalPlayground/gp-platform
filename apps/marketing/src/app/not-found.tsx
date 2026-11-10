// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Metadata } from 'next';
import { SeoMetadata } from '@gp/seo/metadata';
import { Urls } from '@gp/seo/utils';

export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/404',
  title: 'Page Not Found',
  description: 'The requested page could not be found on Graphical Playground.',
  noindex: true
});

/**
 * @brief This function renders a "Not Found" page when a requested resource is not available.
 * @returns A JSX page displaying a "Not Found" message.
 */
export default function NotFound() {
  return <div>Not Found</div>;
}

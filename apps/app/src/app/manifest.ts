// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { MetadataRoute } from 'next';
import { Constants } from '@gp/seo/utils';

/**
 * @brief This function generates the manifest for the application.
 * @returns The NextJS manifest object.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: Constants.product('App'),
    short_name: 'GPlayd App',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }]
  };
}

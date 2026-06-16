import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * @brief This file defines the web app manifest for the GPlayd web application.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: '#ffffff',
    categories: ['education', 'graphical-engineering', 'playground', 'explore', 'learning', 'creativity'],
    description: siteConfig.description,
    orientation: 'portrait',
    related_applications: [
      {
        platform: 'web',
        url: 'https://docs.graphical-playground.com'
      },
      {
        platform: 'web',
        url: 'https://status.graphical-playground.com'
      }
    ],
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    start_url: '/',
    theme_color: '#ffffff'
  };
}

import type { Metadata } from 'next';

export const SITE_TITLE = 'Graphical Playground - Build Graphics Engines from Scratch';
export const SITE_NAME = 'Graphical Playground';
export const SITE_SHORT_NAME = 'GPlayd';
export const SITE_DESCRIPTION =
  'Graphical Playground is an interactive, browser-based platform where students deconstruct and rebuild graphics-engine systems from the ground up, from raw Vulkan commands to full render pipelines. Explore creative coding, canvas experiments, and real-time graphics programming.';
export const SITE_URL = 'https://graphical-playground.com';

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: '%s | Graphical Playground'
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: 'Graphical Playground Team',
  publisher: 'Graphical Playground Team',
  robots: {
    index: true,
    follow: true,
    nocache: true
  },
  generator: 'Next.js',
  authors: [
    {
      name: 'Graphical Playground Team',
      url: 'https://github.com/GraphicalPlayground'
    },
    {
      name: 'Mallory Scotton',
      url: 'https://github.com/mallory-scotton'
    },
    {
      name: 'Ossan Msoili',
      url: 'https://github.com/omegalpha28'
    },
    {
      name: 'Hugo Cathelain',
      url: 'https://github.com/hugo-cathelain'
    },
    {
      name: 'Raphaël Ostier',
      url: 'https://github.com/bombabobo'
    },
    {
      name: 'Nathan Fievet',
      url: 'https://github.com/natan-fievet'
    }
  ],
  keywords: [
    'education',
    'graphical-engineering',
    'playground',
    'explore',
    'learning',
    'creativity',
    'vulkan',
    'directx12',
    'd3d12',
    'd3d11',
    'directx11',
    'opengl',
    'metla',
    'webgl',
    'gbuffer',
    'rendering',
    'rhi',
    'game engine'
  ],
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': `${SITE_URL}/en`
    }
  },
  icons: {
    icon: 'icons/favicon.svg'
  },
  openGraph: {
    type: 'website',
    locale: 'en-US',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_DESCRIPTION
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: '@GraphicalPlayground',
    images: ['/og-image.png']
  },
  pinterest: {
    richPin: true
  },
  appleWebApp: {
    capable: true,
    title: SITE_TITLE,
    statusBarStyle: 'default'
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false
  },
  abstract: SITE_DESCRIPTION,
  category: 'Education',
  classification: 'Education',
  manifest: '/manifest.webmanifest'
};

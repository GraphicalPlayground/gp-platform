import type { Metadata } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

export const metadata: Metadata = {
  title: 'Graphical Playground - Build Graphics Engines from Scratch',
  description:
    'Graphical Playground is an interactive, browser-based platform where students deconstruct and rebuild graphics-engine systems from the ground up, from raw Vulkan commands to full render pipelines. Explore creative coding, canvas experiments, and real-time graphics programming.',
  applicationName: 'Graphical Playground',
  authors: [
    { name: 'Graphical Playground Team', url: 'https://graphical-playground.com' },
    { name: 'Mallory SCOTTON', url: 'https://github.com/mallory-scotton' },
    { name: 'Nathan FIEVET', url: 'https://github.com/natan-fievet' },
    { name: 'Hugo CATHELAIN', url: 'https://github.com/Hugo-Cathelain' },
    { name: 'Raphael OSTIER', url: 'https://github.com/bombabobo' },
    { name: 'Ossan MSOILI', url: 'https://github.com/Omegalpha28' }
  ],
  keywords: [
    'graphics programming',
    'creative coding',
    'canvas experiments',
    'Vulkan',
    'render pipeline',
    'game engine architecture',
    'real-time rendering',
    'WebGPU',
    'GPU programming',
    'deconstructionist pedagogy',
    'interactive learning',
    'browser-based graphics',
    'educational platform',
    'computer graphics education',
    'graphics engine development',
    'graphics programming education'
  ],
  referrer: 'origin',
  creator: 'Graphical Playground Team',
  publisher: 'Graphical Playground Team',
  robots: {
    index: true,
    follow: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true
  },
  alternates: {
    canonical: isProduction ? process.env['PUBLIC_WEBSITE_URL'] : 'http://localhost:3000',
    languages: {
      'en-US': isProduction ? process.env['PUBLIC_WEBSITE_URL'] + '/en' : 'http://localhost:3000/en',
      'fr-FR': isProduction ? process.env['PUBLIC_WEBSITE_URL'] + '/fr' : 'http://localhost:3000/fr'
    }
  },
  icons: {
    icon: 'favicon.ico',
    shortcut: 'favicon-16x16.png',
    apple: 'apple-touch-icon.png'
  },
  manifest: isProduction ? process.env['PUBLIC_WEBSITE_URL'] + '/manifest.json' : 'http://localhost:3000/manifest.json',
  openGraph: {
    type: 'website',
    url: isProduction ? process.env['PUBLIC_WEBSITE_URL'] : 'http://localhost:3000',
    title: 'Graphical Playground - Build Graphics Engines from Scratch',
    description:
      'Graphical Playground is an interactive, browser-based platform where students deconstruct and rebuild graphics-engine systems from the ground up, from raw Vulkan commands to full render pipelines. Explore creative coding, canvas experiments, and real-time graphics programming.',
    siteName: 'Graphical Playground',
    images: []
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Graphical Playground - Build Graphics Engines from Scratch',
    description:
      'Graphical Playground is an interactive, browser-based platform where students deconstruct and rebuild graphics-engine systems from the ground up, from raw Vulkan commands to full render pipelines. Explore creative coding, canvas experiments, and real-time graphics programming.',
    site: '@graphicalplayground',
    creator: '@graphicalplayground',
    images: []
  },
  appleWebApp: {
    capable: true,
    title: 'Graphical Playground',
    statusBarStyle: 'default'
  },
  classification: 'Education',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  }
};

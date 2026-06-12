// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { WithContext, Person, Organization } from 'schema-dts';
import { siteConfig } from './site';

export const persons: { [key: string]: WithContext<Person> } = {
  'mallory-scotton': {
    '@context': 'https://schema.org',
    '@id': `${siteConfig.links.website}/#person-mallory-scotton`,
    '@type': 'Person',
    'name': 'Mallory Scotton',
    'url': 'https://github.com/mallory-scotton',
    'sameAs': ['https://github.com/mallory-scotton', 'https://www.linkedin.com/in/mallory-scotton/'],
    'affiliation': {
      '@type': 'Organization',
      '@id': `${siteConfig.links.website}/#organization`
    },
    'email': 'mallory.scotton@graphical-playground.com'
  },
  'ossan-msoili': {
    '@context': 'https://schema.org',
    '@id': `${siteConfig.links.website}/#person-ossan-msoili`,
    '@type': 'Person',
    'name': 'Ossan Msoili',
    'url': 'https://github.com/omegalpha28',
    'sameAs': ['https://github.com/omegalpha28', 'https://www.linkedin.com/in/ossan-msoili/'],
    'affiliation': {
      '@type': 'Organization',
      '@id': `${siteConfig.links.website}/#organization`
    },
    'email': 'ossan.msoili@graphical-playground.com'
  },
  'hugo-cathelain': {
    '@context': 'https://schema.org',
    '@id': `${siteConfig.links.website}/#person-hugo-cathelain`,
    '@type': 'Person',
    'name': 'Hugo Cathelain',
    'url': 'https://github.com/hugo-cathelain',
    'sameAs': ['https://github.com/hugo-cathelain', 'https://www.linkedin.com/in/hugo-cathelain/'],
    'affiliation': {
      '@type': 'Organization',
      '@id': `${siteConfig.links.website}/#organization`
    },
    'email': 'hugo.cathelain@graphical-playground.com'
  },
  'raphaël-ostier': {
    '@context': 'https://schema.org',
    '@id': `${siteConfig.links.website}/#person-raphaël-ostier`,
    '@type': 'Person',
    'name': 'Raphaël Ostier',
    'url': 'https://github.com/bombabobo',
    'sameAs': ['https://github.com/bombabobo', 'https://www.linkedin.com/in/raphael-ostier/'],
    'affiliation': {
      '@type': 'Organization',
      '@id': `${siteConfig.links.website}/#organization`
    },
    'email': 'raphael.ostier@graphical-playground.com'
  },
  'nathan-fievet': {
    '@context': 'https://schema.org',
    '@id': `${siteConfig.links.website}/#person-nathan-fievet`,
    '@type': 'Person',
    'name': 'Nathan Fievet',
    'url': 'https://github.com/natan-fievet',
    'sameAs': ['https://github.com/natan-fievet', 'https://www.linkedin.com/in/nathan-fievet/'],
    'affiliation': {
      '@type': 'Organization',
      '@id': `${siteConfig.links.website}/#organization`
    },
    'email': 'nathan.fievet@graphical-playground.com'
  }
};

export const organization: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.links.website}/#organization`,
  'name': 'Graphical Playground',
  'alternateName': 'GPlayd',
  'legalName': 'Graphical Playground',
  'description':
    'An interactive, browser-based platform where students deconstruct and rebuild graphics-engine systems from the ground up, from raw Vulkan commands to full render pipelines. Explore creative coding, canvas experiments, and real-time graphics programming.',
  'url': `${siteConfig.links.website}`,
  'logo': {
    '@type': 'ImageObject',
    '@id': `${siteConfig.links.website}/#logo`,
    'url': `${siteConfig.links.website}/icons/icon-square-512x512.png`,
    'contentUrl': `${siteConfig.links.website}/icons/icon-square-512x512.png`,
    'caption': 'Graphical Playground Logo'
  },
  'image': {
    '@id': `${siteConfig.links.website}/#logo`
  },
  'email': 'support@graphical-playground.com',
  'foundingLocation': {
    '@type': 'Place',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Lyon',
      'addressCountry': 'FR'
    }
  },
  'location': {
    '@type': 'Place',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Lyon',
      'addressRegion': 'Auvergne-Rhône-Alpes',
      'addressCountry': 'FR'
    }
  },
  'sameAs': [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.discord],
  'subjectOf': [
    {
      '@type': 'WebSite',
      'url': siteConfig.links.documentation,
      'name': 'Graphical Playground Documentation'
    },
    {
      '@type': 'WebPage',
      'url': siteConfig.links.status,
      'name': 'Graphical Playground Status'
    }
  ],
  'founder': [
    {
      '@id': `${siteConfig.links.website}/#person-mallory-scotton`
    },
    {
      '@id': `${siteConfig.links.website}/#person-ossan-msoili`
    },
    {
      '@id': `${siteConfig.links.website}/#person-hugo-cathelain`
    },
    {
      '@id': `${siteConfig.links.website}/#person-raphaël-ostier`
    },
    {
      '@id': `${siteConfig.links.website}/#person-nathan-fievet`
    }
  ],
  'member': {
    '@type': 'OrganizationRole',
    'roleName': 'Contributor Team',
    'member': {
      '@type': 'Organization',
      'name': 'Graphical Playground Team',
      'url': siteConfig.links.github
    }
  },
  'knowsAbout': siteConfig.keywords,
  'knowsLanguage': ['en', 'fr'],
  'contactPoint': [
    {
      '@type': 'ContactPoint',
      'contactType': 'customer support',
      'email': siteConfig.emails.support,
      'url': siteConfig.links.discord,
      'availableLanguage': ['English', 'French']
    }
  ]
};

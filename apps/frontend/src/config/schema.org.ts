// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type {
  WithContext,
  Person,
  Organization,
  WebSite,
  SoftwareSourceCode,
  SoftwareApplication,
  FAQPage
} from 'schema-dts';
import { siteConfig } from './site';

/**
 * @brief WebSite entity for the main marketing/learning platform site.
 * Links to the Organization as publisher and (optionally) declares a
 * SearchAction for sitelinks search box eligibility.
 */
export const website: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.links.website}/#website`,
  'name': siteConfig.name,
  'alternateName': siteConfig.shortName,
  'url': siteConfig.links.website,
  'description': siteConfig.description,
  'publisher': {
    '@id': `${siteConfig.links.website}/#organization`
  },
  'inLanguage': ['en', 'fr']
  // If/when a site search exists, uncomment and adjust the target URL:
  // 'potentialAction': {
  //   '@type': 'SearchAction',
  //   'target': {
  //     '@type': 'EntryPoint',
  //     'urlTemplate': `${siteConfig.links.website}/search?q={search_term_string}`
  //   },
  //   'query-input': 'required name=search_term_string'
  // }
};

/**
 * @brief SoftwareSourceCode entity describing the GP engine itself, distinct from the marketing site/Organization.
 * Represents the open-source codebase hosted on GitHub.
 */
export const softwareSourceCode: WithContext<SoftwareSourceCode> = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  '@id': `${siteConfig.links.website}/#source-code`,
  'name': 'Graphical Playground Engine',
  'alternateName': 'GP',
  'description':
    'An open-source C++23 game engine and educational platform, targeting Windows, Linux, macOS, with support for Vulkan, DirectX 11/12, OpenGL/OpenGL ES, GLSL, and HLSL rendering pipelines.',
  'codeRepository': siteConfig.links.github,
  'programmingLanguage': [
    {
      '@type': 'ComputerLanguage',
      'name': 'C++23'
    },
    {
      '@type': 'ComputerLanguage',
      'name': 'GLSL'
    },
    {
      '@type': 'ComputerLanguage',
      'name': 'HLSL'
    }
  ],
  'runtimePlatform': ['Windows', 'Linux', 'macOS'],
  'license': 'Apache License 2.0',
  'author': {
    '@id': `${siteConfig.links.website}/#organization`
  },
  'creator': {
    '@id': `${siteConfig.links.website}/#organization`
  },
  'isPartOf': {
    '@id': `${siteConfig.links.website}/#organization`
  },
  'keywords': siteConfig.keywords.join(', ')
};

/**
 * @brief SoftwareApplication entity for the e-learning platform itself
 * (the web app, as opposed to the engine's source code). Useful for
 * "free software" / "available on web" rich result signals.
 */
export const softwareApplication: WithContext<SoftwareApplication> = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${siteConfig.links.website}/#application`,
  'name': siteConfig.name,
  'applicationCategory': 'EducationalApplication',
  'applicationSubCategory': 'Game Development',
  'operatingSystem': 'Web Browser',
  'url': siteConfig.links.website,
  'description': siteConfig.description,
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'EUR',
    'url': `${siteConfig.links.website}/pricing`
  },
  'publisher': {
    '@id': `${siteConfig.links.website}/#organization`
  },
  'softwareHelp': {
    '@type': 'CreativeWork',
    'url': siteConfig.links.documentation
  }
};

/**
 * @brief FAQPage entity for the /faq route. The `mainEntity` array MUST
 * mirror the visible Q&A content on the page exactly, Google's FAQ
 * rich results require text parity between markup and rendered content.
 */
export const faqPage: WithContext<FAQPage> = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${siteConfig.links.website}/faq/#faqpage`,
  'mainEntity': []
};

/**
 * @brief Person entities for the core team members, linked to the Organization as founders and contributors.
 * Each person has their own unique @id and links to their GitHub and LinkedIn profiles.
 */
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

/**
 * @brief Organization entity representing Graphical Playground as a whole, linking to the WebSite and SoftwareSourceCode entities, and listing the core team members as founders.
 * This is the central entity that ties everything together and provides comprehensive information about the organization, its mission, and its offerings.
 */
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

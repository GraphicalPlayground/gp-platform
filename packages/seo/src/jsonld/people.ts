// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { WithContext, Person } from 'schema-dts';
import { JsonLdIds } from './ids';
import type { PersonSlug } from './ids';
import { Urls } from '../utils';

/**
 * @brief A collection of JSON-LD representations of people associated with the Graphical Playground platform.
 */
export const people: Record<PersonSlug, WithContext<Person>> = {
  'mallory-scotton': {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': JsonLdIds.person('mallory-scotton'),
    'name': 'Mallory Scotton',
    'givenName': 'Mallory',
    'alternateName': 'Mallow',
    'jobTitle': 'Founder & Principal Architect',
    'pronouns': 'he/him',
    'affiliation': { '@id': JsonLdIds.organization },
    'brand': { '@id': JsonLdIds.organization },
    'funder': { '@id': JsonLdIds.organization },
    'memberOf': { '@id': JsonLdIds.organization },
    'worksFor': { '@id': JsonLdIds.organization },
    'colleague': [
      { '@id': JsonLdIds.person('hugo-cathelain') },
      { '@id': JsonLdIds.person('ossan-msoili') },
      { '@id': JsonLdIds.person('nathan-fievet') },
      { '@id': JsonLdIds.person('raphael-ostier') }
    ],
    'email': Urls.Mail('mallory.scotton'),
    'knowsLanguage': [{ '@id': JsonLdIds.language('en') }, { '@id': JsonLdIds.language('fr') }],
    'url': 'https://github.com/mallory-scotton',
    'sameAs': ['https://www.linkedin.com/in/mallory-scotton', 'https://github.com/mallory-scotton']
  },
  'hugo-cathelain': {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': JsonLdIds.person('hugo-cathelain'),
    'name': 'Hugo Cathelain',
    'givenName': 'Hugo',
    'alternateName': 'Zud4rk',
    'jobTitle': 'Co-Founder & Frontend Developer',
    'pronouns': 'he/him',
    'affiliation': { '@id': JsonLdIds.organization },
    'brand': { '@id': JsonLdIds.organization },
    'funder': { '@id': JsonLdIds.organization },
    'memberOf': { '@id': JsonLdIds.organization },
    'worksFor': { '@id': JsonLdIds.organization },
    'colleague': [
      { '@id': JsonLdIds.person('mallory-scotton') },
      { '@id': JsonLdIds.person('ossan-msoili') },
      { '@id': JsonLdIds.person('nathan-fievet') },
      { '@id': JsonLdIds.person('raphael-ostier') }
    ],
    'email': Urls.Mail('hugo.cathelain'),
    'knowsLanguage': [{ '@id': JsonLdIds.language('en') }, { '@id': JsonLdIds.language('fr') }],
    'url': 'https://github.com/hugo-cathelain',
    'sameAs': ['https://www.linkedin.com/in/hugo-cathelain', 'https://github.com/hugo-cathelain']
  },
  'nathan-fievet': {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': JsonLdIds.person('nathan-fievet'),
    'name': 'Nathan Fievet',
    'givenName': 'Nathan',
    'jobTitle': 'Co-Founder & Graphics Engineer',
    'pronouns': 'he/him',
    'affiliation': { '@id': JsonLdIds.organization },
    'brand': { '@id': JsonLdIds.organization },
    'funder': { '@id': JsonLdIds.organization },
    'memberOf': { '@id': JsonLdIds.organization },
    'worksFor': { '@id': JsonLdIds.organization },
    'colleague': [
      { '@id': JsonLdIds.person('mallory-scotton') },
      { '@id': JsonLdIds.person('ossan-msoili') },
      { '@id': JsonLdIds.person('hugo-cathelain') },
      { '@id': JsonLdIds.person('raphael-ostier') }
    ],
    'email': Urls.Mail('nathan.fievet'),
    'knowsLanguage': [{ '@id': JsonLdIds.language('en') }, { '@id': JsonLdIds.language('fr') }],
    'url': 'https://github.com/natan-fievet',
    'sameAs': ['https://www.linkedin.com/in/nathan-fievet', 'https://github.com/natan-fievet']
  },
  'ossan-msoili': {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': JsonLdIds.person('ossan-msoili'),
    'name': 'Ossan Msoili',
    'givenName': 'Ossan',
    'alternateName': 'Omegalpha',
    'jobTitle': 'Co-Founder & Devops Architect',
    'pronouns': 'he/him',
    'affiliation': { '@id': JsonLdIds.organization },
    'brand': { '@id': JsonLdIds.organization },
    'funder': { '@id': JsonLdIds.organization },
    'memberOf': { '@id': JsonLdIds.organization },
    'worksFor': { '@id': JsonLdIds.organization },
    'colleague': [
      { '@id': JsonLdIds.person('mallory-scotton') },
      { '@id': JsonLdIds.person('hugo-cathelain') },
      { '@id': JsonLdIds.person('nathan-fievet') },
      { '@id': JsonLdIds.person('raphael-ostier') }
    ],
    'email': Urls.Mail('ossan.msoili'),
    'knowsLanguage': [{ '@id': JsonLdIds.language('en') }, { '@id': JsonLdIds.language('fr') }],
    'url': 'https://github.com/Omegalpha28',
    'sameAs': [
      'https://www.linkedin.com/in/ossan-msoili',
      'https://github.com/Omegalpha28',
      'https://www.instagram.com/nassomegalpha'
    ]
  },
  'raphael-ostier': {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': JsonLdIds.person('raphael-ostier'),
    'name': 'Raphael Ostier',
    'givenName': 'Raphael',
    'alternateName': 'Bombabobo',
    'jobTitle': 'Co-Founder & Frontend Developer',
    'pronouns': 'he/him',
    'affiliation': { '@id': JsonLdIds.organization },
    'brand': { '@id': JsonLdIds.organization },
    'funder': { '@id': JsonLdIds.organization },
    'memberOf': { '@id': JsonLdIds.organization },
    'worksFor': { '@id': JsonLdIds.organization },
    'colleague': [
      { '@id': JsonLdIds.person('mallory-scotton') },
      { '@id': JsonLdIds.person('ossan-msoili') },
      { '@id': JsonLdIds.person('nathan-fievet') },
      { '@id': JsonLdIds.person('hugo-cathelain') }
    ],
    'email': Urls.Mail('raphael.ostier'),
    'knowsLanguage': [{ '@id': JsonLdIds.language('en') }, { '@id': JsonLdIds.language('fr') }],
    'url': 'https://github.com/bombabobo',
    'sameAs': ['https://www.linkedin.com/in/raphael-ostier', 'https://github.com/bombabobo']
  }
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { WithContext, SoftwareApplication, SoftwareSourceCode } from 'schema-dts';
import { Organization, Repositories } from '@gp/constants';
import type { SoftwareSlug } from './ids';
import { JsonLdIds } from './ids';

/**
 * @brief A collection of JSON-LD representations of the Graphical Playground software source code.
 */
export const softwaresSourceCode: Record<SoftwareSlug, WithContext<SoftwareSourceCode>> = {
  'gp-docs': {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': JsonLdIds.sourceCode('gp-docs'),
    'name': Organization.product('Docs'),
    'alternateName': ['GPlayd Docs', 'GP Docs', 'gp-docs'],
    'description': Repositories.GpDocs.description,
    'codeRepository': Repositories.GpDocs.url,
    'url': Organization.subdomain('docs'),
    'programmingLanguage': [
      'CSS',
      'TailwindCSS',
      'TypeScript',
      'JavaScript',
      'HTML',
      'Markdown',
      'React',
      'NextJS',
      'Docusaurus'
    ],
    'license': Repositories.GpDocs.licenseUrl,
    'runtimePlatform': ['Web Browser'],
    'author': { '@id': JsonLdIds.organization },
    'creator': { '@id': JsonLdIds.organization },
    'isPartOf': { '@id': JsonLdIds.organization }
  },
  'gp-engine': {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': JsonLdIds.sourceCode('gp-engine'),
    'name': Organization.product('Engine'),
    'alternateName': ['GPlayd Engine', 'GP Engine', 'gp-engine'],
    'description': Repositories.GpEngine.description,
    'codeRepository': Repositories.GpEngine.url,
    'programmingLanguage': ['C++23', 'GLSL', 'HLSL'],
    'runtimePlatform': [
      'Windows',
      'Linux',
      'macOS',
      'Xbox Series',
      'Xbox One',
      'PlayStation 5',
      'PlayStation 4',
      'Nintendo Switch',
      'Android',
      'iOS'
    ],
    'license': Repositories.GpEngine.licenseUrl,
    'author': { '@id': JsonLdIds.organization },
    'creator': { '@id': JsonLdIds.organization },
    'isPartOf': { '@id': JsonLdIds.organization }
  },
  'gp-platform': {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': JsonLdIds.sourceCode('gp-platform'),
    'name': Organization.product('Platform'),
    'alternateName': ['GPlayd Platform', 'GP Platform', 'gp-platform'],
    'description': Repositories.GpPlatform.description,
    'codeRepository': Repositories.GpPlatform.url,
    'url': Organization.url,
    'programmingLanguage': ['CSS', 'TailwindCSS', 'TypeScript', 'JavaScript', 'HTML', 'Markdown', 'React', 'NextJS'],
    'license': Repositories.GpPlatform.licenseUrl,
    'runtimePlatform': ['Web Browser'],
    'author': { '@id': JsonLdIds.organization },
    'creator': { '@id': JsonLdIds.organization },
    'isPartOf': { '@id': JsonLdIds.organization }
  }
};

/**
 * @brief A collection of JSON-LD representations of the Graphical Playground software applications.
 */
export const softwaresApplication: Record<SoftwareSlug, WithContext<SoftwareApplication>> = {
  'gp-docs': {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': JsonLdIds.application('gp-docs'),
    'name': Organization.product('Docs'),
    'alternateName': ['GPlayd Docs', 'GP Docs', 'gp-docs'],
    'description': Repositories.GpDocs.description,
    'url': Organization.subdomain('docs'),
    'applicationCategory': 'EducationalApplication',
    'applicationSubCategory': 'Game Development',
    'operatingSystem': 'Web Browser',
    'publisher': { '@id': JsonLdIds.organization },
    'owner': { '@id': JsonLdIds.organization },
    'creator': { '@id': JsonLdIds.organization },
    'author': { '@id': JsonLdIds.organization }
  },
  'gp-engine': {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': JsonLdIds.application('gp-engine'),
    'name': Organization.product('Engine'),
    'alternateName': ['GPlayd Engine', 'GP Engine', 'gp-engine'],
    'description': Repositories.GpEngine.description,
    'url': Repositories.GpEngine.url,
    'applicationCategory': 'EducationalApplication',
    'applicationSubCategory': 'Game Development',
    'operatingSystem': [
      'Windows',
      'Linux',
      'macOS',
      'Xbox Series',
      'Xbox One',
      'PlayStation 5',
      'PlayStation 4',
      'Nintendo Switch',
      'Android',
      'iOS'
    ],
    'publisher': { '@id': JsonLdIds.organization },
    'owner': { '@id': JsonLdIds.organization },
    'creator': { '@id': JsonLdIds.organization },
    'author': { '@id': JsonLdIds.organization }
  },
  'gp-platform': {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': JsonLdIds.application('gp-platform'),
    'name': Organization.product('Platform'),
    'alternateName': ['GPlayd Platform', 'GP Platform', 'gp-platform'],
    'description': Organization.description,
    'url': Organization.url,
    'applicationCategory': 'EducationalApplication',
    'applicationSubCategory': 'Game Development',
    'operatingSystem': 'Web Browser',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': Organization.currency,
      'url': `${Organization.url}/pricing`
    },
    'publisher': { '@id': JsonLdIds.organization },
    'owner': { '@id': JsonLdIds.organization },
    'creator': { '@id': JsonLdIds.organization },
    'author': { '@id': JsonLdIds.organization }
  }
};

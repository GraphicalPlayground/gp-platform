// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { WithContext, SoftwareApplication, SoftwareSourceCode } from 'schema-dts';
import type { SoftwareSlug } from './ids';
import { JsonLdIds } from './ids';
import { Urls, Constants } from '../utils';

/**
 * @brief A collection of JSON-LD representations of the Graphical Playground software source code.
 */
export const softwaresSourceCode: Record<SoftwareSlug, WithContext<SoftwareSourceCode>> = {
  'gp-docs': {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': JsonLdIds.sourceCode('gp-docs'),
    'name': Constants.product('Docs'),
    'alternateName': ['GPlayd Docs', 'GP Docs', 'gp-docs'],
    'description':
      'Technical documentation for the Graphical Playground ecosystem, including engine internals, platform architecture, APIs, and contributor guidelines.',
    'codeRepository': Urls.Repository('gp-docs'),
    'url': Urls.SubDomain('docs'),
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
    'license': 'Apache License 2.0',
    'runtimePlatform': ['Web Browser'],
    'author': { '@id': JsonLdIds.organization },
    'creator': { '@id': JsonLdIds.organization },
    'isPartOf': { '@id': JsonLdIds.organization }
  },
  'gp-engine': {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': JsonLdIds.sourceCode('gp-engine'),
    'name': Constants.product('Engine'),
    'alternateName': ['GPlayd Engine', 'GP Engine', 'gp-engine'],
    'description':
      'An open-source C++23 game engine and educational platform, targeting Windows, Linux, macOS, with support for Vulkan, DirectX 11/12, OpenGL/OpenGL ES, GLSL, and HLSL rendering pipelines.',
    'codeRepository': Urls.Repository('gp-engine'),
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
    'license': 'Apache License 2.0',
    'author': { '@id': JsonLdIds.organization },
    'creator': { '@id': JsonLdIds.organization },
    'isPartOf': { '@id': JsonLdIds.organization }
  },
  'gp-platform': {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': JsonLdIds.sourceCode('gp-platform'),
    'name': Constants.product('Platform'),
    'alternateName': ['GPlayd Platform', 'GP Platform', 'gp-platform'],
    'description':
      'The cloud-native learning platform powering Graphical Playground. Hosts interactive courses, executes graphics code on remote GPUs, and delivers real-time visual feedback through a web-based environment.',
    'codeRepository': Urls.Repository('gp-platform'),
    'url': Urls.BaseUrl,
    'programmingLanguage': ['CSS', 'TailwindCSS', 'TypeScript', 'JavaScript', 'HTML', 'Markdown', 'React', 'NextJS'],
    'license': 'Apache License 2.0',
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
    'name': Constants.product('Docs'),
    'alternateName': ['GPlayd Docs', 'GP Docs', 'gp-docs'],
    'description':
      'Technical documentation for the Graphical Playground ecosystem, including engine internals, platform architecture, APIs, and contributor guidelines.',
    'url': Urls.SubDomain('docs'),
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
    'name': Constants.product('Engine'),
    'alternateName': ['GPlayd Engine', 'GP Engine', 'gp-engine'],
    'description':
      'An open-source C++23 game engine and educational platform, targeting Windows, Linux, macOS, with support for Vulkan, DirectX 11/12, OpenGL/OpenGL ES, GLSL, and HLSL rendering pipelines.',
    'url': Urls.Repository('gp-engine'),
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
    'name': Constants.product('Platform'),
    'alternateName': ['GPlayd Platform', 'GP Platform', 'gp-platform'],
    'description':
      'An interactive, browser-based platform where students deconstruct and rebuild graphics-engine systems from the ground up, from raw Vulkan commands to full render pipelines. Explore creative coding, canvas experiments, and real-time graphics programming.',
    'url': Urls.BaseUrl,
    'applicationCategory': 'EducationalApplication',
    'applicationSubCategory': 'Game Development',
    'operatingSystem': 'Web Browser',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'EUR',
      'url': `${Urls.BaseUrl}/pricing`
    },
    'publisher': { '@id': JsonLdIds.organization },
    'owner': { '@id': JsonLdIds.organization },
    'creator': { '@id': JsonLdIds.organization },
    'author': { '@id': JsonLdIds.organization }
  }
};

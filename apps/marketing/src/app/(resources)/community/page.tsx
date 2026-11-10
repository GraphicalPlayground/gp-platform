// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { Organization } from '@gp/constants';
import { JsonLdIds } from '@gp/seo/jsonld';
import { SeoMetadata } from '@gp/seo/metadata';
import { WebPageJsonLd } from '@gp/seo/react';
import { Urls } from '@gp/seo/utils';
import { UnderConstruction } from '@/components';

const COMMUNITY_TITLE = 'Community';
const COMMUNITY_DESCRIPTION = `Join ${Organization.displayName} contributors on Discord and GitHub to discuss Vulkan pipelines, C++23 engine modules, shaders, and student showcases.`;

/**
 * @brief Metadata for the Community page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/community',
  title: COMMUNITY_TITLE,
  description: COMMUNITY_DESCRIPTION,
  keywords: [
    'Graphical Playground Discord',
    'graphics engineering community',
    'open-source Vulkan contributors',
    'graphics programming study group'
  ]
});

export default function CommunityPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={{ '@id': JsonLdIds.organization }}
        description={COMMUNITY_DESCRIPTION}
        name={COMMUNITY_TITLE}
        path='/community'
      />
      <UnderConstruction
        description='Our community hub highlighting open-source contributors, Discord engineering channels, showcases, and study groups is currently under construction.'
        primaryAction={{ external: true, href: Organization.socials.discord, label: 'Join Discord' }}
        route='/community'
        secondaryAction={{ external: true, href: Organization.socials.github, label: 'Explore GitHub repos' }}
        section='Resources'
        title='Community'
        scope={[
          {
            detail: 'Real-time discussions on Vulkan, C++23 engine modules, and shaders',
            label: 'Discord engineering channels'
          },
          {
            detail: 'How to contribute code, technical write-ups, and curriculum improvements',
            label: 'Open-source contributions'
          },
          {
            detail: 'Student pipelines, experiments, and engineering interviews',
            label: 'Community showcases'
          }
        ]}
      />
    </>
  );
}

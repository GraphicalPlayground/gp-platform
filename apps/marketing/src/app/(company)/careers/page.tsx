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
import { cms } from '@/lib/cms';
import { CareersView } from './careers-view';
import type { CareerPostingSummary } from './careers-view';

const CAREERS_TITLE = 'Careers';
const CAREERS_DESCRIPTION = `Hiring status and open-source contributor guide for ${Organization.displayName}. No paid positions are open right now, while volunteer contributors are welcome across 11 public repositories.`;

/**
 * @brief Metadata for the Careers page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/careers',
  title: CAREERS_TITLE,
  description: CAREERS_DESCRIPTION,
  keywords: [
    'Graphical Playground careers',
    'open source graphics contributor',
    'C++23 Vulkan contributor',
    'Next.js TypeScript open source',
    'graphics curriculum writing',
    'cloud GPU infrastructure open source'
  ]
});

/**
 * @brief Server entry point for `/careers`, loading open CMS postings when present
 * and rendering the hiring status and public repository skills directory.
 */
export default async function CareersPage() {
  const openRoles = await cms.careers.getOpenPositions();

  const positions: CareerPostingSummary[] = openRoles.map((doc) => ({
    slug: doc.slug,
    title: doc.frontmatter.title,
    summary: doc.frontmatter.summary,
    department: doc.frontmatter.department,
    engagement: doc.frontmatter.engagement,
    location: doc.frontmatter.location,
    skills: doc.frontmatter.skills,
    repositories: doc.frontmatter.repositories,
    ...(doc.frontmatter.applyUrl ? { applyUrl: doc.frontmatter.applyUrl } : {}),
    ...(doc.frontmatter.contactEmail ? { contactEmail: doc.frontmatter.contactEmail } : {})
  }));

  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        description={CAREERS_DESCRIPTION}
        mainEntity={{ '@id': JsonLdIds.organization }}
        name={CAREERS_TITLE}
        path='/careers'
        about={[
          { '@id': JsonLdIds.organization },
          { '@id': JsonLdIds.application('gp-platform') },
          { '@id': JsonLdIds.application('gp-engine') },
          { '@id': JsonLdIds.contact('careers') }
        ]}
      />
      <CareersView positions={positions} title={CAREERS_TITLE} />
    </>
  );
}

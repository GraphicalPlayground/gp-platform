// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { Organization } from '@gp/constants';
import { SeoMetadata } from '@gp/seo/metadata';
import { FaqJsonLd } from '@gp/seo/react';
import { Urls } from '@gp/seo/utils';
import { jsonLdEntries } from '@/app/content';
import { FaqView } from './faq-view';

const FAQ_TITLE = 'Frequently Asked Questions';
const FAQ_DESCRIPTION = `Answers about learning graphics programming without a GPU, gp-engine in C++23, OCI cloud rendering, certifications, pricing, and open-source contributions on ${Organization.displayName}.`;

/**
 * @brief Metadata for the FAQ page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/faq',
  title: FAQ_TITLE,
  description: FAQ_DESCRIPTION,
  keywords: [
    'Graphical Playground FAQ',
    'learn Vulkan without a GPU',
    'gp-engine FAQ',
    'graphics programming certifications',
    'C++23 graphics engine'
  ]
});

/**
 * @brief Dedicated FAQ page displaying categorized questions and synced `FAQPage` JSON-LD.
 */
export default function FAQPage() {
  return (
    <>
      <FaqJsonLd description={FAQ_DESCRIPTION} items={jsonLdEntries} name={FAQ_TITLE} path='/faq' />
      <FaqView description={FAQ_DESCRIPTION} title={FAQ_TITLE} />
    </>
  );
}

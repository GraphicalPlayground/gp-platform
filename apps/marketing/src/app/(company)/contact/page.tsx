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
import { ContactView } from './contact-view';

const CONTACT_TITLE = 'Contact Us';
const CONTACT_DESCRIPTION = `Contact ${Organization.displayName} in Lyon, France via 14 dedicated email inboxes, Discord, GitHub, LinkedIn, or postal mail c/o EPITECH Lyon.`;
const CONTACT_KEYWORDS = [
  'contact Graphical Playground',
  'Graphical Playground Lyon',
  'EPITECH Lyon',
  'Graphical Playground support',
  'Graphical Playground security contact',
  'Graphical Playground partnerships',
  'Graphical Playground Discord',
  'Graphical Playground GitHub',
  'graphics education partnerships',
  'contact@graphical-playground.com'
];

/**
 * @brief Metadata for the Contact page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/contact',
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  keywords: CONTACT_KEYWORDS
});

/**
 * @brief Contact page exposing all email inboxes, social channels, and postal correspondence details.
 */
export default function ContactPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={[{ '@id': JsonLdIds.organization }, { '@id': JsonLdIds.localization }]}
        description={CONTACT_DESCRIPTION}
        keywords={CONTACT_KEYWORDS}
        mainEntity={{ '@id': JsonLdIds.organization }}
        name={CONTACT_TITLE}
        path='/contact'
        type='ContactPage'
      />
      <ContactView title={CONTACT_TITLE} />
    </>
  );
}

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

const CONTACT_TITLE = 'Contact Us';
const CONTACT_DESCRIPTION = `Reach ${Organization.displayName} in Lyon for learner support, industry partnerships, security reports, legal requests, and press inquiries.`;

/**
 * @brief Metadata for the Contact page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/contact',
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  keywords: [
    'contact Graphical Playground',
    'graphics education partnerships',
    'Graphical Playground Lyon',
    'Graphical Playground support'
  ]
});

export default function ContactPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        description={CONTACT_DESCRIPTION}
        mainEntity={{ '@id': JsonLdIds.organization }}
        name={CONTACT_TITLE}
        path='/contact'
        type='ContactPage'
      />
      <UnderConstruction
        description={`An integrated inquiry routing desk and contact form are currently in development. Until then, write directly to ${Organization.emails.contact} or join the engineering Discord.`}
        primaryAction={{ href: Organization.mailto('contact'), label: `Email ${Organization.emails.contact}` }}
        route='/contact'
        secondaryAction={{ external: true, href: Organization.socials.discord, label: 'Join Discord' }}
        section='Company'
        title='Contact Us'
        scope={[
          {
            detail: 'Direct forms for support, partnerships, academic, and billing requests',
            label: 'Inquiry routing'
          },
          {
            detail: 'Coordinated vulnerability disclosure and GDPR notices',
            label: 'Security & legal contacts'
          },
          {
            detail: `Studio details in ${Organization.address.city}, ${Organization.address.country}`,
            label: 'Team headquarters'
          }
        ]}
      />
    </>
  );
}

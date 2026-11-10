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

const PRESS_TITLE = 'Press & Media';
const PRESS_DESCRIPTION = `Official media kit, engine screenshots, company background, and press contacts for journalists covering ${Organization.displayName}.`;

/**
 * @brief Metadata for the Press page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/press',
  title: PRESS_TITLE,
  description: PRESS_DESCRIPTION,
  keywords: [
    'Graphical Playground press',
    'GPlayd media kit',
    'graphics engine press',
    'press@graphical-playground.com'
  ]
});

export default function PressPage() {
  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={{ '@id': JsonLdIds.organization }}
        description={PRESS_DESCRIPTION}
        name={PRESS_TITLE}
        path='/press'
      />
      <UnderConstruction
        description={`Downloadable press assets, engine captures, and official background notes are being prepared. For media inquiries or interviews, write to ${Organization.emails.press}.`}
        primaryAction={{ href: Organization.mailto('press'), label: `Email ${Organization.emails.press}` }}
        route='/press'
        secondaryAction={{ href: '/breakdowns', label: 'Explore breakdowns' }}
        section='Company'
        title='Press & Media'
        scope={[
          {
            detail: 'Vector wordmarks, product screenshots, and architecture diagrams',
            label: 'Media kit archive'
          },
          {
            detail: 'Official milestones, SIGGRAPH notes, and project announcements',
            label: 'Press releases'
          },
          {
            detail: 'Verified company background and spokesperson contacts',
            label: 'Fact sheet'
          }
        ]}
      />
    </>
  );
}

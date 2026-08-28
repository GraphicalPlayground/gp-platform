// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { Section, Stack } from '@gp/ui/components';
import { SeoMetadata } from '@gp/seo/metadata';
import { Urls } from '@gp/seo/utils';
import { FaqJsonLd } from '@gp/seo/react';
import { FAQClient } from '@/components/faq';

import {
  aboutCommunityVisual,
  aboutCurriculumVisual,
  aboutEngineVisual,
  aboutPlaygroundVisual,
  jsonLdEntries
} from './content';

/**
 * @brief Metadata for the marketing home page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/',
  title: 'Learn Graphics Programming by Building It',
  description:
    'An interactive, browser-based platform where students deconstruct and rebuild graphics-engine systems from the ground up, from raw Vulkan commands to full render pipelines.'
});

/**
 * @brief Principal home page of the marketing application.
 * @returns A JSX page displaying the home page content.
 */
export default function HomePage() {
  return (
    <Stack className='w-full' direction='vertical' gap='none' padding='none'>
      <Section fullWidth backgroundColor='subtle' className='h-screen'>
        Hello World
      </Section>
      <Section fullWidth backgroundColor='default' className='h-screen'>
        Default Section
      </Section>
      <Section fullWidth backgroundColor='subtle'>
        <FaqJsonLd items={jsonLdEntries} />
        <FAQClient
          faqs={[
            {
              heading: 'About Graphical Playground',
              questions: aboutPlaygroundVisual
            },
            {
              heading: 'About our engine',
              questions: aboutEngineVisual
            },
            {
              heading: 'About Curriculum & Learning Methodology',
              questions: aboutCurriculumVisual
            },
            {
              heading: 'About Open Source & Community',
              questions: aboutCommunityVisual
            }
          ]}
          heading={
            <>
              Frequently asked <br /> questions
            </>
          }
        />
      </Section>
    </Stack>
  );
}

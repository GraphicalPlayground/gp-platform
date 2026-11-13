// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { Organization } from '@gp/constants';
import type { BreadcrumbItem } from '@gp/seo/jsonld';
import { BreadcrumbJsonLd } from '@gp/seo/react';
import { Breadcrumbs, Button, CTABanner, Grid, Hero, Section } from '@gp/ui/components';
import { aboutCommunityVisual, aboutCurriculumVisual, aboutEngineVisual, aboutPlaygroundVisual } from '@/app/content';
import { FAQClient } from '@/components/faq';

const FAQ_BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Help Center', path: '/help' },
  { name: 'FAQ', path: '/faq' }
];

export interface FaqViewProps {
  title: string;
  description: string;
}

/**
 * @brief Client view for the dedicated FAQ page.
 */
export const FaqView: React.FC<FaqViewProps> = ({ description, title }) => {
  return (
    <>
      <Section fullWidth backgroundColor='subtle' paddingBlockEnd='normal' paddingBlockStart='condensed'>
        <Grid>
          <Grid.Column span={12}>
            <Breadcrumbs>
              {FAQ_BREADCRUMBS.map((item, index) => (
                <Breadcrumbs.Item
                  key={item.path}
                  href={item.path}
                  {...(index === FAQ_BREADCRUMBS.length - 1 && { selected: true })}
                >
                  {item.name}
                </Breadcrumbs.Item>
              ))}
            </Breadcrumbs>
            <BreadcrumbJsonLd items={FAQ_BREADCRUMBS} />
          </Grid.Column>

          <Grid.Column span={12}>
            <Hero className='pbs-(--gp-size-32)! pbe-0!'>
              <Hero.Label>Help Center · FAQ</Hero.Label>
              <Hero.Heading size='2'>{title}</Hero.Heading>
              <Hero.Description size='300'>{description}</Hero.Description>
            </Hero>
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='default'>
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
        />
      </Section>

      <Section fullWidth backgroundColor='subtle' paddingBlockEnd='spacious' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <CTABanner hasBorder align='center' backgroundColor='default' variant='default'>
              <CTABanner.Heading as='h2'>Still have a question?</CTABanner.Heading>
              <CTABanner.Description>
                Reach our team by email or ask in the engineering channels on Discord.
              </CTABanner.Description>
              <CTABanner.ButtonGroup>
                <Button as='a' href='/contact' variant='primary'>
                  Contact us
                </Button>
                <Button
                  as='a'
                  href={Organization.socials.discord}
                  rel='noopener noreferrer'
                  target='_blank'
                  variant='secondary'
                >
                  Join Discord
                </Button>
              </CTABanner.ButtonGroup>
            </CTABanner>
          </Grid.Column>
        </Grid>
      </Section>
    </>
  );
};

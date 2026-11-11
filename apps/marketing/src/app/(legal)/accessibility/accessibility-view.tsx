// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { Organization } from '@gp/constants';
import type { BreadcrumbItem } from '@gp/seo/jsonld';
import { BreadcrumbJsonLd } from '@gp/seo/react';
import { Breadcrumbs, Button, CTABanner, Grid, Hero, Pillar, Section, SectionIntro } from '@gp/ui/components';
import { AccessibilityIcon, CommentDiscussionIcon, DeviceDesktopIcon } from '@primer/octicons-react';

const ACCESSIBILITY_BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Legal', path: '/legal' },
  { name: 'Accessibility', path: '/accessibility' }
];

const ACCESSIBILITY_PILLARS = [
  {
    icon: AccessibilityIcon,
    heading: 'Conformance and methodology',
    description:
      'Graphical Playground targets WCAG 2.1 Level AA and EN 301 549. Based on a self-assessment completed on January 1, 2026 under RGAA 4.1, the platform is partially conformant.',
    href: '/legal/accessibility',
    linkLabel: 'Read full accessibility statement'
  },
  {
    icon: DeviceDesktopIcon,
    heading: 'Known limitations',
    description:
      'Interactive 3D and shader previews rely on visual output without equivalent non-visual alternatives. Third-party code editors have partial keyboard support, and some older diagrams or videos lack alt text or captions.',
    href: '/legal/accessibility#3-known-limitations',
    linkLabel: 'Review known limitations'
  },
  {
    icon: CommentDiscussionIcon,
    heading: 'Browser and screen reader support',
    description:
      'Services are built for recent versions of Chrome, Firefox, Safari, and Edge with keyboard navigation and screen readers including NVDA, JAWS, and VoiceOver.',
    href: '/legal/accessibility#4-technical-specifications-and-compatibility',
    linkLabel: 'View compatibility details'
  }
] as const;

export interface AccessibilityViewProps {
  title: string;
}

/**
 * @brief Client view for the Accessibility overview page.
 */
export const AccessibilityView: React.FC<AccessibilityViewProps> = ({ title }) => {
  return (
    <>
      <Section fullWidth backgroundColor='subtle' paddingBlockEnd='normal' paddingBlockStart='condensed'>
        <Grid>
          <Grid.Column span={12}>
            <Breadcrumbs>
              {ACCESSIBILITY_BREADCRUMBS.map((item, index) => (
                <Breadcrumbs.Item
                  key={item.path}
                  href={item.path}
                  {...(index === ACCESSIBILITY_BREADCRUMBS.length - 1 && { selected: true })}
                >
                  {item.name}
                </Breadcrumbs.Item>
              ))}
            </Breadcrumbs>
            <BreadcrumbJsonLd items={ACCESSIBILITY_BREADCRUMBS} />
          </Grid.Column>

          <Grid.Column span={12}>
            <Hero className='pbs-(--gp-size-32)! pbe-0!'>
              <Hero.Label>Legal · Accessibility</Hero.Label>
              <Hero.Heading size='2'>{title}</Hero.Heading>
              <Hero.Description size='300'>
                Graphical Playground targets WCAG 2.1 Level AA and EN 301 549 across our websites and learning platform.
              </Hero.Description>
              <Hero.ButtonGroup>
                <Button as='a' href='/legal/accessibility' variant='primary'>
                  Read accessibility statement
                </Button>
                <Button as='a' href={Organization.mailto('accessibility')} variant='secondary'>
                  Report a barrier
                </Button>
              </Hero.ButtonGroup>
            </Hero>
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='default' paddingBlockEnd='normal' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Standards &amp; Status</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                How we assess accessibility
              </SectionIntro.Heading>
              <SectionIntro.Description>
                We review our accessibility status every year and after major changes to the platform.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          {ACCESSIBILITY_PILLARS.map((pillar) => {
            const PillarIcon = pillar.icon;

            return (
              <Grid.Column key={pillar.href} span={{ xsmall: 12, medium: 4 }}>
                <Pillar fullWidth>
                  <Pillar.Icon icon={PillarIcon} />
                  <Pillar.Heading as='h3'>{pillar.heading}</Pillar.Heading>
                  <Pillar.Description>{pillar.description}</Pillar.Description>
                  <Pillar.Link arrowDirection='end' href={pillar.href}>
                    {pillar.linkLabel}
                  </Pillar.Link>
                </Pillar>
              </Grid.Column>
            );
          })}
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='subtle' paddingBlockEnd='spacious' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <CTABanner hasBorder align='center' backgroundColor='default' variant='default'>
              <CTABanner.Heading as='h2'>Encountered an accessibility barrier?</CTABanner.Heading>
              <CTABanner.Description>
                Email {Organization.emails.accessibility} with the page, feature, and assistive technology you used. We
                acknowledge reports within 5 business days and aim to respond within 30 days.
              </CTABanner.Description>
              <CTABanner.ButtonGroup>
                <Button as='a' href={Organization.mailto('accessibility')} variant='primary'>
                  Email {Organization.emails.accessibility}
                </Button>
                <Button as='a' href='/legal/accessibility' variant='secondary'>
                  View legal notice &amp; ombudsman details
                </Button>
              </CTABanner.ButtonGroup>
            </CTABanner>
          </Grid.Column>
        </Grid>
      </Section>
    </>
  );
};

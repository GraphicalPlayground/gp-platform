// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { Organization } from '@gp/constants';
import type { BreadcrumbItem } from '@gp/seo/jsonld';
import { BreadcrumbJsonLd } from '@gp/seo/react';
import {
  Box,
  Breadcrumbs,
  Button,
  CTABanner,
  Grid,
  Hero,
  Pillar,
  Section,
  SectionIntro,
  Text
} from '@gp/ui/components';
import { LockIcon, MarkGithubIcon, ShieldLockIcon } from '@primer/octicons-react';

const SECURITY_BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Legal', path: '/legal' },
  { name: 'Security', path: '/security' }
];

const SECURITY_PILLARS = [
  {
    icon: ShieldLockIcon,
    heading: 'Platform scope',
    description:
      'Covers graphical-playground.com, the learner app, admin console, backend APIs, authentication, and OCI cloud rendering containers accessed through your own account.',
    href: '/legal/security-disclosure#1-scope',
    linkLabel: 'Review scope rules'
  },
  {
    icon: MarkGithubIcon,
    heading: 'Open-source repositories',
    description:
      'Report flaws in gp-engine or other public repositories through GitHub private vulnerability reporting so the maintainers of that repository receive them directly.',
    href: Organization.socials.github,
    linkLabel: 'Visit GitHub organization'
  },
  {
    icon: LockIcon,
    heading: 'Response and safe harbor',
    description:
      'We acknowledge reports within 5 business days, target 15 to 90 day fixes based on severity, and authorize good-faith testing under French Penal Code Art. 323-1.',
    href: '/legal/security-disclosure#4-safe-harbor',
    linkLabel: 'Read safe harbor terms'
  }
] as const;

export interface SecurityViewProps {
  title: string;
}

/**
 * @brief Client view for the Security & Vulnerability Disclosure page.
 */
export const SecurityView: React.FC<SecurityViewProps> = ({ title }) => {
  return (
    <>
      <Section fullWidth backgroundColor='subtle' paddingBlockEnd='normal' paddingBlockStart='condensed'>
        <Grid>
          <Grid.Column span={12}>
            <Breadcrumbs>
              {SECURITY_BREADCRUMBS.map((item, index) => (
                <Breadcrumbs.Item
                  key={item.path}
                  href={item.path}
                  {...(index === SECURITY_BREADCRUMBS.length - 1 && { selected: true })}
                >
                  {item.name}
                </Breadcrumbs.Item>
              ))}
            </Breadcrumbs>
            <BreadcrumbJsonLd items={SECURITY_BREADCRUMBS} />
          </Grid.Column>

          <Grid.Column span={12}>
            <Hero className='pbs-(--gp-size-32)! pbe-0!'>
              <Hero.Label>Legal · Security</Hero.Label>
              <Hero.Heading size='2'>{title}</Hero.Heading>
              <Hero.Description size='300'>
                Report suspected vulnerabilities in Graphical Playground sites, APIs, or cloud rendering containers
                under our coordinated disclosure policy.
              </Hero.Description>
              <Hero.ButtonGroup>
                <Button as='a' href={Organization.mailto('security')} variant='primary'>
                  Report a vulnerability
                </Button>
                <Button as='a' href='/legal/security-disclosure' variant='secondary'>
                  Read disclosure policy
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
              <SectionIntro.Label>Disclosure Program</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                How coordinated disclosure works
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Do not open public GitHub issues for unresolved flaws. Send affected endpoints, impact details, and
                reproduction steps to {Organization.emails.security}.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          {SECURITY_PILLARS.map((pillar) => {
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

      <Section fullWidth backgroundColor='subtle' id='hall-of-fame' paddingBlockEnd='normal' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <Box
              backgroundColor='default'
              borderColor='subtle'
              borderRadius='large'
              borderStyle='solid'
              borderWidth='thin'
              padding='normal'
            >
              <SectionIntro fullWidth align='start'>
                <SectionIntro.Label>Acknowledgments</SectionIntro.Label>
                <SectionIntro.Heading as='h2' size='4'>
                  Security Hall of Fame
                </SectionIntro.Heading>
                <SectionIntro.Description>
                  Graphical Playground does not operate a paid bug bounty program. Researchers who responsibly disclose
                  validated vulnerabilities can be credited here with their permission once a fix ships.
                </SectionIntro.Description>
              </SectionIntro>
              <Text as='p' size='200' variant='muted'>
                No public acknowledgments have been recorded yet. Need encrypted reporting? Request our PGP key at{' '}
                {Organization.emails.security} before sending sensitive details.
              </Text>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='default' paddingBlockEnd='spacious' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <CTABanner hasBorder align='center' backgroundColor='subtle' variant='default'>
              <CTABanner.Heading as='h2'>Found a security issue?</CTABanner.Heading>
              <CTABanner.Description>
                Email {Organization.emails.security} or check our RFC 9116 manifest for direct security contacts and
                policy links.
              </CTABanner.Description>
              <CTABanner.ButtonGroup>
                <Button as='a' href={Organization.mailto('security')} variant='primary'>
                  Email {Organization.emails.security}
                </Button>
                <Button as='a' href='/.well-known/security.txt' variant='secondary'>
                  View security.txt
                </Button>
              </CTABanner.ButtonGroup>
            </CTABanner>
          </Grid.Column>
        </Grid>
      </Section>
    </>
  );
};

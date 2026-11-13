// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { Organization, Repositories } from '@gp/constants';
import type { FaqEntry } from '@gp/content';
import type { BreadcrumbItem } from '@gp/seo/jsonld';
import { BreadcrumbJsonLd, FaqJsonLd } from '@gp/seo/react';
import {
  Breadcrumbs,
  Button,
  CTABanner,
  Card,
  FAQ,
  GitHubIcon,
  Grid,
  Hero,
  PricingOptions,
  Section,
  SectionIntro,
  SectionIntroStacked,
  Text
} from '@gp/ui/components';
import type { IconColor } from '@gp/ui/components';
import {
  BookIcon,
  HeartIcon,
  InfoIcon,
  MailIcon,
  PeopleIcon,
  RocketIcon,
  ServerIcon,
  TerminalIcon,
  VerifiedIcon
} from '@primer/octicons-react';
import type { Icon } from '@primer/octicons-react';
import { useDitherBackground } from '@/components/home/visuals';
import styles from './pricing.module.css';

const PRICING_BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' }
];

interface FundingPillar {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: Icon;
  readonly color: IconColor;
}

const FUNDING_PILLARS: readonly FundingPillar[] = [
  {
    id: 'open-curriculum',
    title: 'Zero paywall on the curriculum',
    description:
      'Lessons, technical breakdowns, HLSL material samples, and gp-engine C++23 source code remain freely readable and runnable on personal hardware.',
    icon: BookIcon,
    color: 'green'
  },
  {
    id: 'cloud-compute',
    title: 'Subscriptions cover real GPU servers',
    description:
      'Paid cloud plans exist to pay for remote GPU instances, OCI container scheduling, and streaming bandwidth for students without dedicated hardware.',
    icon: ServerIcon,
    color: 'blue'
  },
  {
    id: 'optional-certifications',
    title: 'Optional project verification',
    description:
      'Upcoming certification tracks will stay optional for learners who want verified credentials tied to public IDs and showcase projects.',
    icon: VerifiedIcon,
    color: 'indigo'
  },
  {
    id: 'sponsors-subsidy',
    title: 'Sponsors help lower student costs',
    description:
      'Community donations and sponsorships offset shared cluster bills so individual cloud access can stay affordable as traffic grows.',
    icon: HeartIcon,
    color: 'coral'
  }
];

const PRICING_FAQ_ITEMS: FaqEntry[] = [
  {
    question: 'Can I use Graphical Playground completely for free?',
    answer:
      'Yes. You can read every lesson, clone gp-engine in C++23, study the HLSL shaders, and run a local engine server on your own GPU for 0 EUR.'
  },
  {
    question: 'Why does Cloud GPU access require a subscription?',
    answer:
      'Browser-based execution compiles your C++23 projects and runs real graphics workloads inside isolated OCI containers on remote GPUs. A paid plan covers hardware rental, orchestration, and hosting bills.'
  },
  {
    question: 'When will final EUR rates for Cloud GPU be published?',
    answer:
      'Exact monthly Euro pricing is still being finalized while we complete shared GPU container benchmarks. Joining the waitlist notifies you as soon as rates and cohorts open.'
  },
  {
    question: 'Is there any difference in curriculum between Open & Local and Cloud GPU?',
    answer:
      'No. Both run against the same curriculum exercises and gp-engine codebase. Only where your code executes changes: your local workstation GPU or a remote OCI container.'
  },
  {
    question: 'Are certifications included or optional?',
    answer:
      'Certifications are optional credentials currently under development. They are designed to help candidates stand out and fund shared infrastructure while coursework remains open.'
  },
  {
    question: 'Do schools, universities, or teams get custom quotes?',
    answer: `Yes. Universities, training cohorts, and engineering teams can email ${Organization.emails.sales} or ${Organization.emails.billing} to arrange shared seats and GPU allocations.`
  }
];

export interface PricingViewProps {
  title: string;
}

/**
 * @brief Client view for `/pricing`, showcasing unified zero-gap `PricingOptions`, hardware execution options, and synced FAQ schema.
 */
export const PricingView: React.FC<PricingViewProps> = ({ title }) => {
  const { containerRef: heroDitherRef, DitherBackground: HeroDitherBackground } = useDitherBackground({
    dotOpacity: 0.28,
    interactiveCursor: false,
    maskMode: 'top-fade',
    palette: 'green',
    transparentBackground: true,
    type: 'wave'
  });

  return (
    <>
      <div ref={heroDitherRef} className={styles.heroBannerFrame}>
        <Section
          fullWidth
          backgroundColor='transparent'
          className={styles.heroSection}
          paddingBlockEnd='normal'
          paddingBlockStart='condensed'
        >
          <Grid>
            <Grid.Column span={12}>
              <Breadcrumbs>
                {PRICING_BREADCRUMBS.map((item, index) => (
                  <Breadcrumbs.Item
                    key={item.path}
                    href={item.path}
                    {...(index === PRICING_BREADCRUMBS.length - 1 && { selected: true })}
                  >
                    {item.name}
                  </Breadcrumbs.Item>
                ))}
              </Breadcrumbs>
              <BreadcrumbJsonLd items={PRICING_BREADCRUMBS} />
            </Grid.Column>

            <Grid.Column span={12}>
              <Hero align='center' className={styles.heroRoot}>
                <Hero.Label>{`Platform · ${title}`}</Hero.Label>
                <Hero.Heading size='2'>Learn for free locally. Pay only for cloud GPUs.</Hero.Heading>
                <Hero.Description size='300'>
                  {`Run ${Repositories.GpEngine.displayName} and the full curriculum on your own workstation for ${Organization.currencySymbol}0, or join the waitlist for containerized browser GPUs when you lack local hardware.`}
                </Hero.Description>
                <Hero.ButtonGroup>
                  <Button as='a' href='#plans' leadingVisual={<RocketIcon />} variant='primary'>
                    Compare plans
                  </Button>
                  <Button as='a' href='/waitlist' variant='secondary'>
                    Join Cloud waitlist
                  </Button>
                </Hero.ButtonGroup>
              </Hero>
            </Grid.Column>
          </Grid>
        </Section>
        <HeroDitherBackground />
      </div>

      <Section fullWidth backgroundColor='default' id='plans' paddingBlockEnd='spacious' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='center'>
              <SectionIntro.Label>Access tiers</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                Choose how you run the engine
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Every tier covers the same C++23 rendering curriculum. Pick local execution today or reserve remote GPU
                compute as cloud access opens.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          <Grid.Column span={12}>
            <div className={styles.pricingWrap}>
              <PricingOptions align='start' variant='default-gradient'>
                <PricingOptions.Item>
                  <PricingOptions.Label>Available now</PricingOptions.Label>
                  <PricingOptions.Heading as='h3'>Open &amp; Local</PricingOptions.Heading>
                  <PricingOptions.Description>
                    Clone the engine, follow the curriculum, and run shaders directly on your own GPU.
                  </PricingOptions.Description>
                  <PricingOptions.Price
                    currencyCode={Organization.currency}
                    currencySymbol={Organization.currencySymbol}
                    trailingText='forever on personal hardware'
                  >
                    0
                  </PricingOptions.Price>
                  <PricingOptions.PrimaryAction
                    as='a'
                    href={Repositories.GpEngine.url}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    Clone gp-engine
                  </PricingOptions.PrimaryAction>
                  <PricingOptions.SecondaryAction
                    as='a'
                    href={Organization.subdomain('docs')}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    Read docs
                  </PricingOptions.SecondaryAction>
                  <PricingOptions.FeatureList expanded>
                    <PricingOptions.FeatureListGroupHeading>
                      Curriculum &amp; Engine
                    </PricingOptions.FeatureListGroupHeading>
                    <PricingOptions.FeatureListItem>
                      Open curriculum lessons and technical breakdowns
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      {`MIT open-source ${Repositories.GpEngine.displayName} (C++23 & HLSL)`}
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      Local engine server connected to the web workspace
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      Full rendering execution on your workstation GPU
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListGroupHeading>Hosted Services</PricingOptions.FeatureListGroupHeading>
                    <PricingOptions.FeatureListItem variant='excluded'>
                      Remote OCI cloud GPU containers
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem variant='excluded'>
                      Optional paid certification review
                    </PricingOptions.FeatureListItem>
                  </PricingOptions.FeatureList>
                  <PricingOptions.Footnote>
                    No credit card or paid plan required for local setup.
                  </PricingOptions.Footnote>
                </PricingOptions.Item>

                <PricingOptions.Item>
                  <PricingOptions.Label>Waitlist open</PricingOptions.Label>
                  <PricingOptions.Heading as='h3'>Cloud GPU</PricingOptions.Heading>
                  <PricingOptions.Description>
                    Compile C++23 code and run rendering pipelines inside browser-connected cloud GPUs.
                  </PricingOptions.Description>
                  <PricingOptions.Price
                    currencyCode=''
                    currencySymbol=''
                    trailingText='monthly subscription · EUR rates in finalization'
                  >
                    TBD
                  </PricingOptions.Price>
                  <PricingOptions.PrimaryAction as='a' href='/waitlist'>
                    Join waitlist
                  </PricingOptions.PrimaryAction>
                  <PricingOptions.SecondaryAction as='a' href='/products/cloud'>
                    Explore GP Cloud
                  </PricingOptions.SecondaryAction>
                  <PricingOptions.ActionsMessage leadingComponent={<InfoIcon size={16} />}>
                    Final monthly EUR rates will be published once shared GPU cluster benchmarks wrap up.
                  </PricingOptions.ActionsMessage>
                  <PricingOptions.FeatureList expanded>
                    <PricingOptions.FeatureListGroupHeading>
                      Everything in Open &amp; Local, plus
                    </PricingOptions.FeatureListGroupHeading>
                    <PricingOptions.FeatureListItem infoTooltip='Isolated Open Container Initiative sandboxes stream compiled frames straight to your browser.'>
                      Containerized OCI cloud GPU execution
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      Zero local graphics driver or SDK installation
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      Works on Chromebooks and thin-and-light laptops
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      Same exercises and HLSL shader workflow as local mode
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      Revenue goes directly toward GPU cluster upkeep
                    </PricingOptions.FeatureListItem>
                  </PricingOptions.FeatureList>
                  <PricingOptions.Footnote>
                    Built for learners who do not own a dedicated graphics card.
                  </PricingOptions.Footnote>
                </PricingOptions.Item>

                <PricingOptions.Item>
                  <PricingOptions.Label>Academic &amp; Teams</PricingOptions.Label>
                  <PricingOptions.Heading as='h3'>Schools &amp; Teams</PricingOptions.Heading>
                  <PricingOptions.Description>
                    Shared GPU quotas, seat administration, and cohort onboarding for universities and studios.
                  </PricingOptions.Description>
                  <PricingOptions.Price
                    currencyCode=''
                    currencySymbol=''
                    trailingText='per institution or cohort bundle'
                  >
                    Custom
                  </PricingOptions.Price>
                  <PricingOptions.PrimaryAction as='a' href={Organization.mailto('sales')}>
                    Contact sales
                  </PricingOptions.PrimaryAction>
                  <PricingOptions.SecondaryAction as='a' href='/certifications'>
                    About certifications
                  </PricingOptions.SecondaryAction>
                  <PricingOptions.FeatureList expanded>
                    <PricingOptions.FeatureListGroupHeading>
                      Cohort &amp; Billing Features
                    </PricingOptions.FeatureListGroupHeading>
                    <PricingOptions.FeatureListItem>
                      Managed seat counts across student or team cohorts
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      Predictable cloud GPU quotas for lab workshops
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      {`Direct invoice billing via ${Organization.emails.billing}`}
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      Curriculum alignment support with our engineering team
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      Optional project certification bundles when ready
                    </PricingOptions.FeatureListItem>
                  </PricingOptions.FeatureList>
                  <PricingOptions.Footnote>
                    {`Academic discount terms discussed via ${Organization.emails.partnerships}.`}
                  </PricingOptions.Footnote>
                </PricingOptions.Item>
              </PricingOptions>
            </div>
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='subtle' paddingBlockEnd='normal' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Hardware independence</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                Same curriculum on your GPU or ours
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Every lesson compiles against gp-engine. Use local execution for free on capable hardware, or shift
                heavy rendering onto remote cloud GPUs from a low-spec laptop.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          <Grid.Column span={{ xsmall: 12, medium: 6 }}>
            <Card fullWidth hasBorder backgroundColor='default' ctaText='Explore gp-engine' href='/products/engine'>
              <Card.Icon hasBackground color='green' icon={TerminalIcon} />
              <Card.Label>{`Local GPU · ${Organization.currencySymbol}0 ${Organization.currency}`}</Card.Label>
              <Card.Heading as='h3'>Run the local engine server</Card.Heading>
              <Card.Description>
                Connect your workstation GPU directly to the platform and work through the entire C++23 and HLSL
                curriculum without any paid plan.
              </Card.Description>
            </Card>
          </Grid.Column>

          <Grid.Column span={{ xsmall: 12, medium: 6 }}>
            <Card fullWidth hasBorder backgroundColor='default' ctaText='Explore GP Cloud' href='/products/cloud'>
              <Card.Icon hasBackground color='indigo' icon={ServerIcon} />
              <Card.Label>GP Cloud · Upcoming</Card.Label>
              <Card.Heading as='h3'>Stream pipelines from any browser</Card.Heading>
              <Card.Description>
                Run isolated OCI cloud GPU containers remotely when working on a Chromebook, ultrabook, or machine
                without a discrete graphics card.
              </Card.Description>
            </Card>
          </Grid.Column>
        </Grid>
      </Section>

      <Section
        fullWidth
        backgroundColor='default'
        id='funding-model'
        paddingBlockEnd='normal'
        paddingBlockStart='normal'
      >
        <Grid>
          <Grid.Column span={12}>
            <SectionIntroStacked variant='gridline'>
              <SectionIntroStacked.Heading as='h2' size='3'>
                Built for access first, <b>sustained cleanly</b>.
              </SectionIntroStacked.Heading>
              <SectionIntroStacked.Description>
                Every euro from subscriptions, future certifications, and sponsorships funds real server compute and
                maintenance while keeping educational material open.
              </SectionIntroStacked.Description>
              <SectionIntroStacked.Link arrowDirection='end' href='/sponsors'>
                See how sponsors help
              </SectionIntroStacked.Link>
              <SectionIntroStacked.Items>
                {FUNDING_PILLARS.map((pillar) => (
                  <SectionIntroStacked.Item key={pillar.id}>
                    <SectionIntroStacked.ItemIcon color={pillar.color} icon={pillar.icon} />
                    <SectionIntroStacked.ItemHeading as='h3'>{pillar.title}</SectionIntroStacked.ItemHeading>
                    <SectionIntroStacked.ItemDescription>{pillar.description}</SectionIntroStacked.ItemDescription>
                  </SectionIntroStacked.Item>
                ))}
              </SectionIntroStacked.Items>
            </SectionIntroStacked>
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='subtle' id='pricing-faq' paddingBlockEnd='normal' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <FAQ variant='default'>
              <FAQ.Heading align='center' as='h2' size='3'>
                Pricing questions
              </FAQ.Heading>
              {PRICING_FAQ_ITEMS.map((item) => (
                <FAQ.Item key={item.question}>
                  <FAQ.Question as='h3'>{item.question}</FAQ.Question>
                  <FAQ.Answer>
                    <Text as='p' size='200'>
                      {item.answer}
                    </Text>
                  </FAQ.Answer>
                </FAQ.Item>
              ))}
            </FAQ>
            <FaqJsonLd
              description='Frequently asked questions about Graphical Playground free local engine execution, upcoming Cloud GPU pricing in EUR, optional certifications, and institutional plans.'
              items={PRICING_FAQ_ITEMS}
              name='Pricing Frequently Asked Questions'
              path='/pricing'
            />
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='default' paddingBlockEnd='spacious' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <CTABanner hasBorder align='center' backgroundColor='subtle' variant='default'>
              <CTABanner.Heading as='h2'>Start locally today or reserve cloud GPU access</CTABanner.Heading>
              <CTABanner.Description>
                Clone the engine source from GitHub right now, join the Cloud GPU waitlist, or email our team with
                school and cohort inquiries.
              </CTABanner.Description>
              <CTABanner.ButtonGroup>
                <Button as='a' href='/waitlist' leadingVisual={<RocketIcon />} variant='primary'>
                  Join waitlist
                </Button>
                <Button
                  as='a'
                  href={Repositories.GpEngine.url}
                  leadingVisual={<GitHubIcon />}
                  rel='noopener noreferrer'
                  target='_blank'
                  variant='secondary'
                >
                  View gp-engine
                </Button>
                <Button as='a' href={Organization.mailto('sales')} leadingVisual={<MailIcon />} variant='subtle'>
                  Contact sales
                </Button>
                <Button as='a' href='/sponsors' leadingVisual={<PeopleIcon />} variant='subtle'>
                  Support the platform
                </Button>
              </CTABanner.ButtonGroup>
            </CTABanner>
          </Grid.Column>
        </Grid>
      </Section>
    </>
  );
};

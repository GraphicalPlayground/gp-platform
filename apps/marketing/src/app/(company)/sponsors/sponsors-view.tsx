// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { Organization, Persons, Repositories } from '@gp/constants';
import type { FaqEntry } from '@gp/content';
import type { BreadcrumbItem } from '@gp/seo/jsonld';
import { BreadcrumbJsonLd, FaqJsonLd } from '@gp/seo/react';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CTABanner,
  EyebrowText,
  FAQ,
  GitHubIcon,
  Grid,
  Heading,
  Hero,
  Image,
  Link,
  LogoSuite,
  Pillar,
  Section,
  SectionIntro,
  Text,
  Token,
  UnorderedList
} from '@gp/ui/components';
import type { IconColor } from '@gp/ui/components';
import {
  BookIcon,
  CodeIcon,
  GiftIcon,
  HeartIcon,
  MailIcon,
  PackageIcon,
  PeopleIcon,
  ServerIcon,
  StarIcon
} from '@primer/octicons-react';
import type { Icon } from '@primer/octicons-react';
import { useDitherBackground } from '@/components/home/visuals';
import { ACTIVE_PARTNERS } from '@/data/home';
import { SponsorsFloatingHearts } from './sponsors-floating-hearts';
import styles from './sponsors.module.css';

const SPONSORS_BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Our Sponsors', path: '/sponsors' }
];

const GITHUB_SPONSORS_URL = 'https://github.com/sponsors/GraphicalPlayground';
const BUY_ME_A_COFFEE_URL = 'https://www.buymeacoffee.com/GraphicalPlayground';
const OPEN_COLLECTIVE_URL = 'https://opencollective.com/graphical-playground';
const THANKS_DEV_URL = 'https://thanks.dev/u/gh/GraphicalPlayground';
const DONATE_ROUTE = '/donate';
const DONORS_LEDGER_URL = `${Repositories.GpPlatform.url}/blob/main/DONORS.md`;
const CONTRIBUTING_GUIDE_URL = `${Repositories.GpPlatform.url}/blob/main/CONTRIBUTING.md`;

interface SponsorshipChannel {
  readonly id: string;
  readonly name: string;
  readonly href: string;
  readonly ctaText: string;
  readonly badge: string;
  readonly description: string;
  readonly icon: Icon;
  readonly color: IconColor;
}

const PREFERRED_CHANNELS: readonly SponsorshipChannel[] = [
  {
    id: 'github-sponsors',
    name: 'GitHub Sponsors',
    href: GITHUB_SPONSORS_URL,
    ctaText: 'github.com/sponsors/GraphicalPlayground',
    badge: 'Preferred · Monthly or one-time',
    description:
      'Use GitHub Sponsors for recurring or one-time backing. GitHub handles payment processing cleanly and links your profile directly to our organization.',
    icon: HeartIcon,
    color: 'coral'
  },
  {
    id: 'direct-donation',
    name: 'Direct Donation',
    href: DONATE_ROUTE,
    ctaText: 'graphical-playground.com/donate',
    badge: 'Preferred · Direct support',
    description:
      'Send money directly to the project to pay for cloud GPU workers, domain renewals, and infrastructure bills without third-party platform cuts.',
    icon: GiftIcon,
    color: 'green'
  }
];

const ECOSYSTEM_CHANNELS: readonly SponsorshipChannel[] = [
  {
    id: 'open-collective',
    name: 'Open Collective',
    href: OPEN_COLLECTIVE_URL,
    ctaText: 'opencollective.com/graphical-playground',
    badge: 'Public ledger',
    description:
      'Works well if your company needs formal invoices, public expense records, or collective fiscal hosting.',
    icon: PeopleIcon,
    color: 'blue'
  },
  {
    id: 'buy-me-a-coffee',
    name: 'Buy Me A Coffee',
    href: BUY_ME_A_COFFEE_URL,
    ctaText: 'buymeacoffee.com/GraphicalPlayground',
    badge: 'Quick contribution',
    description: 'Send a small one-time or monthly contribution if you enjoyed a lesson, visualizer, or guide.',
    icon: StarIcon,
    color: 'yellow'
  },
  {
    id: 'thanks-dev',
    name: 'Thanks Dev',
    href: THANKS_DEV_URL,
    ctaText: 'thanks.dev/u/gh/GraphicalPlayground',
    badge: 'Dependency funding',
    description:
      "Splits your engineering team's monthly open-source budget automatically across the GitHub repositories you depend on.",
    icon: PackageIcon,
    color: 'teal'
  }
];

interface FundingAllocationItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: Icon;
}

const FUNDING_ALLOCATIONS: readonly FundingAllocationItem[] = [
  {
    id: 'cloud-gpu',
    title: 'Cloud GPU workers',
    description:
      'Pays for remote rendering runners so students without a dedicated GPU can compile shaders and inspect 3D frames in their browser.',
    icon: ServerIcon
  },
  {
    id: 'open-tooling',
    title: 'Domains, CI, and engine work',
    description:
      'Covers hosting, domain registrations, automated build runners, and maintenance on gp-engine and gp-platform.',
    icon: CodeIcon
  },
  {
    id: 'curriculum-access',
    title: 'Free lessons and contributor stipends',
    description:
      'Keeps core graphics engineering courses free to read and funds occasional paid work when donor budgets allow, as noted in DONORS.md.',
    icon: BookIcon
  }
];

interface RecognitionTier {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly perks: readonly string[];
}

const RECOGNITION_TIERS: readonly RecognitionTier[] = [
  {
    id: 'patrons',
    eyebrow: 'Major backers',
    title: 'Patrons',
    summary: 'Organizations or individuals funding dedicated cloud GPU capacity or multi-month infrastructure.',
    perks: [
      'Featured logo placement at the top of this page',
      'Credit in DONORS.md and stable platform release notes',
      'Direct planning call or email thread with the founding maintainers'
    ]
  },
  {
    id: 'tiered-sponsors',
    eyebrow: 'Team tiers',
    title: 'Platinum, Gold, and Silver Sponsors',
    summary: 'Studios, hardware teams, and tooling companies supporting open graphics education.',
    perks: [
      'Listed by tier on graphical-playground.com/sponsors',
      'Credited in repository release notes and DONORS.md',
      `Direct coordination through ${Organization.emails.sponsor}`
    ]
  },
  {
    id: 'community-donors',
    eyebrow: 'Individual donors',
    title: 'Diamond, Titanium, and Community Members',
    summary: 'Students and engineers donating monthly or once through any of the five platforms above.',
    perks: [
      'Recorded in DONORS.md ahead of the next stable release',
      'Optional supporter role on Discord',
      'Money goes straight toward server hours and domain costs'
    ]
  }
];

const CORE_CONTRIBUTORS = [
  Persons.MalloryScotton,
  Persons.HugoCathelain,
  Persons.NathanFievet,
  Persons.OssanMsoili,
  Persons.RaphaelOstier
] as const;

const SPONSORS_FAQ_ITEMS: FaqEntry[] = [
  {
    question: 'Which sponsorship channels does Graphical Playground prefer?',
    answer:
      'We prefer GitHub Sponsors (https://github.com/sponsors/GraphicalPlayground) and Direct Donations on graphical-playground.com/donate because more of each contribution reaches server and infrastructure bills. We also accept contributions on Open Collective, Buy Me A Coffee, and Thanks Dev.'
  },
  {
    question: 'Does Graphical Playground have any active financial sponsors right now?',
    answer:
      'Not yet. All financial sponsor tiers are currently open. EPITECH Lyon supports Graphical Playground as our founding academic home (EPITECH Innovative Project), while our team and volunteer contributors maintain the platform.'
  },
  {
    question: 'How can companies or institutions discuss sponsorship before sending money?',
    answer: `Write to ${Organization.emails.sponsor} if you want to talk through cloud GPU grants, invoicing, academic partnerships, or sponsor placement before making a pledge.`
  },
  {
    question: 'How do you credit sponsors and donors?',
    answer:
      'We list financial backers on graphical-playground.com/sponsors, update DONORS.md across Patrons, Platinum/Gold/Silver Sponsors, and Diamond through Bronze member tiers, and include attributions in stable release notes.'
  },
  {
    question: 'Can I help without spending money?',
    answer:
      'Yes. You can open pull requests on engine code, lessons, or documentation on GitHub (github.com/GraphicalPlayground), report bugs, or help learners in our Discord server.'
  }
];

export interface SponsorsViewProps {
  title: string;
}

/**
 * @brief Client view for `/sponsors`, covering preferred and ecosystem funding links,
 * cost breakdown, current sponsor status, and project contributors.
 */
export const SponsorsView: React.FC<SponsorsViewProps> = ({ title }) => {
  const primaryPartner = ACTIVE_PARTNERS[0];
  const { containerRef: heroDitherRef, DitherBackground: HeroDitherBackground } = useDitherBackground({
    dotOpacity: 0.32,
    interactiveCursor: false,
    maskMode: 'top-fade',
    palette: 'purple-pink',
    transparentBackground: true,
    type: 'wave'
  });

  return (
    <>
      <div ref={heroDitherRef} className={styles.heroBannerFrame}>
        <SponsorsFloatingHearts />
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
                {SPONSORS_BREADCRUMBS.map((item, index) => (
                  <Breadcrumbs.Item
                    key={item.path}
                    href={item.path}
                    {...(index === SPONSORS_BREADCRUMBS.length - 1 && { selected: true })}
                  >
                    {item.name}
                  </Breadcrumbs.Item>
                ))}
              </Breadcrumbs>
              <BreadcrumbJsonLd items={SPONSORS_BREADCRUMBS} />
            </Grid.Column>

            <Grid.Column span={12}>
              <Hero align='center' className={styles.heroRoot}>
                <Hero.Label>Company · Sponsors</Hero.Label>
                <Hero.Heading size='2'>{title}</Hero.Heading>
                <Hero.Description size='300'>
                  Financial sponsors keep Graphical Playground free to use without a local GPU. We do not have any
                  paying sponsors yet, so every tier is open. If you want to back the project, we prefer GitHub Sponsors
                  or a direct donation.
                </Hero.Description>
                <Hero.ButtonGroup>
                  <Button as='a' href={GITHUB_SPONSORS_URL} rel='noopener noreferrer' target='_blank' variant='primary'>
                    Sponsor on GitHub
                  </Button>
                  <Button as='a' href={DONATE_ROUTE} variant='secondary'>
                    Direct donation
                  </Button>
                </Hero.ButtonGroup>
              </Hero>
            </Grid.Column>
          </Grid>
        </Section>
        <HeroDitherBackground />
      </div>

      <Section
        fullWidth
        backgroundColor='default'
        id='ways-to-sponsor'
        paddingBlockEnd='normal'
        paddingBlockStart='normal'
      >
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Support channels</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                Ways to sponsor Graphical Playground
              </SectionIntro.Heading>
              <SectionIntro.Description>
                You can support the project through any of the five platforms below. When possible, please pick{' '}
                <strong>GitHub Sponsors</strong> or <strong>Direct Donation</strong> so fewer fees come out of your
                contribution.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          <Grid.Column span={12}>
            <div className={styles.channelGroups}>
              <section aria-labelledby='sponsors-preferred-heading' className={styles.channelGroup}>
                <div className={styles.channelGroupHeader}>
                  <Heading as='h3' id='sponsors-preferred-heading' size='5'>
                    Preferred channels
                  </Heading>
                  <Text as='p' size='200' variant='muted'>
                    Our two main options for recurring sponsorships or direct project contributions.
                  </Text>
                </div>

                <Grid>
                  {PREFERRED_CHANNELS.map((channel) => (
                    <Grid.Column key={channel.id} span={{ xsmall: 12, medium: 6 }}>
                      <Card fullWidth hasBorder backgroundColor='subtle' ctaText={channel.ctaText} href={channel.href}>
                        <Card.Icon hasBackground color={channel.color} icon={channel.icon} />
                        <Card.Label variant='token'>{channel.badge}</Card.Label>
                        <Card.Heading as='h4'>{channel.name}</Card.Heading>
                        <Card.Description>{channel.description}</Card.Description>
                      </Card>
                    </Grid.Column>
                  ))}
                </Grid>
              </section>

              <section aria-labelledby='sponsors-ecosystem-heading' className={styles.channelGroup}>
                <div className={styles.channelGroupHeader}>
                  <Heading as='h3' id='sponsors-ecosystem-heading' size='5'>
                    Other platforms
                  </Heading>
                  <Text as='p' size='200' variant='muted'>
                    Alternative ways to chip in depending on whether you want public accounting, a quick one-off tip, or
                    dependency-based payouts.
                  </Text>
                </div>

                <Grid>
                  {ECOSYSTEM_CHANNELS.map((channel) => (
                    <Grid.Column key={channel.id} span={{ xsmall: 12, medium: 6, large: 4 }}>
                      <Card fullWidth hasBorder backgroundColor='default' ctaText={channel.ctaText} href={channel.href}>
                        <Card.Icon hasBackground color={channel.color} icon={channel.icon} />
                        <Card.Label variant='token'>{channel.badge}</Card.Label>
                        <Card.Heading as='h4'>{channel.name}</Card.Heading>
                        <Card.Description>{channel.description}</Card.Description>
                      </Card>
                    </Grid.Column>
                  ))}
                </Grid>
              </section>

              <Box
                backgroundColor='subtle'
                borderColor='subtle'
                borderRadius='large'
                borderStyle='solid'
                borderWidth='thin'
                className={styles.discussBox}
                padding='normal'
              >
                <div className={styles.discussRow}>
                  <div className={styles.discussCopy}>
                    <EyebrowText variant='accent'>Talk with us first</EyebrowText>
                    <Heading as='h3' size='5'>
                      Questions about sponsoring GPUs or institutional backing?
                    </Heading>
                    <Text as='p' size='200' variant='muted'>
                      Email us before sending funds if you want to discuss hardware credits, academic grants, or company
                      sponsorship terms.
                    </Text>
                  </div>

                  <div className={styles.discussActions}>
                    <Button as='a' href={Organization.mailto('sponsor')} leadingVisual={<MailIcon />} variant='primary'>
                      Email {Organization.emails.sponsor}
                    </Button>
                    <Button as='a' href='/contact' variant='secondary'>
                      All contact options
                    </Button>
                  </div>
                </div>
              </Box>
            </div>
          </Grid.Column>
        </Grid>
      </Section>

      <Section
        fullWidth
        backgroundColor='subtle'
        id='funding-impact'
        paddingBlockEnd='normal'
        paddingBlockStart='normal'
      >
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Where money goes</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                What sponsorships pay for
              </SectionIntro.Heading>
              <SectionIntro.Description>
                {Organization.displayName} is a non-profit educational project. Running cloud shader sandboxes and
                keeping all lessons open-access creates real server and maintenance bills every month.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          {FUNDING_ALLOCATIONS.map((item) => (
            <Grid.Column key={item.id} span={{ xsmall: 12, medium: 4 }}>
              <Pillar fullWidth>
                <Pillar.Icon icon={item.icon} />
                <Pillar.Heading as='h3'>{item.title}</Pillar.Heading>
                <Pillar.Description>{item.description}</Pillar.Description>
              </Pillar>
            </Grid.Column>
          ))}
        </Grid>
      </Section>

      <Section
        fullWidth
        backgroundColor='default'
        id='current-sponsors'
        paddingBlockEnd='normal'
        paddingBlockStart='normal'
      >
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Current backing</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                Sponsors and academic support
              </SectionIntro.Heading>
              <SectionIntro.Description>
                EPITECH Lyon supports Graphical Playground as our founding academic home. All financial sponsor slots
                are currently open.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          {primaryPartner ? (
            <Grid.Column className={styles.partnerBar} span={12}>
              <LogoSuite hasDivider align='start' variant='gridline-expressive'>
                <LogoSuite.Heading as='h3' size='subhead-large'>
                  Founding academic home
                </LogoSuite.Heading>
                <LogoSuite.Description>
                  Originated as an EPITECH Innovative Project (EIP) in Lyon, France.
                </LogoSuite.Description>
                <LogoSuite.Logobar variant='muted'>
                  <div className={styles.partnerSingleRow}>
                    <Image
                      alt={primaryPartner.alt}
                      className={styles.partnerLogo}
                      height={30}
                      src={primaryPartner.logoSrc}
                      width={121}
                    />
                    <div className={styles.partnerMeta}>
                      {primaryPartner.badge ? <Token variant='outline'>{primaryPartner.badge}</Token> : null}
                      <Text as='span' font='monospace' size='100' variant='muted'>
                        {primaryPartner.role}
                        {primaryPartner.location ? ` · ${primaryPartner.location}` : ''}
                      </Text>
                    </div>
                  </div>
                </LogoSuite.Logobar>
              </LogoSuite>
            </Grid.Column>
          ) : null}

          <Grid.Column className={styles.emptyLedgerCard} span={12}>
            <Box
              backgroundColor='subtle'
              borderColor='subtle'
              borderRadius='large'
              borderStyle='solid'
              borderWidth='thin'
              padding='normal'
            >
              <div className={styles.emptyLedgerContent}>
                <div className={styles.emptyLedgerHeader}>
                  <Heading as='h3' size='5'>
                    No financial sponsors yet
                  </Heading>
                  <Token variant='outline'>0 active sponsors · Founding slots open</Token>
                </div>

                <Text as='p' size='200' variant='muted'>
                  We have not signed a financial sponsor yet. Once an organization or individual backs the project
                  through GitHub Sponsors, Direct Donation, Open Collective, Buy Me A Coffee, or Thanks Dev, we add them
                  here and record them in{' '}
                  <Link href={DONORS_LEDGER_URL} rel='noopener noreferrer' target='_blank' variant='accent'>
                    DONORS.md
                  </Link>
                  .
                </Text>

                <div className={styles.discussActions}>
                  <Button as='a' href={GITHUB_SPONSORS_URL} rel='noopener noreferrer' target='_blank' variant='primary'>
                    Become our first sponsor
                  </Button>
                  <Button as='a' href={Organization.mailto('sponsor')} variant='secondary'>
                    Email {Organization.emails.sponsor}
                  </Button>
                </div>
              </div>
            </Box>
          </Grid.Column>

          {RECOGNITION_TIERS.map((tier) => (
            <Grid.Column key={tier.id} span={{ xsmall: 12, medium: 4 }}>
              <Box
                backgroundColor='subtle'
                borderColor='subtle'
                borderRadius='large'
                borderStyle='solid'
                borderWidth='thin'
                className={styles.tierCard}
                padding='normal'
              >
                <div className={styles.tierStack}>
                  <EyebrowText variant='accent'>{tier.eyebrow}</EyebrowText>
                  <Heading as='h3' size='5'>
                    {tier.title}
                  </Heading>
                  <Text as='p' size='200' variant='muted'>
                    {tier.summary}
                  </Text>
                  <UnorderedList variant='default'>
                    {tier.perks.map((perk) => (
                      <UnorderedList.Item key={perk}>{perk}</UnorderedList.Item>
                    ))}
                  </UnorderedList>
                  <div className={styles.tierFooter}>
                    <Token variant='outline'>Slots open</Token>
                  </div>
                </div>
              </Box>
            </Grid.Column>
          ))}
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='subtle' id='contributors' paddingBlockEnd='normal' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Contributors</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                People building Graphical Playground
              </SectionIntro.Heading>
              <SectionIntro.Description>
                These founding engineers and our GitHub community build the platform on volunteer time while we seek our
                first sponsors.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          {CORE_CONTRIBUTORS.map((person) => (
            <Grid.Column key={person.slug()} span={{ xsmall: 12, medium: 6, large: 4 }}>
              <Box
                backgroundColor='default'
                borderColor='subtle'
                borderRadius='large'
                borderStyle='solid'
                borderWidth='thin'
                className={styles.contributorCard}
                padding='normal'
              >
                <div className={styles.contributorStack}>
                  <div className={styles.contributorIdentity}>
                    <Avatar alt={`${person.fullName} avatar`} size={48} src={person.avatarUrl} />
                    <div className={styles.contributorText}>
                      <Heading as='h3' size='6'>
                        {person.fullName}
                      </Heading>
                      <Text as='p' font='monospace' size='100' variant='muted'>
                        @{person.alternateName}
                      </Text>
                    </div>
                  </div>

                  <Text as='p' size='200' variant='muted'>
                    {person.position}
                  </Text>

                  <div className={styles.contributorAction}>
                    <Link
                      arrowDirection='end'
                      href={person.socials.github ?? Organization.socials.github}
                      rel='noopener noreferrer'
                      target='_blank'
                      variant='accent'
                    >
                      GitHub profile
                    </Link>
                  </div>
                </div>
              </Box>
            </Grid.Column>
          ))}

          <Grid.Column span={{ xsmall: 12, medium: 6, large: 4 }}>
            <Box
              backgroundColor='default'
              borderColor='subtle'
              borderRadius='large'
              borderStyle='solid'
              borderWidth='thin'
              className={styles.contributorCard}
              padding='normal'
            >
              <div className={styles.contributorStack}>
                <div className={styles.contributorIdentity}>
                  <GitHubIcon aria-hidden='true' height={36} width={36} />
                  <div className={styles.contributorText}>
                    <Heading as='h3' size='6'>
                      Open-Source Contributors
                    </Heading>
                    <Text as='p' font='monospace' size='100' variant='muted'>
                      github.com/GraphicalPlayground
                    </Text>
                  </div>
                </div>

                <Text as='p' size='200' variant='muted'>
                  Contribute C++23 engine code, lessons, or translations across our public repositories.
                </Text>

                <div className={styles.contributorAction}>
                  <Link
                    arrowDirection='end'
                    href={CONTRIBUTING_GUIDE_URL}
                    rel='noopener noreferrer'
                    target='_blank'
                    variant='accent'
                  >
                    Read CONTRIBUTING.md
                  </Link>
                </div>
              </div>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>

      <Section
        fullWidth
        backgroundColor='default'
        id='sponsors-faq'
        paddingBlockEnd='normal'
        paddingBlockStart='normal'
      >
        <Grid>
          <Grid.Column span={12}>
            <FAQ variant='default'>
              <FAQ.Heading align='center' as='h2' size='3'>
                Sponsorship questions
              </FAQ.Heading>
              {SPONSORS_FAQ_ITEMS.map((item) => (
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
              description='Answers about preferred Graphical Playground sponsorship channels, active sponsor status, email inquiries, donor credit in DONORS.md, and code contributions.'
              items={SPONSORS_FAQ_ITEMS}
              name='Sponsorship Frequently Asked Questions'
              path='/sponsors'
            />
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='subtle' paddingBlockEnd='spacious' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <CTABanner hasBorder align='center' backgroundColor='default' variant='default'>
              <CTABanner.Heading as='h2'>Support hardware-free graphics education</CTABanner.Heading>
              <CTABanner.Description>
                Back Graphical Playground on GitHub Sponsors or Direct Donation, or email {Organization.emails.sponsor}{' '}
                to talk through a sponsorship first.
              </CTABanner.Description>
              <CTABanner.ButtonGroup>
                <Button as='a' href={GITHUB_SPONSORS_URL} rel='noopener noreferrer' target='_blank' variant='primary'>
                  Sponsor on GitHub
                </Button>
                <Button as='a' href={DONATE_ROUTE} variant='secondary'>
                  Make a direct donation
                </Button>
              </CTABanner.ButtonGroup>
            </CTABanner>
          </Grid.Column>
        </Grid>
      </Section>
    </>
  );
};

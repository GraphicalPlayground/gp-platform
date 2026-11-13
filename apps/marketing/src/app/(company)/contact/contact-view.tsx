// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { Organization } from '@gp/constants';
import type { FaqEntry } from '@gp/content';
import type { BreadcrumbItem } from '@gp/seo/jsonld';
import { BreadcrumbJsonLd, FaqJsonLd } from '@gp/seo/react';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CTABanner,
  DiscordIcon,
  EyebrowText,
  FAQ,
  GitHubIcon,
  Grid,
  Heading,
  Hero,
  Link,
  LinkedInIcon,
  Pillar,
  Section,
  SectionIntro,
  Text,
  Tiles,
  Token,
  UnorderedList
} from '@gp/ui/components';
import type { IconColor } from '@gp/ui/components';
import {
  AccessibilityIcon,
  AlertIcon,
  BriefcaseIcon,
  CommentDiscussionIcon,
  CommentIcon,
  CreditCardIcon,
  HeartIcon,
  LawIcon,
  LockIcon,
  MailIcon,
  MegaphoneIcon,
  PaperAirplaneIcon,
  PeopleIcon,
  ShieldLockIcon
} from '@primer/octicons-react';
import type { Icon } from '@primer/octicons-react';
import { useDitherBackground } from '@/components/home/visuals';
import { ContactFloatingMail } from './contact-floating-mail';
import styles from './contact.module.css';

const CONTACT_BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Contact Us', path: '/contact' }
];

interface SocialChannel {
  readonly id: 'linkedin' | 'discord' | 'github';
  readonly name: string;
  readonly href: string;
  readonly displayUrl: string;
  readonly summary: string;
  readonly linkLabel: string;
}

const SOCIAL_CHANNELS: readonly SocialChannel[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: Organization.socials.linkedin,
    displayUrl: 'linkedin.com/company/graphical-playground',
    summary: 'Follow company milestones, academic outreach, curriculum announcements, and team updates.',
    linkLabel: 'Follow on LinkedIn'
  },
  {
    id: 'discord',
    name: 'Discord',
    href: Organization.socials.discord,
    displayUrl: 'discord.graphical-playground.com',
    summary: 'Join live discussions with engineers and learners on shaders, C++23 engine architecture, and setup help.',
    linkLabel: 'Join the Discord server'
  },
  {
    id: 'github',
    name: 'GitHub',
    href: Organization.socials.github,
    displayUrl: 'github.com/GraphicalPlayground',
    summary:
      'Browse open-source repositories, report bugs, track roadmaps, or open pull requests across gp-engine and gp-platform.',
    linkLabel: 'Explore GitHub repositories'
  }
];

function renderSocialIcon(id: SocialChannel['id']) {
  switch (id) {
    case 'linkedin':
      return <LinkedInIcon />;
    case 'discord':
      return <DiscordIcon />;
    case 'github':
      return <GitHubIcon />;
  }
}

interface EmailChannel {
  readonly key:
    | 'contact'
    | 'support'
    | 'feedback'
    | 'billing'
    | 'partnerships'
    | 'sponsor'
    | 'press'
    | 'marketing'
    | 'careers'
    | 'security'
    | 'privacy'
    | 'legal'
    | 'accessibility'
    | 'abuse';
  readonly title: string;
  readonly badge: string;
  readonly description: string;
  readonly icon: Icon;
  readonly color: IconColor;
}

interface EmailDirectoryGroup {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly items: readonly EmailChannel[];
}

const EMAIL_DIRECTORY_GROUPS: readonly EmailDirectoryGroup[] = [
  {
    id: 'general-and-support',
    title: 'General & Learner Support',
    subtitle: 'Questions about your account, learning workspaces, billing, or product feedback.',
    items: [
      {
        key: 'contact',
        title: 'Contact',
        badge: 'General',
        description: 'General inquiries, introductions, and questions that do not belong to a specialized desk.',
        icon: MailIcon,
        color: 'green'
      },
      {
        key: 'support',
        title: 'Support',
        badge: 'Help Desk',
        description: 'Technical support for cloud rendering sessions, local engine server setup, and account access.',
        icon: CommentDiscussionIcon,
        color: 'blue'
      },
      {
        key: 'feedback',
        title: 'Feedback',
        badge: 'Product',
        description: 'Suggestions for new curriculum topics, interactive visualizers, or platform usability.',
        icon: CommentIcon,
        color: 'teal'
      },
      {
        key: 'billing',
        title: 'Billing',
        badge: 'Subscriptions',
        description: 'Invoices, subscription changes, receipts, and refund requests under our billing terms.',
        icon: CreditCardIcon,
        color: 'indigo'
      }
    ]
  },
  {
    id: 'community-and-growth',
    title: 'Partnerships, Press & Careers',
    subtitle: 'Academic institutions, industry advisors, sponsorships, media, and joining the team.',
    items: [
      {
        key: 'partnerships',
        title: 'Partnerships',
        badge: 'Collaborations',
        description: 'Universities, engineering schools, studios, and curriculum advisory collaborations.',
        icon: PeopleIcon,
        color: 'green'
      },
      {
        key: 'sponsor',
        title: 'Sponsor',
        badge: 'Sponsorships',
        description:
          'Infrastructure grants, project sponsorships, and institutional backing for open graphics education.',
        icon: HeartIcon,
        color: 'pink'
      },
      {
        key: 'press',
        title: 'Press',
        badge: 'Media',
        description: 'Journalist inquiries, interviews, official logos, and press kit verification.',
        icon: PaperAirplaneIcon,
        color: 'blue'
      },
      {
        key: 'marketing',
        title: 'Marketing',
        badge: 'Outreach',
        description: 'Conference talks, community spotlights, newsletters, and co-marketing initiatives.',
        icon: MegaphoneIcon,
        color: 'orange'
      },
      {
        key: 'careers',
        title: 'Careers',
        badge: 'Team',
        description: 'Open roles, internships, research collaborations, and contributing with the core team.',
        icon: BriefcaseIcon,
        color: 'purple'
      }
    ]
  },
  {
    id: 'trust-and-compliance',
    title: 'Security, Privacy, Legal & Safety',
    subtitle: 'Vulnerability disclosure, GDPR data rights, legal notices, accessibility, and abuse reports.',
    items: [
      {
        key: 'security',
        title: 'Security',
        badge: 'Disclosure',
        description: 'Coordinated vulnerability reports for platform services, containers, and PGP key requests.',
        icon: ShieldLockIcon,
        color: 'red'
      },
      {
        key: 'privacy',
        title: 'Privacy',
        badge: 'GDPR',
        description: 'Personal data access, correction, portability, and deletion requests under GDPR.',
        icon: LockIcon,
        color: 'indigo'
      },
      {
        key: 'legal',
        title: 'Legal',
        badge: 'Compliance',
        description: 'Terms of service, licensing, Data Processing Addenda, copyright notices, and formal requests.',
        icon: LawIcon,
        color: 'gray'
      },
      {
        key: 'accessibility',
        title: 'Accessibility',
        badge: 'WCAG / RGAA',
        description: 'Reporting accessibility barriers or requesting content in an accessible alternative format.',
        icon: AccessibilityIcon,
        color: 'teal'
      },
      {
        key: 'abuse',
        title: 'Abuse',
        badge: 'Trust & Safety',
        description: 'Reporting Acceptable Use Policy violations, spam, harassment, or platform misuse.',
        icon: AlertIcon,
        color: 'coral'
      }
    ]
  }
];

const CONTACT_FAQ_ITEMS: FaqEntry[] = [
  {
    question: 'Which channel is fastest for technical help or graphics questions?',
    answer: `For engine questions, shader debugging, and community help, join our engineering Discord at ${Organization.socials.discord}. For account-specific issues or cloud container troubleshooting, email ${Organization.emails.support}.`
  },
  {
    question: 'How should I report a security vulnerability or privacy request?',
    answer: `Send suspected security vulnerabilities to ${Organization.emails.security} rather than opening a public GitHub issue (see our Security page for safe harbor terms). For GDPR access, deletion, or privacy inquiries, write to ${Organization.emails.privacy}.`
  },
  {
    question: 'Can I contact Graphical Playground by postal mail?',
    answer: `Yes. Graphical Playground can receive physical correspondence care of EPITECH Lyon at ${Organization.address.line1}, ${Organization.address.postalCode} ${Organization.address.city}, France. Include "c/o EPITECH Lyon" on the envelope so campus reception routes your letter to our team.`
  },
  {
    question: 'What if I am unsure which email address to choose?',
    answer: `Send your message to ${Organization.emails.contact} and we will route it to the right maintainers or team members.`
  }
];

export interface ContactViewProps {
  title: string;
}

/**
 * @brief Client view for the Graphical Playground Contact page.
 */
export const ContactView: React.FC<ContactViewProps> = ({ title }) => {
  const { containerRef: heroDitherRef, DitherBackground: HeroDitherBackground } = useDitherBackground({
    dotOpacity: 0.28,
    interactiveCursor: false,
    maskMode: 'top-fade',
    palette: 'blue-yellow',
    transparentBackground: true,
    type: 'wave'
  });

  return (
    <>
      <div ref={heroDitherRef} className={styles.heroBannerFrame}>
        <ContactFloatingMail />
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
                {CONTACT_BREADCRUMBS.map((item, index) => (
                  <Breadcrumbs.Item
                    key={item.path}
                    href={item.path}
                    {...(index === CONTACT_BREADCRUMBS.length - 1 && { selected: true })}
                  >
                    {item.name}
                  </Breadcrumbs.Item>
                ))}
              </Breadcrumbs>
              <BreadcrumbJsonLd items={CONTACT_BREADCRUMBS} />
            </Grid.Column>

            <Grid.Column span={12}>
              <Hero align='center' className={styles.heroRoot}>
                <Hero.Label>Company · Contact</Hero.Label>
                <Hero.Heading size='2'>{title}</Hero.Heading>
                <Hero.Description size='300'>
                  Reach the {Organization.displayName} team in Lyon through 14 dedicated email inboxes, community
                  platforms on Discord, GitHub, and LinkedIn, or postal correspondence c/o EPITECH Lyon.
                </Hero.Description>
                <Hero.ButtonGroup>
                  <Button as='a' href={Organization.mailto('contact')} variant='primary'>
                    Email {Organization.emails.contact}
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
                </Hero.ButtonGroup>
              </Hero>
            </Grid.Column>
          </Grid>
        </Section>
        <HeroDitherBackground />
      </div>

      <Section fullWidth backgroundColor='default' id='socials' paddingBlockEnd='normal' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Socials &amp; Community</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                Connect with us online
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Follow project milestones on LinkedIn, discuss rendering and shaders in real time on Discord, or inspect
                source code and open issues on GitHub.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          <Grid.Column className={styles.tilesRow} span={12}>
            <Tiles variant='gridlines'>
              {SOCIAL_CHANNELS.map((channel) => (
                <Tiles.Item key={channel.id} href={channel.href} name={channel.name}>
                  {renderSocialIcon(channel.id)}
                </Tiles.Item>
              ))}
            </Tiles>
          </Grid.Column>

          {SOCIAL_CHANNELS.map((channel) => (
            <Grid.Column key={channel.id} span={{ xsmall: 12, medium: 4 }}>
              <Pillar fullWidth>
                <Pillar.Heading as='h3'>{channel.name}</Pillar.Heading>
                <Pillar.Description>
                  {channel.summary} ({channel.displayUrl})
                </Pillar.Description>
                <Pillar.Link isExternal href={channel.href} rel='noopener noreferrer' target='_blank'>
                  {channel.linkLabel}
                </Pillar.Link>
              </Pillar>
            </Grid.Column>
          ))}
        </Grid>
      </Section>

      <Section
        fullWidth
        backgroundColor='subtle'
        id='email-directory'
        paddingBlockEnd='normal'
        paddingBlockStart='normal'
      >
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Direct Email Directory</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                14 dedicated team inboxes
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Pick the address closest to your inquiry so it goes straight to the right contributors.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          <Grid.Column span={12}>
            <div className={styles.directoryGroups}>
              {EMAIL_DIRECTORY_GROUPS.map((group) => (
                <section key={group.id} aria-labelledby={`contact-group-${group.id}`} className={styles.directoryGroup}>
                  <div className={styles.directoryGroupHeader}>
                    <Heading as='h3' id={`contact-group-${group.id}`} size='5'>
                      {group.title}
                    </Heading>
                    <Text as='p' size='200' variant='muted'>
                      {group.subtitle}
                    </Text>
                  </div>

                  <Grid>
                    {group.items.map((item) => {
                      const email = Organization.emails[item.key];
                      const mailto = Organization.mailto(item.key);

                      return (
                        <Grid.Column key={item.key} span={{ xsmall: 12, medium: 6, large: 4 }}>
                          <Card fullWidth hasBorder backgroundColor='default' ctaText={email} href={mailto}>
                            <Card.Icon hasBackground color={item.color} icon={item.icon} />
                            <Card.Label variant='token'>{item.badge}</Card.Label>
                            <Card.Heading as='h4'>{item.title}</Card.Heading>
                            <Card.Description>{item.description}</Card.Description>
                          </Card>
                        </Grid.Column>
                      );
                    })}
                  </Grid>
                </section>
              ))}
            </div>
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='default' id='postal-mail' paddingBlockEnd='normal' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Postal Mail · Courrier</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                Write to us via EPITECH Lyon
              </SectionIntro.Heading>
              <SectionIntro.Description>
                {Organization.displayName} began as an EPITECH Innovative Project (EIP). Formal notices and physical
                correspondence can be sent by postal mail care of EPITECH Lyon.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          <Grid.Column span={{ xsmall: 12, medium: 6 }}>
            <Box
              backgroundColor='subtle'
              borderColor='subtle'
              borderRadius='large'
              borderStyle='solid'
              borderWidth='thin'
              className={styles.postalCard}
              padding='normal'
            >
              <div className={styles.postalStack}>
                <EyebrowText variant='accent'>Official Mailing Address</EyebrowText>
                <Heading as='h3' size='5'>
                  {Organization.displayName} — c/o EPITECH Lyon
                </Heading>

                <address className={styles.addressBlock}>
                  <Text as='div' size='200' weight='semibold'>
                    {Organization.displayName}
                  </Text>
                  <Text as='div' size='200'>
                    c/o EPITECH Lyon
                  </Text>
                  <Text as='div' size='200'>
                    {Organization.address.line1}
                  </Text>
                  <Text as='div' size='200'>
                    {Organization.address.postalCode} {Organization.address.city}, {Organization.address.state}
                  </Text>
                  <Text as='div' size='200'>
                    France
                  </Text>
                </address>

                <div className={styles.tokenRow}>
                  <Token variant='outline'>Lyon, France</Token>
                  <Token variant='outline'>EPITECH Lyon Campus</Token>
                </div>
              </div>
            </Box>
          </Grid.Column>

          <Grid.Column span={{ xsmall: 12, medium: 6 }}>
            <Box
              backgroundColor='subtle'
              borderColor='subtle'
              borderRadius='large'
              borderStyle='solid'
              borderWidth='thin'
              className={styles.postalCard}
              padding='normal'
            >
              <div className={styles.postalGuidelines}>
                <EyebrowText variant='muted'>Routing Guidelines</EyebrowText>
                <Heading as='h3' size='5'>
                  How to format postal correspondence
                </Heading>

                <UnorderedList variant='default'>
                  <UnorderedList.Item>
                    Include <strong>c/o EPITECH Lyon</strong> on the second address line so campus reception routes the
                    letter to the {Organization.displayName} team.
                  </UnorderedList.Item>
                  <UnorderedList.Item>
                    Specify the relevant contact desk (such as Legal, Privacy, or Partnerships) in your letter or on the
                    envelope.
                  </UnorderedList.Item>
                  <UnorderedList.Item>
                    For time-sensitive legal, GDPR, or security matters, also email{' '}
                    <strong>{Organization.emails.legal}</strong>, <strong>{Organization.emails.privacy}</strong>, or{' '}
                    <strong>{Organization.emails.security}</strong>.
                  </UnorderedList.Item>
                </UnorderedList>

                <div className={styles.postalActionLink}>
                  <Link arrowDirection='end' href='/legal' variant='accent'>
                    View legal notices and policies
                  </Link>
                </div>
              </div>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='subtle' id='contact-faq' paddingBlockEnd='normal' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <FAQ variant='default'>
              <FAQ.Heading align='center' as='h2' size='3'>
                Frequently asked contact questions
              </FAQ.Heading>
              {CONTACT_FAQ_ITEMS.map((item) => (
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
              description='Answers on choosing the right Graphical Playground email inbox, Discord and GitHub channels, and postal mail c/o EPITECH Lyon.'
              items={CONTACT_FAQ_ITEMS}
              name='Contact Frequently Asked Questions'
              path='/contact'
            />
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='default' paddingBlockEnd='spacious' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <CTABanner hasBorder align='center' backgroundColor='subtle' variant='default'>
              <CTABanner.Heading as='h2'>Not sure where to start?</CTABanner.Heading>
              <CTABanner.Description>
                Write to {Organization.emails.contact} or explore our full FAQ and legal documentation.
              </CTABanner.Description>
              <CTABanner.ButtonGroup>
                <Button as='a' href={Organization.mailto('contact')} variant='primary'>
                  Email {Organization.emails.contact}
                </Button>
                <Button as='a' href='/faq' variant='secondary'>
                  Browse full FAQ
                </Button>
              </CTABanner.ButtonGroup>
            </CTABanner>
          </Grid.Column>
        </Grid>
      </Section>
    </>
  );
};

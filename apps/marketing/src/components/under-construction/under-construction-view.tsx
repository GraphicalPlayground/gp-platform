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
  BrandIcon,
  Breadcrumbs,
  Button,
  Card,
  EyebrowText,
  Grid,
  Hero,
  InlineCode,
  Label,
  Link,
  Section,
  SectionIntro,
  Stack,
  Text,
  Timeline,
  Token
} from '@gp/ui/components';
import type { IconColor } from '@gp/ui/components';
import {
  ArrowRightIcon,
  BookIcon,
  CommentDiscussionIcon,
  LinkExternalIcon,
  MailIcon,
  MarkGithubIcon,
  MilestoneIcon,
  ShieldLockIcon,
  ToolsIcon,
  TypographyIcon
} from '@primer/octicons-react';
import type { Icon } from '@primer/octicons-react';
import styles from './under-construction.module.css';

export type UnderConstructionIconName =
  'breakdowns' | 'discord' | 'docs' | 'github' | 'glossary' | 'legal' | 'roadmaps';

export interface UnderConstructionAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface UnderConstructionDestination {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaText?: string;
  color?: IconColor;
  icon?: UnderConstructionIconName;
}

export interface UnderConstructionScopeItem {
  label: string;
  detail: string;
}

export interface UnderConstructionViewProps {
  title: string;
  description?: string;
  section?: string;
  route?: string;
  parent?: {
    label: string;
    href: string;
  };
  scope?: Array<string | UnderConstructionScopeItem>;
  statusLabel?: string;
  statusToken?: string;
  primaryAction?: UnderConstructionAction;
  secondaryAction?: UnderConstructionAction;
  manifestLink?: UnderConstructionAction;
  destinations?: UnderConstructionDestination[];
}

const DESTINATION_ICONS: Record<UnderConstructionIconName, Icon> = {
  breakdowns: ToolsIcon,
  discord: CommentDiscussionIcon,
  docs: BookIcon,
  github: MarkGithubIcon,
  glossary: TypographyIcon,
  legal: ShieldLockIcon,
  roadmaps: MilestoneIcon
};

const DEFAULT_SCOPE: Array<string | UnderConstructionScopeItem> = [
  'Page structure and technical documentation',
  'Responsive layout and accessibility verification',
  'Cross-links to related Graphical Playground resources'
];

const DEFAULT_PRIMARY_ACTION: UnderConstructionAction = {
  href: '/breakdowns',
  label: 'Explore breakdowns'
};

const DEFAULT_SECONDARY_ACTION: UnderConstructionAction = {
  external: true,
  href: Organization.socials.github,
  label: 'View GitHub organization'
};

const DEFAULT_MANIFEST_LINK: UnderConstructionAction = {
  href: '/roadmaps',
  label: 'Roadmaps'
};

const DEFAULT_DESTINATIONS: UnderConstructionDestination[] = [
  {
    color: 'green',
    ctaText: 'Read breakdowns',
    description:
      'In-depth engineering write-ups covering engine directory layouts, memory allocators, and rendering systems.',
    eyebrow: 'Engineering',
    href: '/breakdowns',
    icon: 'breakdowns',
    title: 'Technical Breakdowns'
  },
  {
    color: 'blue',
    ctaText: 'Browse glossary',
    description:
      'Reference definitions for shaders, GPU pipeline stages, culling techniques, and engine math concepts.',
    eyebrow: 'Reference',
    href: '/glossary',
    icon: 'glossary',
    title: 'Graphics Glossary'
  },
  {
    color: 'indigo',
    ctaText: 'View repositories',
    description: 'Follow active commits across gp-engine, gp-platform, gp-handbook, and our open build infrastructure.',
    eyebrow: 'Open Source',
    href: Organization.socials.github,
    icon: 'github',
    title: 'GitHub Organization'
  }
];

const isHttpUrl = (href: string): boolean => /^https?:\/\//i.test(href);

const getExternalAttrs = (action: UnderConstructionAction) =>
  isHttpUrl(action.href) ? ({ rel: 'noopener noreferrer', target: '_blank' } as const) : {};

const getActionVisual = (action: UnderConstructionAction) => {
  if (action.href.startsWith('mailto:')) {
    return MailIcon;
  }

  if (action.external || isHttpUrl(action.href)) {
    return LinkExternalIcon;
  }

  return ArrowRightIcon;
};

/**
 * @brief Client view for pages gated behind an active development construction wall.
 */
export const UnderConstructionView: React.FC<UnderConstructionViewProps> = ({
  description,
  destinations = DEFAULT_DESTINATIONS,
  manifestLink = DEFAULT_MANIFEST_LINK,
  parent,
  primaryAction = DEFAULT_PRIMARY_ACTION,
  route,
  scope,
  secondaryAction = DEFAULT_SECONDARY_ACTION,
  section,
  statusLabel = 'Under construction',
  statusToken = 'WIP',
  title
}) => {
  const resolvedDescription =
    description ??
    `The ${title} page is currently in active development. Core engineering material and source repositories remain available while this section is finalized.`;
  const resolvedScope = scope && scope.length > 0 ? scope : DEFAULT_SCOPE;
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    ...(parent ? [{ name: parent.label, path: parent.href }] : []),
    { name: title, path: route ?? '#' }
  ];
  const jsonLdBreadcrumbs = breadcrumbItems.filter((item) => item.path.startsWith('/'));

  return (
    <>
      <Section
        fullWidth
        backgroundColor='subtle'
        className={styles.headerSection}
        paddingBlockEnd={{ narrow: 'normal', regular: 'normal' }}
        paddingBlockStart={{ narrow: 'condensed', regular: 'normal' }}
      >
        <Grid className={styles.headerGrid}>
          <Grid.Column span={12}>
            <Breadcrumbs>
              {breadcrumbItems.map((item, index) => (
                <Breadcrumbs.Item
                  key={`${item.path}-${index}`}
                  href={item.path}
                  {...(index === breadcrumbItems.length - 1 && { selected: true })}
                >
                  {item.name}
                </Breadcrumbs.Item>
              ))}
            </Breadcrumbs>
            {jsonLdBreadcrumbs.length > 0 ? <BreadcrumbJsonLd items={jsonLdBreadcrumbs} /> : null}
          </Grid.Column>

          <Grid.Column className={styles.introColumn} span={{ xsmall: 12, large: 7 }}>
            <Stack
              alignItems='center'
              className={styles.statusRow}
              direction='horizontal'
              flexWrap='wrap'
              gap={12}
              padding='none'
            >
              <Label className={styles.statusLabel} color='orange' leadingVisual={ToolsIcon} size='medium'>
                {statusLabel}
              </Label>
              {section ? <EyebrowText variant='muted'>{section}</EyebrowText> : null}
              {route ? (
                <InlineCode className={styles.routeCode} wrap={false}>
                  {route}
                </InlineCode>
              ) : null}
            </Stack>

            <Hero className={styles.hero}>
              <Hero.Heading size='2'>{title}</Hero.Heading>
              <Hero.Description size='300'>{resolvedDescription}</Hero.Description>
              <Hero.ButtonGroup>
                <Button
                  as='a'
                  href={primaryAction.href}
                  trailingVisual={getActionVisual(primaryAction)}
                  variant='primary'
                  {...getExternalAttrs(primaryAction)}
                >
                  {primaryAction.label}
                </Button>
                <Button
                  as='a'
                  href={secondaryAction.href}
                  trailingVisual={getActionVisual(secondaryAction)}
                  variant='secondary'
                  {...getExternalAttrs(secondaryAction)}
                >
                  {secondaryAction.label}
                </Button>
              </Hero.ButtonGroup>
            </Hero>
          </Grid.Column>

          <Grid.Column className={styles.manifestColumn} span={{ xsmall: 12, large: 5 }}>
            <Box
              backgroundColor='default'
              borderColor='subtle'
              borderRadius='large'
              borderStyle='solid'
              borderWidth='thin'
              className={styles.manifestCard}
              padding='none'
            >
              <div className={styles.manifestHeader}>
                <div className={styles.manifestTitleRow}>
                  <BrandIcon aria-hidden='true' fill='currentColor' height={18} variant='icon' />
                  <EyebrowText variant='default'>Planned on this page</EyebrowText>
                </div>
                <Token variant='outline'>{statusToken}</Token>
              </div>

              <div className={styles.manifestBody}>
                <Timeline fullWidth>
                  {resolvedScope.map((item, index) => (
                    <Timeline.Item key={typeof item === 'string' ? item : `${item.label}-${index}`}>
                      {typeof item === 'string' ? (
                        item
                      ) : (
                        <>
                          <b>{item.label}:</b> {item.detail}
                        </>
                      )}
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>

              <div className={styles.manifestFooter}>
                <Text as='span' font='monospace' size='100' variant='muted'>
                  Active development · {Organization.shortName}
                </Text>
                <Link
                  arrowDirection={isHttpUrl(manifestLink.href) ? 'none' : 'end'}
                  href={manifestLink.href}
                  isExternal='auto'
                  size='small'
                  variant='accent'
                  {...getExternalAttrs(manifestLink)}
                >
                  {manifestLink.label}
                </Link>
              </div>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>

      <Section
        fullWidth
        backgroundColor='default'
        paddingBlockEnd={{ narrow: 'normal', regular: 'spacious' }}
        paddingBlockStart={{ narrow: 'normal', regular: 'normal' }}
      >
        <Grid className={styles.destinationsGrid}>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start' className={styles.sectionIntro}>
              <SectionIntro.Label>Available now</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='4'>
                Continue exploring {Organization.displayName}
              </SectionIntro.Heading>
              <SectionIntro.Description>
                While this route is being built, published engineering guides, glossary entries, and source code remain
                open to browse.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          {destinations.map((destination) => {
            const IconComponent = DESTINATION_ICONS[destination.icon ?? 'breakdowns'];

            return (
              <Grid.Column key={destination.href} span={{ xsmall: 12, large: 4 }}>
                <Card
                  fullWidth
                  hasBorder
                  className={styles.destinationCard}
                  ctaText={destination.ctaText ?? 'Explore'}
                  href={destination.href}
                  variant='default'
                >
                  <Card.Icon
                    hasBackground
                    className={styles.destinationCardIcon}
                    color={destination.color ?? 'green'}
                    icon={IconComponent}
                  />
                  <Card.Label className={styles.destinationCardLabel} variant='accent-text'>
                    {destination.eyebrow}
                  </Card.Label>
                  <Card.Heading as='h3'>{destination.title}</Card.Heading>
                  <Card.Description>{destination.description}</Card.Description>
                </Card>
              </Grid.Column>
            );
          })}
        </Grid>
      </Section>
    </>
  );
};

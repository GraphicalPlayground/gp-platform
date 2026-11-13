// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
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
import {
  AlertIcon,
  ArrowRightIcon,
  BookIcon,
  CommentDiscussionIcon,
  LinkExternalIcon,
  LockIcon,
  MailIcon,
  MarkGithubIcon,
  PulseIcon,
  QuestionIcon,
  RepoIcon,
  SearchIcon,
  ShieldLockIcon,
  SyncIcon,
  ToolsIcon,
  TypographyIcon
} from '@primer/octicons-react';
import type { Icon as Octicon } from '@primer/octicons-react';
import type {
  RouteStateAction,
  RouteStateBreadcrumb,
  RouteStateDestination,
  RouteStateIconName,
  RouteStateLabelTone,
  RouteStateLinkAction
} from './route-state.presets';
import styles from './route-state.module.css';

export interface RouteStatePanel {
  heading: string;
  token: string;
  items: React.ReactNode[];
  footerText: string;
  footerLink: RouteStateLinkAction;
}

export interface RouteStateDestinationsSection {
  label: string;
  heading: string;
  description: string;
  items: RouteStateDestination[];
}

export interface RouteStateViewProps {
  breadcrumbs?: RouteStateBreadcrumb[];
  statusLabel: string;
  statusTone: RouteStateLabelTone;
  statusIcon: RouteStateIconName;
  statusCode: string;
  showPathname?: boolean;
  diagnosticBadge?: string;
  title: string;
  description: string;
  primaryAction: RouteStateAction;
  secondaryAction?: RouteStateAction;
  panel: RouteStatePanel;
  destinations?: RouteStateDestinationsSection;
}

const ICONS: Record<RouteStateIconName, Octicon> = {
  'alert': AlertIcon,
  'book': BookIcon,
  'breakdowns': ToolsIcon,
  'discord': CommentDiscussionIcon,
  'faq': QuestionIcon,
  'github': MarkGithubIcon,
  'glossary': TypographyIcon,
  'guides': RepoIcon,
  'legal': ShieldLockIcon,
  'lock': LockIcon,
  'search': SearchIcon,
  'shield-lock': ShieldLockIcon,
  'status': PulseIcon
};

const LABEL_TONE_CLASSES: Record<RouteStateLabelTone, string> = {
  blue: styles.statusLabelBlue,
  green: styles.statusLabelGreen,
  orange: styles.statusLabelOrange,
  purple: styles.statusLabelPurple,
  red: styles.statusLabelRed
};

const isHttpUrl = (href: string): boolean => /^https?:\/\//i.test(href);

const getExternalAttrs = (action: RouteStateLinkAction) =>
  action.external || isHttpUrl(action.href) ? ({ rel: 'noopener noreferrer', target: '_blank' } as const) : {};

const getLinkActionVisual = (action: RouteStateLinkAction) => {
  if (action.href.startsWith('mailto:')) {
    return MailIcon;
  }

  if (action.external || isHttpUrl(action.href)) {
    return LinkExternalIcon;
  }

  return ArrowRightIcon;
};

const renderActionButton = (action: RouteStateAction, variant: 'primary' | 'secondary') => {
  if (action.kind === 'button') {
    const ButtonIcon = action.icon === 'arrow' ? ArrowRightIcon : SyncIcon;

    return (
      <Button
        leadingVisual={action.icon === 'arrow' ? undefined : ButtonIcon}
        trailingVisual={action.icon === 'arrow' ? ButtonIcon : undefined}
        type='button'
        variant={variant}
        onClick={action.onClick}
      >
        {action.label}
      </Button>
    );
  }

  return (
    <Button
      as='a'
      href={action.href}
      trailingVisual={getLinkActionVisual(action)}
      variant={variant}
      {...getExternalAttrs(action)}
    >
      {action.label}
    </Button>
  );
};

/**
 * @brief Shared two-band layout for HTTP status, error, and access-control screens built with `@gp/ui` components.
 */
export const RouteStateView: React.FC<RouteStateViewProps> = ({
  breadcrumbs,
  description,
  destinations,
  diagnosticBadge,
  panel,
  primaryAction,
  secondaryAction,
  showPathname = false,
  statusCode,
  statusIcon,
  statusLabel,
  statusTone,
  title
}) => {
  const pathname = usePathname();
  const StatusIcon = ICONS[statusIcon];
  const visiblePathname = showPathname && pathname && pathname !== '/' ? pathname : null;

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
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <Grid.Column span={12}>
              <Breadcrumbs>
                {breadcrumbs.map((item, index) => (
                  <Breadcrumbs.Item
                    key={`${item.href}-${index}`}
                    href={item.href}
                    {...(index === breadcrumbs.length - 1 && { selected: true })}
                  >
                    {item.label}
                  </Breadcrumbs.Item>
                ))}
              </Breadcrumbs>
            </Grid.Column>
          ) : null}

          <Grid.Column className={styles.introColumn} span={{ xsmall: 12, large: 7 }}>
            <Stack
              alignItems='center'
              className={styles.statusRow}
              direction='horizontal'
              flexWrap='wrap'
              gap={12}
              padding='none'
            >
              <Label
                className={LABEL_TONE_CLASSES[statusTone]}
                color={statusTone}
                leadingVisual={StatusIcon}
                size='medium'
              >
                {statusLabel}
              </Label>
              <EyebrowText variant='muted'>{statusCode}</EyebrowText>
              {visiblePathname ? (
                <InlineCode className={styles.routeCode} wrap={false}>
                  {visiblePathname}
                </InlineCode>
              ) : null}
              {diagnosticBadge ? (
                <InlineCode className={styles.routeCode} wrap={false}>
                  {diagnosticBadge}
                </InlineCode>
              ) : null}
            </Stack>

            <Hero className={styles.hero}>
              <Hero.Heading size='2'>{title}</Hero.Heading>
              <Hero.Description size='300'>{description}</Hero.Description>
              <Hero.ButtonGroup>
                {renderActionButton(primaryAction, 'primary')}
                {secondaryAction ? renderActionButton(secondaryAction, 'secondary') : null}
              </Hero.ButtonGroup>
            </Hero>
          </Grid.Column>

          <Grid.Column className={styles.panelColumn} span={{ xsmall: 12, large: 5 }}>
            <Box className={styles.panelCard} padding='none'>
              <Box className={styles.panelHeader}>
                <Stack
                  alignItems='center'
                  direction='horizontal'
                  flexWrap='wrap'
                  gap={12}
                  justifyContent='space-between'
                  padding='none'
                >
                  <Stack
                    alignItems='center'
                    className={styles.panelTitleIcon}
                    direction='horizontal'
                    gap={8}
                    padding='none'
                  >
                    <BrandIcon aria-hidden='true' fill='currentColor' height={18} variant='icon' />
                    <EyebrowText variant='default'>{panel.heading}</EyebrowText>
                  </Stack>
                  <Token variant='outline'>{panel.token}</Token>
                </Stack>
              </Box>

              <Box className={styles.panelBody}>
                <Timeline fullWidth>
                  {panel.items.map((item, index) => (
                    <Timeline.Item key={index}>{item}</Timeline.Item>
                  ))}
                </Timeline>
              </Box>

              <Box className={styles.panelFooter}>
                <Stack
                  alignItems='center'
                  direction='horizontal'
                  flexWrap='wrap'
                  gap={12}
                  justifyContent='space-between'
                  padding='none'
                >
                  <Text as='span' font='monospace' size='100' variant='muted'>
                    {panel.footerText}
                  </Text>
                  <Link
                    arrowDirection={isHttpUrl(panel.footerLink.href) ? 'none' : 'end'}
                    href={panel.footerLink.href}
                    isExternal='auto'
                    size='small'
                    variant='accent'
                    {...getExternalAttrs(panel.footerLink)}
                  >
                    {panel.footerLink.label}
                  </Link>
                </Stack>
              </Box>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>

      {destinations ? (
        <Section
          fullWidth
          backgroundColor='default'
          paddingBlockEnd={{ narrow: 'normal', regular: 'spacious' }}
          paddingBlockStart={{ narrow: 'normal', regular: 'normal' }}
        >
          <Grid className={styles.destinationsGrid}>
            <Grid.Column span={12}>
              <SectionIntro fullWidth align='start' className={styles.sectionIntro}>
                <SectionIntro.Label>{destinations.label}</SectionIntro.Label>
                <SectionIntro.Heading as='h2' size='4'>
                  {destinations.heading}
                </SectionIntro.Heading>
                <SectionIntro.Description>{destinations.description}</SectionIntro.Description>
              </SectionIntro>
            </Grid.Column>

            {destinations.items.map((destination) => {
              const DestinationIcon = ICONS[destination.icon];

              return (
                <Grid.Column key={destination.href} span={{ xsmall: 12, large: 4 }}>
                  <Card
                    fullWidth
                    hasBorder
                    className={styles.destinationCard}
                    ctaText={destination.ctaText}
                    href={destination.href}
                    variant='default'
                  >
                    <Card.Icon
                      hasBackground
                      className={styles.destinationCardIcon}
                      color={destination.color}
                      icon={DestinationIcon}
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
      ) : null}
    </>
  );
};

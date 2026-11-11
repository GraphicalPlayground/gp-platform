// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Organization } from '@gp/constants';
import {
  Box,
  Button,
  Card,
  CTABanner,
  Grid,
  Hero,
  Icon,
  Link,
  LogoSuite,
  RiverAccordion,
  RiverBreakoutTabs,
  Section,
  SectionIntro,
  SectionIntroStacked,
  SmartLink,
  Stack,
  Statistic,
  Text,
  Token
} from '@gp/ui/components';
import { useReducedMotion } from '@gp/ui/hooks';
import {
  BeakerIcon,
  BookIcon,
  CloudIcon,
  CodeIcon,
  CpuIcon,
  EyeIcon,
  GlobeIcon,
  RepoIcon,
  ServerIcon,
  VerifiedIcon
} from '@primer/octicons-react';
import type { Icon as OcticonIcon } from '@primer/octicons-react';
import { aboutCommunityVisual, aboutCurriculumVisual, aboutEngineVisual, aboutPlaygroundVisual } from '@/app/content';
import { DraftToken } from '@/components/article/components/draft-token';
import { FAQClient } from '@/components/faq';
import {
  ACTIVE_PARTNERS,
  HERO_CURSOR_PHRASES,
  PLATFORM_BARRIERS,
  STUDIO_ACCORDION_ITEMS,
  WORKBENCH_TABS
} from '@/data/home';
import type { HomeBarrierItem, StudioAccordionSpec, WorkbenchTabSpec } from '@/data/home';
import { HeroFloatingShapes } from './hero-floating-shapes';
import {
  CloudSandboxVisual,
  DitherBackdrop,
  EngineModulesVisual,
  ShaderLabVisual,
  StudioBlueprintVisual,
  useDitherBackground
} from './visuals';
import styles from './home.module.css';

export interface FeaturedGlossaryCard {
  readonly difficulty: string;
  readonly draftLabel?: string;
  readonly href: string;
  readonly shortDefinition: string;
  readonly slug: string;
  readonly subtopic: string;
  readonly title: string;
}

export interface HomeViewProps {
  readonly featuredGlossary: readonly FeaturedGlossaryCard[];
  readonly glossaryCount: number;
  readonly subtopicCount: number;
}

const BARRIER_ICONS: Record<HomeBarrierItem['iconName'], OcticonIcon> = {
  cloud: CloudIcon,
  cpu: CpuIcon,
  eye: EyeIcon
};

const WORKBENCH_ICONS: Record<WorkbenchTabSpec['iconName'], OcticonIcon> = {
  beaker: BeakerIcon,
  code: CodeIcon,
  server: ServerIcon
};

const STUDIO_ICONS: Record<StudioAccordionSpec['iconName'], OcticonIcon> = {
  book: BookIcon,
  globe: GlobeIcon,
  repo: RepoIcon,
  verified: VerifiedIcon
};

function useCyclingCursorText(phrases: readonly string[]): string {
  const prefersReducedMotion = useReducedMotion();
  const firstPhrase = phrases[0] ?? 'FROM SCRATCH TO AAA';
  const [displayed, setDisplayed] = useState(firstPhrase);

  useEffect(() => {
    if (prefersReducedMotion || phrases.length <= 1) return;

    let phraseIndex = 0;
    let charCount = firstPhrase.length;
    let phase: 'holding' | 'deleting' | 'typing' = 'holding';
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const schedule = () => {
      if (phase === 'holding') {
        timeoutId = setTimeout(() => {
          phase = 'deleting';
          schedule();
        }, 2100);

        return;
      }

      if (phase === 'deleting') {
        if (charCount > 0) {
          charCount -= 1;
          setDisplayed((phrases[phraseIndex] ?? firstPhrase).slice(0, charCount));
          timeoutId = setTimeout(schedule, 28);
        } else {
          phraseIndex = (phraseIndex + 1) % phrases.length;
          phase = 'typing';
          timeoutId = setTimeout(schedule, 160);
        }

        return;
      }

      const target = phrases[phraseIndex] ?? firstPhrase;

      if (charCount < target.length) {
        charCount += 1;
        setDisplayed(target.slice(0, charCount));
        timeoutId = setTimeout(schedule, 42);
      } else {
        phase = 'holding';
        schedule();
      }
    };

    schedule();

    return () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [firstPhrase, phrases, prefersReducedMotion]);

  return (prefersReducedMotion ? firstPhrase : displayed) || '\u00A0';
}

function renderWorkbenchVisual(id: WorkbenchTabSpec['id']) {
  switch (id) {
    case 'visualizer':
      return <ShaderLabVisual />;
    case 'engine':
      return <EngineModulesVisual />;
    case 'cloud':
      return <CloudSandboxVisual />;
  }
}

/**
 * @brief Client view orchestrating the Gridline Expressive homepage of Graphical Playground.
 */
export const HomeView: React.FC<HomeViewProps> = ({ featuredGlossary, glossaryCount, subtopicCount }) => {
  const hasMultiplePartners = ACTIVE_PARTNERS.length > 1;
  const primaryPartner = ACTIVE_PARTNERS[0];
  const cursorLabelText = useCyclingCursorText(HERO_CURSOR_PHRASES);

  const { containerRef: heroDitherRef, DitherBackground: HeroDitherBackground } = useDitherBackground({
    dotOpacity: 0.78,
    interactiveCursor: false,
    maskMode: 'top-fade',
    palette: 'iridescent',
    transparentBackground: true,
    type: 'wave'
  });

  const stats = [
    {
      value: `${glossaryCount}`,
      label: `Published graphics concepts across ${subtopicCount} topic groups`
    },
    {
      value: 'C++23',
      label: 'Modular engine core with inspectable subsystems and desktop backends'
    },
    {
      value: 'Cloud & Local',
      label: 'Compile and view shaders in the browser or on your own machine'
    }
  ] as const;

  return (
    <div className={styles.pageRoot}>
      {/* Band 1: Centered Typography Hero with Top-to-Bottom Iridescent Dither & Floating Spheres/Shapes */}
      <div ref={heroDitherRef} className={styles.heroBannerFrame}>
        <HeroFloatingShapes />
        <Hero align='center' className={styles.heroRoot} variant='gridline'>
          <Hero.Label className={styles.heroCursorLabel}>{cursorLabelText}</Hero.Label>
          <Hero.Heading size='1'>
            Learn <b>3D graphics</b> by taking an engine apart.
          </Hero.Heading>
          <Hero.Description size='300'>
            Interactive visuals and an open C++23 engine running in your browser.
          </Hero.Description>
          <Hero.ButtonGroup>
            <Button as='a' href='/waitlist' variant='primary'>
              Join the waitlist
            </Button>
            <Button as='a' href='/glossary' variant='secondary'>
              Browse the glossary
            </Button>
          </Hero.ButtonGroup>
        </Hero>
        <HeroDitherBackground />
      </div>

      {/* Band 2: Extensible Partner Bar (currently EPITECH only) */}
      {ACTIVE_PARTNERS.length > 0 ? (
        <LogoSuite hasDivider align='start' className={styles.partnerBar} variant='gridline-expressive'>
          <LogoSuite.Heading as='h2' size='subhead-large'>
            Academic backing
          </LogoSuite.Heading>
          <LogoSuite.Description>
            {hasMultiplePartners
              ? 'Institutions and engineering teams supporting accessible graphics education.'
              : 'Started as an EPITECH Innovative Project (EIP) in Lyon, France.'}
          </LogoSuite.Description>
          <LogoSuite.Logobar marquee={ACTIVE_PARTNERS.length > 4} variant='muted'>
            {hasMultiplePartners ? (
              ACTIVE_PARTNERS.map((partner) => (
                <SmartLink key={partner.id} aria-label={`${partner.name}, ${partner.role}`} href={partner.href}>
                  <img alt={partner.alt} height={30} src={partner.logoSrc} width={121} />
                </SmartLink>
              ))
            ) : primaryPartner ? (
              <div className={styles.partnerSingleRow}>
                <SmartLink aria-label={`${primaryPartner.name}, ${primaryPartner.role}`} href={primaryPartner.href}>
                  <img alt={primaryPartner.alt} height={30} src={primaryPartner.logoSrc} width={121} />
                </SmartLink>
                <div className={styles.partnerMeta}>
                  {primaryPartner.badge ? <Token variant='outline'>{primaryPartner.badge}</Token> : null}
                  <Text as='span' font='monospace' size='100' variant='muted'>
                    {primaryPartner.role}
                    {primaryPartner.location ? ` · ${primaryPartner.location}` : ''}
                  </Text>
                </div>
              </div>
            ) : null}
          </LogoSuite.Logobar>
        </LogoSuite>
      ) : null}

      {/* Band 3: Asymmetric Gridline Split */}
      <Section paddingBlockEnd='normal' paddingBlockStart='normal'>
        <SectionIntroStacked variant='gridline'>
          <SectionIntroStacked.Heading as='h2' size='3'>
            Learn <b>real-time rendering</b> on everyday hardware or cloud GPUs.
          </SectionIntroStacked.Heading>
          <SectionIntroStacked.Description>
            Most graphics tutorials stop right after the first triangle or assume you already own a workstation.
            Graphical Playground connects visual fundamentals directly to studio engine code.
          </SectionIntroStacked.Description>
          <SectionIntroStacked.Link arrowDirection='end' href='/curriculum'>
            Explore the curriculum
          </SectionIntroStacked.Link>
          <SectionIntroStacked.Items>
            {PLATFORM_BARRIERS.map((item) => {
              const BarrierIcon = BARRIER_ICONS[item.iconName];

              return (
                <SectionIntroStacked.Item key={item.id}>
                  <SectionIntroStacked.ItemIcon color={item.color} icon={BarrierIcon} />
                  <SectionIntroStacked.ItemHeading as='h3'>{item.title}</SectionIntroStacked.ItemHeading>
                  <SectionIntroStacked.ItemDescription>{item.description}</SectionIntroStacked.ItemDescription>
                </SectionIntroStacked.Item>
              );
            })}
          </SectionIntroStacked.Items>
        </SectionIntroStacked>
      </Section>

      {/* Band 4: Interactive Discovery Workbench Tabs with WebGL Bayer Wave Backdrop */}
      <Section paddingBlockEnd='normal' paddingBlockStart='none'>
        <RiverBreakoutTabs
          backgroundVisualFullBleed
          backgroundVisual={<DitherBackdrop />}
          className={styles.workbenchTabs}
          imagePosition='block-end'
        >
          <RiverBreakoutTabs.A11yHeading as='h2'>
            Interactive pipeline visualizers, modular engine code, and browser runners
          </RiverBreakoutTabs.A11yHeading>

          {WORKBENCH_TABS.map((tab) => {
            const TabIcon = WORKBENCH_ICONS[tab.iconName];

            return (
              <RiverBreakoutTabs.Item key={tab.id}>
                <RiverBreakoutTabs.Icon color='green' icon={TabIcon} />
                <RiverBreakoutTabs.Heading>{tab.heading}</RiverBreakoutTabs.Heading>
                <RiverBreakoutTabs.Content>
                  <Text>{tab.description}</Text>
                  <Link arrowDirection='end' href={tab.href}>
                    {tab.linkLabel}
                  </Link>
                </RiverBreakoutTabs.Content>
                <RiverBreakoutTabs.Visual>{renderWorkbenchVisual(tab.id)}</RiverBreakoutTabs.Visual>
              </RiverBreakoutTabs.Item>
            );
          })}
        </RiverBreakoutTabs>
      </Section>

      {/* Band 5: Knowledge Base Stats + Featured Glossary Gridline Matrix */}
      {glossaryCount > 0 ? (
        <Section
          fullWidth
          backgroundColor='default'
          className={styles.glossaryBand}
          paddingBlockEnd='normal'
          paddingBlockStart='condensed'
        >
          <Stack direction='vertical' gap='spacious' padding='none'>
            <div className={styles.glossarySectionHeader}>
              <SectionIntro fullWidth align='center'>
                <SectionIntro.Label>OPEN KNOWLEDGE BASE</SectionIntro.Label>
                <SectionIntro.Heading as='h2' size='3'>
                  From <b>coordinate spaces</b> to <b>Gaussian splatting</b>
                </SectionIntro.Heading>
                <SectionIntro.Description>
                  Read clear technical references covering 3D math, frame synchronization, physically based lighting,
                  and modern rendering passes.
                </SectionIntro.Description>
              </SectionIntro>
            </div>

            <div>
              {/* 3-Column Gridline Statistic Row */}
              <Box className={styles.gridFrame}>
                <Box className={styles.gridContent}>
                  <Grid columnGap='none' enableGutters={false} rowGap='none'>
                    {stats.map((stat) => (
                      <Grid.Column key={stat.value} className={styles.gridColumn} span={{ xsmall: 12, large: 4 }}>
                        <Box className={styles.gridItem} padding={{ narrow: 24, wide: 48 }}>
                          <Statistic>
                            <Statistic.Heading className={styles.statValue} font='monospace' size='700' weight='normal'>
                              {stat.value}
                            </Statistic.Heading>
                            <Statistic.Description font='monospace' size='100'>
                              {stat.label}
                            </Statistic.Description>
                          </Statistic>
                        </Box>
                      </Grid.Column>
                    ))}
                  </Grid>
                </Box>
              </Box>

              {/* 6-Card Gridline Featured Glossary Matrix */}
              <Box className={clsx(styles.gridFrame, styles.gridFrameBottomFlush)}>
                <Box className={styles.gridContent}>
                  <Grid columnGap='none' enableGutters={false} rowGap='none'>
                    {featuredGlossary.map((entry) => (
                      <Grid.Column
                        key={entry.slug}
                        className={clsx(styles.gridColumn, styles.gridColumnHover)}
                        span={{ xsmall: 12, large: 4 }}
                      >
                        <Box className={styles.gridItem}>
                          <Card fullWidth ctaText='Read concept' ctaVariant='arrow' href={entry.href}>
                            <Card.Tokens>
                              <Token>{entry.subtopic}</Token>
                              <Token variant='outline'>{entry.difficulty}</Token>
                              <DraftToken label={entry.draftLabel} />
                            </Card.Tokens>
                            <Card.Heading as='h3'>{entry.title}</Card.Heading>
                            <Card.Description>{entry.shortDefinition}</Card.Description>
                          </Card>
                        </Box>
                      </Grid.Column>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </div>

            <div className={styles.glossaryFooterBar}>
              <Text as='span' font='monospace' size='100' variant='muted'>
                Selected entries from the open graphics glossary
              </Text>
              <Link arrowDirection='end' href='/glossary' size='medium' variant='accent'>
                Browse full glossary
              </Link>
            </div>
          </Stack>
        </Section>
      ) : null}

      {/* Band 6: Studio Discipline, Industry Feedback & Planned Portability Accordion */}
      <Section paddingBlockEnd='spacious' paddingBlockStart='condensed'>
        <Stack direction='vertical' gap='spacious' padding='none'>
          <div className={styles.ecosystemIntro}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>BUILT LIKE A STUDIO</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                Open engineering practices from day one
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Repository layout, curriculum research, hardware abstraction boundaries, and project reviews are all
                shared openly alongside the lessons.
              </SectionIntro.Description>
            </SectionIntro>
          </div>

          <RiverAccordion align='start' variant='gridline'>
            {STUDIO_ACCORDION_ITEMS.map((item) => {
              const ItemIcon = STUDIO_ICONS[item.iconName];

              return (
                <RiverAccordion.Item key={item.id}>
                  <RiverAccordion.Heading leadingVisual={<Icon icon={ItemIcon} />}>
                    {item.heading}
                  </RiverAccordion.Heading>
                  <RiverAccordion.Content>
                    <Text>{item.description}</Text>
                    <Link
                      arrowDirection={item.external ? 'none' : 'end'}
                      href={item.href}
                      isExternal='auto'
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      target={item.external ? '_blank' : undefined}
                    >
                      {item.linkLabel}
                    </Link>
                  </RiverAccordion.Content>
                  <RiverAccordion.Visual>
                    <StudioBlueprintVisual id={item.id} />
                  </RiverAccordion.Visual>
                </RiverAccordion.Item>
              );
            })}
          </RiverAccordion>
        </Stack>
      </Section>

      {/* Band 7: Gridline FAQ Section (synced with FaqJsonLd in page.tsx) */}
      <Section
        fullWidth
        backgroundColor='subtle'
        className={styles.faqSection}
        paddingBlockEnd='none'
        paddingBlockStart='normal'
      >
        <FAQClient
          variant='gridline'
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
              heading: 'About Curriculum & Methodology',
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

      {/* Band 8: Gridline Call-to-Action Banner */}
      <CTABanner hasGridLines align='center' variant='default'>
        <CTABanner.Heading as='h2'>Ready to build a 3D engine from scratch?</CTABanner.Heading>
        <CTABanner.Description>
          Join the waitlist for cloud sandbox access, or read through the open graphics glossary and C++23 source
          repositories today.
        </CTABanner.Description>
        <CTABanner.ButtonGroup>
          <Button as='a' href='/waitlist' variant='primary'>
            Join the waitlist
          </Button>
          <Button
            as='a'
            href={Organization.socials.github}
            rel='noopener noreferrer'
            target='_blank'
            variant='secondary'
          >
            Explore GitHub
          </Button>
        </CTABanner.ButtonGroup>
      </CTABanner>
    </div>
  );
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useState } from 'react';
import { Organization, Repositories } from '@gp/constants';
import type { FaqEntry } from '@gp/content';
import type { BreadcrumbItem } from '@gp/seo/jsonld';
import { BreadcrumbJsonLd, FaqJsonLd } from '@gp/seo/react';
import {
  Box,
  Breadcrumbs,
  Button,
  CTABanner,
  EyebrowText,
  FAQ,
  FormControl,
  GitHubIcon,
  Grid,
  Heading,
  Hero,
  Icon as GpIcon,
  Label,
  Link,
  River,
  Section,
  SectionIntro,
  SectionIntroStacked,
  Statistic,
  Text,
  TextInput,
  Tiles,
  Timeline,
  Token
} from '@gp/ui/components';
import type { IconColor } from '@gp/ui/components';
import {
  BeakerIcon,
  BookIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ChecklistIcon,
  CodeIcon,
  CpuIcon,
  EyeIcon,
  FileCodeIcon,
  HeartIcon,
  PeopleIcon,
  RocketIcon,
  SearchIcon,
  ServerIcon,
  ToolsIcon,
  TrophyIcon,
  VerifiedIcon,
  WorkflowIcon
} from '@primer/octicons-react';
import type { Icon } from '@primer/octicons-react';
import { useDitherBackground } from '@/components/home/visuals';
import { CertificationsFloatingSeals } from './certifications-floating-seals';
import styles from './certifications.module.css';

const CERTIFICATIONS_BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Certifications', path: '/certifications' }
];

const OVERVIEW_STATS = [
  {
    value: 'Code Proof',
    label: 'Credentials tied to runnable projects, source repositories, and HLSL shaders'
  },
  {
    value: 'ID Lookup',
    label: 'Public certificate IDs let recruiters verify accomplishments on this site'
  },
  {
    value: 'Open Core',
    label: 'Lessons and local runs stay free; paid credentials help fund shared GPUs'
  }
] as const;

interface CertificationPurpose {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: Icon;
  readonly color: IconColor;
}

const CERTIFICATION_PURPOSES: readonly CertificationPurpose[] = [
  {
    id: 'stand-out',
    title: 'Help candidates stand out among engineers',
    description:
      'Many portfolios show similar introductory demos with little proof of how they work. A verified project links your name to real C++23 engine code, HLSL shaders, and completed rendering systems.',
    icon: BriefcaseIcon,
    color: 'green'
  },
  {
    id: 'reviewer-signal',
    title: 'Help hiring reviewers inspect work quickly',
    description:
      'Engineering leads and recruiters can enter any certificate ID on this site to view the project outcome and jump directly to showcases and public repositories.',
    icon: EyeIcon,
    color: 'blue'
  },
  {
    id: 'platform-sustainability',
    title: 'Help fund cloud GPUs and upkeep',
    description:
      'Lessons and engine code remain open for local use. Optional paid certification tracks help cover cloud GPU servers, evaluation tooling, and maintenance costs.',
    icon: HeartIcon,
    color: 'coral'
  },
  {
    id: 'acknowledge-work',
    title: 'Acknowledge milestones built on the platform',
    description:
      'Finishing a graphics programming path takes sustained effort. Issuing an auditable record recognizes what you accomplished and documents the platform work behind it.',
    icon: TrophyIcon,
    color: 'indigo'
  }
];

const ARTIFACT_PILLARS = [
  {
    name: 'Working source repository',
    detail: 'Compiling C++23 code structured cleanly across engine boundaries',
    tag: 'Source'
  },
  {
    name: 'Shader implementation in HLSL',
    detail: 'Custom shader stages and material math authored inside the workspace',
    tag: 'HLSL'
  },
  {
    name: 'Inspectable showcase artifact',
    detail: 'Rendered output that technical reviewers can inspect online',
    tag: 'Demo'
  },
  {
    name: 'Public verifiable ID',
    detail: 'Permanent record linking candidate, project title, and repository',
    tag: 'Registry'
  }
] as const;

const RHI_STACK_LAYERS = [
  {
    name: 'Rendering Concepts & Math',
    note: 'Transforms, visibility, lighting, frame scheduling',
    swappable: false
  },
  {
    name: 'Shader Layer (HLSL)',
    note: 'Vertex, pixel, and compute shaders written in HLSL',
    swappable: false
  },
  {
    name: 'RHI Abstraction Boundary',
    note: 'Graphics backends can change as the engine evolves',
    swappable: true
  }
] as const;

interface FocusDomainTile {
  readonly name: string;
  readonly href: string;
  readonly icon: Icon;
}

const FOCUS_DOMAIN_TILES: readonly FocusDomainTile[] = [
  { name: 'C++23 Systems', href: '/products/engine', icon: CodeIcon },
  { name: 'HLSL Shaders', href: '/breakdowns', icon: FileCodeIcon },
  { name: 'RHI Architecture', href: '/curriculum', icon: CpuIcon },
  { name: 'Render Pipelines', href: '/glossary', icon: WorkflowIcon },
  { name: 'PBR Lighting', href: '/showcases', icon: BeakerIcon },
  { name: 'Cloud & Local Execution', href: '/products/cloud', icon: ServerIcon },
  { name: 'Build Tooling', href: '/careers', icon: ToolsIcon },
  { name: 'Technical Notes', href: '/products/handbook', icon: BookIcon }
];

const DESIGN_STAGES = [
  {
    lead: 'Curriculum alignment (In progress)',
    detail: 'Publishing core lessons and HLSL examples before locking specific credential scopes.'
  },
  {
    lead: 'Track selection (Not finalized)',
    detail: 'Specific certification tracks and names have not been chosen yet while the syllabus settles.'
  },
  {
    lead: 'Project evaluation design (In progress)',
    detail: 'Automated validation tools and human review processes are still under active design.'
  },
  {
    lead: 'Public ID registry launch',
    detail: 'Opening live lookup right here so every earned certificate resolves by ID.'
  }
] as const;

interface CertificateRecord {
  readonly id: string;
  readonly holder: string;
  readonly projectTitle: string;
  readonly focus: string;
  readonly issuedDate: string;
  readonly repoName: string;
  readonly repoUrl: string;
}

const SPECIMEN_CERTIFICATES: Record<string, CertificateRecord> = {
  'GP-CERT-SAMPLE-01': {
    id: 'GP-CERT-SAMPLE-01',
    holder: 'Sample Candidate',
    projectTitle: 'Real-Time Lighting and Material Pipeline',
    focus: 'C++23 & HLSL',
    issuedDate: '2026-XX-XX',
    repoName: Repositories.GpSampleProjects.displayName,
    repoUrl: Repositories.GpSampleProjects.url
  },
  'GP-CERT-SAMPLE-02': {
    id: 'GP-CERT-SAMPLE-02',
    holder: 'Sample Candidate',
    projectTitle: 'Modular RHI Renderer and Scene Graph',
    focus: 'C++23 & HLSL',
    issuedDate: '2026-XX-XX',
    repoName: Repositories.GpEngine.displayName,
    repoUrl: Repositories.GpEngine.url
  }
};

const CERTIFICATIONS_FAQ_ITEMS: FaqEntry[] = [
  {
    question: 'Are certification tracks already finalized?',
    answer:
      'No. We are still designing specific tracks, project scopes, and evaluation workflows as the core curriculum takes shape.'
  },
  {
    question: 'How will candidate projects be tested?',
    answer:
      'Testing criteria and automated verification workflows are still under construction. The goal is to evaluate working compiling code and visual project output rather than timed trivia quizzes.'
  },
  {
    question: 'Do I have to pay to learn on Graphical Playground?',
    answer:
      'No. The curriculum and open-source engine run locally for free. Paid certification tracks will be optional and exist to verify projects cleanly while funding cloud GPU infrastructure.'
  },
  {
    question: 'Which shader language and graphics APIs are involved?',
    answer:
      'Shader work focuses on HLSL. Rendering systems sit behind an adaptable RHI layer so backends can evolve without tying credentials to one vendor API.'
  },
  {
    question: 'How can hiring reviewers verify a certificate by ID?',
    answer: `Any issued credential will include a unique public ID verified directly in the lookup tool on this page, or reviewers can reach ${Organization.emails.contact} with questions.`
  }
];

export interface CertificationsViewProps {
  title: string;
}

/**
 * @brief Client view for `/certifications`, presenting the design philosophy (`River`), core
 * purposes (`SectionIntroStacked`), expected focus domains (`Tiles`), honest build status
 * (`Timeline`), and an enhanced interactive Certificate ID verification console.
 */
export const CertificationsView: React.FC<CertificationsViewProps> = ({ title }) => {
  const [queryId, setQueryId] = useState<string>('GP-CERT-SAMPLE-01');
  const [activeLookupId, setActiveLookupId] = useState<string>('GP-CERT-SAMPLE-01');
  const [lookupError, setLookupError] = useState<string | null>(null);

  const { containerRef: heroDitherRef, DitherBackground: HeroDitherBackground } = useDitherBackground({
    dotOpacity: 0.32,
    interactiveCursor: false,
    maskMode: 'top-fade',
    palette: 'iridescent',
    transparentBackground: true,
    type: 'wave'
  });

  const { containerRef: specimenDitherRef, DitherBackground: SpecimenDitherBackground } = useDitherBackground({
    dotOpacity: 0.24,
    interactiveCursor: false,
    maskMode: 'bottom',
    palette: 'green',
    transparentBackground: true,
    type: 'wave'
  });

  const normalizedActiveId = activeLookupId.trim().toUpperCase();
  const matchedSpecimen = normalizedActiveId ? SPECIMEN_CERTIFICATES[normalizedActiveId] : undefined;

  const handleLookupSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = queryId.trim().toUpperCase();

    if (!cleaned) {
      setLookupError('Enter a certificate ID such as GP-CERT-SAMPLE-01 to preview a lookup.');
      setActiveLookupId('');

      return;
    }

    setLookupError(null);
    setActiveLookupId(cleaned);
  };

  const handleSelectSpecimen = (specimenId: string) => {
    setQueryId(specimenId);
    setActiveLookupId(specimenId);
    setLookupError(null);
  };

  return (
    <>
      <div ref={heroDitherRef} className={styles.heroBannerFrame}>
        <CertificationsFloatingSeals />
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
                {CERTIFICATIONS_BREADCRUMBS.map((item, index) => (
                  <Breadcrumbs.Item
                    key={item.path}
                    href={item.path}
                    {...(index === CERTIFICATIONS_BREADCRUMBS.length - 1 && { selected: true })}
                  >
                    {item.name}
                  </Breadcrumbs.Item>
                ))}
              </Breadcrumbs>
              <BreadcrumbJsonLd items={CERTIFICATIONS_BREADCRUMBS} />
            </Grid.Column>

            <Grid.Column span={12}>
              <Hero align='center' className={styles.heroRoot}>
                <Hero.Label>Solutions · Verified Credentials</Hero.Label>
                <Hero.Heading size='2'>{title} backed by working graphics code</Hero.Heading>
                <Hero.Description size='300'>
                  Designed to recognize real engineering work on Graphical Playground, give hiring reviewers direct
                  evidence by certificate ID, and help sustain shared GPU infrastructure while courses remain free.
                </Hero.Description>
                <Hero.ButtonGroup>
                  <Button as='a' href='#verify' leadingVisual={<SearchIcon />} variant='primary'>
                    Verify a certificate ID
                  </Button>
                  <Button as='a' href='#how-it-is-made' variant='secondary'>
                    How they are designed
                  </Button>
                </Hero.ButtonGroup>
              </Hero>
            </Grid.Column>
          </Grid>
        </Section>
        <HeroDitherBackground />
      </div>

      <Section fullWidth backgroundColor='default' paddingBlockEnd='condensed' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <div className={styles.statsFrame}>
              <Grid columnGap='none' enableGutters={false} rowGap='none'>
                {OVERVIEW_STATS.map((stat) => (
                  <Grid.Column key={stat.value} className={styles.statsCell} span={{ xsmall: 12, large: 4 }}>
                    <Box padding={{ narrow: 24, wide: 36 }}>
                      <Statistic>
                        <Statistic.Heading font='monospace' size='700' weight='normal'>
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
            </div>
          </Grid.Column>
        </Grid>
      </Section>

      <Section
        fullWidth
        backgroundColor='default'
        id='why-certifications'
        paddingBlockEnd='normal'
        paddingBlockStart='normal'
      >
        <Grid>
          <Grid.Column span={12}>
            <SectionIntroStacked variant='gridline'>
              <SectionIntroStacked.Heading as='h2' size='3'>
                Built for candidates, reviewers, and <b>platform sustainability</b>.
              </SectionIntroStacked.Heading>
              <SectionIntroStacked.Description>
                Our certifications serve four practical goals: helping candidates distinguish their work, giving hiring
                teams fast proof, funding cloud GPUs, and recording accomplishments earned on the platform.
              </SectionIntroStacked.Description>
              <SectionIntroStacked.Link arrowDirection='end' href='/curriculum'>
                Explore the curriculum
              </SectionIntroStacked.Link>
              <SectionIntroStacked.Items>
                {CERTIFICATION_PURPOSES.map((purpose) => (
                  <SectionIntroStacked.Item key={purpose.id}>
                    <SectionIntroStacked.ItemIcon color={purpose.color} icon={purpose.icon} />
                    <SectionIntroStacked.ItemHeading as='h3'>{purpose.title}</SectionIntroStacked.ItemHeading>
                    <SectionIntroStacked.ItemDescription>{purpose.description}</SectionIntroStacked.ItemDescription>
                  </SectionIntroStacked.Item>
                ))}
              </SectionIntroStacked.Items>
            </SectionIntroStacked>
          </Grid.Column>
        </Grid>
      </Section>

      <Section
        fullWidth
        backgroundColor='subtle'
        id='how-it-is-made'
        paddingBlockEnd='normal'
        paddingBlockStart='normal'
      >
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Design philosophy</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                How our certifications are thought out
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Specific tracks and testing rules are still under development. These core principles guide how
                credentials are being built alongside the curriculum.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          <Grid.Column span={12}>
            <div className={styles.riversStack}>
              <River align='start' imageTextRatio='50:50'>
                <River.Visual hasShadow={false}>
                  <div className={styles.schemaCard}>
                    <div className={styles.schemaHeader}>
                      <Text as='span' font='monospace' size='200' weight='medium'>
                        Credential Evidence Components
                      </Text>
                      <Token variant='outline'>PROJECT ARTIFACTS</Token>
                    </div>
                    <div className={styles.artifactList}>
                      {ARTIFACT_PILLARS.map((item) => (
                        <div key={item.name} className={styles.artifactRow}>
                          <div className={styles.artifactRowLeft}>
                            <GpIcon hasBackground color='green' icon={CheckCircleIcon} size='small' />
                            <div className={styles.artifactTextWrap}>
                              <Text as='span' size='200' weight='medium'>
                                {item.name}
                              </Text>
                              <Text as='span' size='100' variant='muted'>
                                {item.detail}
                              </Text>
                            </div>
                          </div>
                          <Token variant='default'>{item.tag}</Token>
                        </div>
                      ))}
                    </div>
                  </div>
                </River.Visual>
                <River.Content>
                  <EyebrowText variant='accent'>01 · Proof from projects</EyebrowText>
                  <Heading as='h3'>Grounded in runnable graphics software</Heading>
                  <Text>
                    Each credential centers on real engineering artifacts built on the platform. Candidates produce
                    compiling C++23 systems, write shaders in HLSL, and connect finished work to public showcases that
                    show what the project does.
                  </Text>
                  <Link arrowDirection='end' href='/showcases'>
                    Explore public showcases
                  </Link>
                </River.Content>
              </River>

              <River align='end' imageTextRatio='50:50'>
                <River.Visual hasShadow={false}>
                  <div className={styles.schemaCard}>
                    <div className={styles.schemaHeader}>
                      <Text as='span' font='monospace' size='200' weight='medium'>
                        RHI-Agnostic Design Scope
                      </Text>
                      <Token variant='outline'>IN DEVELOPMENT</Token>
                    </div>
                    <div className={styles.layerStack}>
                      {RHI_STACK_LAYERS.map((layer) => (
                        <div
                          key={layer.name}
                          className={
                            layer.swappable ? `${styles.layerBand} ${styles.layerBandSwappable}` : styles.layerBand
                          }
                        >
                          <Text as='span' size='200' weight='medium'>
                            {layer.name}
                          </Text>
                          <Text as='span' size='100' variant='muted'>
                            {layer.note}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </div>
                </River.Visual>
                <River.Content>
                  <EyebrowText variant='accent'>02 · Adaptable scope</EyebrowText>
                  <Heading as='h3'>Shaped for evolving RHI backends and HLSL</Heading>
                  <Text>
                    Because our engine RHI backend can change as support expands, credentials focus on durable rendering
                    design, resource structure, and HLSL shader code. Exact certification tracks and project testing
                    methods have not been locked yet and remain under development.
                  </Text>
                  <Link arrowDirection='end' href='/products/engine'>
                    Inspect gp-engine
                  </Link>
                </River.Content>
              </River>

              <River align='start' imageTextRatio='50:50'>
                <River.Visual hasShadow={false}>
                  <div className={styles.schemaCard}>
                    <div className={styles.schemaHeader}>
                      <Text as='span' font='monospace' size='200' weight='medium'>
                        Open Learning vs Paid Verification
                      </Text>
                      <Token variant='outline'>SUSTAINABILITY</Token>
                    </div>
                    <div className={styles.modelSplitGrid}>
                      <div className={`${styles.modelSplitPane} ${styles.modelSplitPaneAccent}`}>
                        <Label color='green' size='small'>
                          Free locally
                        </Label>
                        <Text as='span' size='200' weight='semibold'>
                          Open curriculum &amp; source
                        </Text>
                        <Text as='p' size='100' variant='muted'>
                          Read every lesson, study HLSL shaders, and run gp-engine on your own machine without fees.
                        </Text>
                      </div>
                      <div className={`${styles.modelSplitPane} ${styles.modelSplitPaneBlue}`}>
                        <Label color='indigo' size='small'>
                          Funds GPU servers
                        </Label>
                        <Text as='span' size='200' weight='semibold'>
                          Optional certified review
                        </Text>
                        <Text as='p' size='100' variant='muted'>
                          Helps cover remote GPU machines, verification infrastructure, and ongoing platform upkeep.
                        </Text>
                      </div>
                    </div>
                  </div>
                </River.Visual>
                <River.Content>
                  <EyebrowText variant='accent'>03 · Open funding balance</EyebrowText>
                  <Heading as='h3'>Funding platform infrastructure while lessons stay free</Heading>
                  <Text>
                    Running remote GPU containers costs money every month. Offering optional paid certifications helps
                    pay those infrastructure bills while keeping open-source lessons and repositories free to anyone.
                  </Text>
                  <Link arrowDirection='end' href='/pricing'>
                    See pricing model
                  </Link>
                </River.Content>
              </River>
            </div>
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='default' id='focus-areas' paddingBlockEnd='normal' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Focus areas</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                Skills and systems covered across the platform
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Explore the core graphics topics and HLSL rendering systems that future certification projects will draw
                from.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          <Grid.Column span={12}>
            <div className={styles.tilesWrap}>
              <Tiles variant='gridlines'>
                {FOCUS_DOMAIN_TILES.map((tile) => {
                  const TileIcon = tile.icon;

                  return (
                    <Tiles.Item key={tile.name} href={tile.href} name={tile.name}>
                      <TileIcon size={28} />
                    </Tiles.Item>
                  );
                })}
              </Tiles>
            </div>
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='subtle' id='roadmap' paddingBlockEnd='normal' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Build status</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                Current status of tracks and testing
              </SectionIntro.Heading>
              <SectionIntro.Description>
                We have not finalized specific certification tracks or testing procedures yet. Here is how rollout steps
                from open coursework toward verified credentials.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          <Grid.Column span={12}>
            <Box
              backgroundColor='default'
              borderColor='muted'
              borderRadius='large'
              borderStyle='solid'
              borderWidth='thin'
              className={styles.roadmapCard}
              padding='normal'
            >
              <div className={styles.roadmapMeta}>
                <Label color='yellow' size='small'>
                  In development
                </Label>
                <Token variant='outline'>Tracks not selected yet</Token>
                <Token variant='outline'>Testing model under design</Token>
              </div>

              <Timeline>
                {DESIGN_STAGES.map((stage) => (
                  <Timeline.Item key={stage.lead}>
                    <b>{stage.lead}:</b> {stage.detail}
                  </Timeline.Item>
                ))}
              </Timeline>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='default' id='verify' paddingBlockEnd='spacious' paddingBlockStart='spacious'>
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='center'>
              <SectionIntro.Label>Public registry</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                Verify a certificate by ID
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Every issued credential resolves here so reviewers can confirm authenticity and open the linked project.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          <Grid.Column span={12}>
            <div className={styles.verifyStage}>
              <form className={styles.verifyForm} onSubmit={handleLookupSubmit}>
                <div className={styles.verifyInputRow}>
                  <div className={styles.verifyControlWrap}>
                    <FormControl
                      fullWidth
                      id='certificate-id-lookup'
                      validationStatus={lookupError ? 'error' : undefined}
                    >
                      <FormControl.Label visuallyHidden>Certificate ID</FormControl.Label>
                      <TextInput
                        fullWidth
                        monospace
                        leadingVisual={<SearchIcon />}
                        placeholder='GP-CERT-SAMPLE-01'
                        value={queryId}
                        onChange={(event) => setQueryId(event.target.value)}
                      />
                      {lookupError ? (
                        <FormControl.Validation validationStatus='error'>{lookupError}</FormControl.Validation>
                      ) : null}
                    </FormControl>
                  </div>

                  <Button leadingVisual={<VerifiedIcon />} type='submit' variant='primary'>
                    Verify ID
                  </Button>
                </div>

                <div className={styles.specimenPicker}>
                  <Text as='span' size='100' variant='muted'>
                    Specimen IDs:
                  </Text>
                  {Object.keys(SPECIMEN_CERTIFICATES).map((id) => (
                    <Button
                      key={id}
                      size='small'
                      type='button'
                      variant={normalizedActiveId === id ? 'secondary' : 'subtle'}
                      onClick={() => handleSelectSpecimen(id)}
                    >
                      {id}
                    </Button>
                  ))}
                </div>
              </form>

              {matchedSpecimen ? (
                <div ref={specimenDitherRef} aria-live='polite' className={styles.certificateCard}>
                  <SpecimenDitherBackground />
                  <div className={styles.certificateTopBar}>
                    <div className={styles.certificateIssuer}>
                      <GpIcon hasBackground color='green' icon={VerifiedIcon} size='small' />
                      <Text as='span' font='monospace' size='100' variant='muted'>
                        {Organization.displayName.toUpperCase()}
                      </Text>
                    </div>
                    <Label color='yellow' size='small'>
                      Specimen preview
                    </Label>
                  </div>

                  <div className={styles.certificateHero}>
                    <Text as='span' font='monospace' size='200' variant='muted'>
                      {matchedSpecimen.id}
                    </Text>
                    <Heading as='h3' size='3'>
                      {matchedSpecimen.holder}
                    </Heading>
                    <Text as='p' size='300' variant='muted'>
                      {matchedSpecimen.projectTitle}
                    </Text>
                  </div>

                  <div className={styles.certificateLedger}>
                    <div className={styles.certificateMetaGroup}>
                      <div className={styles.certificateMetaItem}>
                        <EyebrowText variant='muted'>Focus</EyebrowText>
                        <Text as='span' size='200' weight='medium'>
                          {matchedSpecimen.focus}
                        </Text>
                      </div>
                      <div className={styles.certificateMetaItem}>
                        <EyebrowText variant='muted'>Issued</EyebrowText>
                        <Text as='span' font='monospace' size='200'>
                          {matchedSpecimen.issuedDate}
                        </Text>
                      </div>
                      <div className={styles.certificateMetaItem}>
                        <EyebrowText variant='muted'>Repository</EyebrowText>
                        <Link href={matchedSpecimen.repoUrl} rel='noopener noreferrer' target='_blank' variant='accent'>
                          {matchedSpecimen.repoName}
                        </Link>
                      </div>
                    </div>

                    <Link arrowDirection='end' href='/showcases' variant='accent'>
                      View showcases
                    </Link>
                  </div>
                </div>
              ) : normalizedActiveId ? (
                <div aria-live='polite' className={styles.notFoundState}>
                  <div className={styles.notFoundTitleRow}>
                    <ChecklistIcon aria-hidden='true' size={16} />
                    <Text as='span' size='200' weight='medium'>
                      No credential matched {normalizedActiveId}
                    </Text>
                  </div>
                  <Text as='p' size='200' variant='muted'>
                    Live IDs launch with the first cohort. Pick a specimen above to preview the card format.
                  </Text>
                </div>
              ) : null}
            </div>
          </Grid.Column>
        </Grid>
      </Section>

      <Section
        fullWidth
        backgroundColor='subtle'
        id='certifications-faq'
        paddingBlockEnd='normal'
        paddingBlockStart='normal'
      >
        <Grid>
          <Grid.Column span={12}>
            <FAQ variant='default'>
              <FAQ.Heading align='center' as='h2' size='3'>
                Certification questions
              </FAQ.Heading>
              {CERTIFICATIONS_FAQ_ITEMS.map((item) => (
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
              description='Answers about Graphical Playground certification progress, open curriculum access, HLSL and adaptable RHI support, cloud GPU funding, and ID verification.'
              items={CERTIFICATIONS_FAQ_ITEMS}
              name='Certifications Frequently Asked Questions'
              path='/certifications'
            />
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='default' paddingBlockEnd='spacious' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <CTABanner hasBorder align='center' backgroundColor='subtle' variant='default'>
              <CTABanner.Heading as='h2'>Follow progress on project certifications</CTABanner.Heading>
              <CTABanner.Description>
                Join the waitlist for updates when tracks launch, browse community demos in showcases, or explore{' '}
                {Repositories.GpEngine.displayName} on GitHub.
              </CTABanner.Description>
              <CTABanner.ButtonGroup>
                <Button as='a' href='/waitlist' leadingVisual={<RocketIcon />} variant='primary'>
                  Join the waitlist
                </Button>
                <Button as='a' href='/showcases' leadingVisual={<PeopleIcon />} variant='secondary'>
                  Explore showcases
                </Button>
                <Button
                  as='a'
                  href={Repositories.GpEngine.url}
                  leadingVisual={<GitHubIcon />}
                  rel='noopener noreferrer'
                  target='_blank'
                  variant='subtle'
                >
                  View gp-engine
                </Button>
              </CTABanner.ButtonGroup>
            </CTABanner>
          </Grid.Column>
        </Grid>
      </Section>
    </>
  );
};

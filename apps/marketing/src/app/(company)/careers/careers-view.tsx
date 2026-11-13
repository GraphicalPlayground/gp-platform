// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import clsx from 'clsx';
import { Organization, Repositories } from '@gp/constants';
import type { CareerDepartment, CareerEngagementType, FaqEntry } from '@gp/content';
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
  Icon as GpIcon,
  Label,
  Link,
  Pillar,
  Section,
  SectionIntro,
  Tabs,
  Text,
  Token
} from '@gp/ui/components';
import type { IconColor } from '@gp/ui/components';
import {
  BeakerIcon,
  BookIcon,
  CodeIcon,
  CommentDiscussionIcon,
  CpuIcon,
  FileCodeIcon,
  GitPullRequestIcon,
  LockIcon,
  MailIcon,
  MortarBoardIcon,
  RepoIcon,
  ServerIcon,
  ShieldLockIcon,
  TerminalIcon,
  ToolsIcon,
  WorkflowIcon
} from '@primer/octicons-react';
import type { Icon } from '@primer/octicons-react';
import { useDitherBackground } from '@/components/home/visuals';
import { CareersFloatingBriefcases } from './careers-floating-briefcases';
import styles from './careers.module.css';

export interface CareerPostingSummary {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly department: CareerDepartment;
  readonly engagement: CareerEngagementType;
  readonly location: string;
  readonly skills: readonly string[];
  readonly repositories: readonly string[];
  readonly applyUrl?: string;
  readonly contactEmail?: string;
}

const CAREERS_BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Careers', path: '/careers' }
];

const CONTRIBUTING_GUIDE_URL = `${Repositories.GpPlatform.url}/blob/main/CONTRIBUTING.md`;
const GITHUB_ORG_HANDLE = Organization.socials.github.split('/').pop() ?? 'GraphicalPlayground';

const DEPARTMENT_LABELS: Record<CareerDepartment, string> = {
  engineering: 'Engineering',
  research: 'Research',
  curriculum: 'Curriculum',
  infrastructure: 'Infrastructure',
  community: 'Community',
  design: 'Design',
  operations: 'Operations'
};

const ENGAGEMENT_LABELS: Record<CareerEngagementType, string> = {
  'open-source': 'Open source',
  'internship': 'Internship',
  'contract': 'Contract',
  'part-time': 'Part-time',
  'full-time': 'Full-time'
};

type SupportedRepoColor =
  'blue' | 'coral' | 'gray' | 'green' | 'indigo' | 'orange' | 'pink' | 'purple' | 'teal' | 'yellow';

const REPO_ACCENT_CLASS: Record<SupportedRepoColor, string> = {
  blue: styles.accentBlue,
  coral: styles.accentCoral,
  gray: styles.accentGray,
  green: styles.accentGreen,
  indigo: styles.accentIndigo,
  orange: styles.accentOrange,
  pink: styles.accentPink,
  purple: styles.accentPurple,
  teal: styles.accentTeal,
  yellow: styles.accentYellow
};

interface RepositoryOpportunity {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly description: string;
  readonly license: string;
  readonly stackBadge: string;
  readonly focusLabel: string;
  readonly skills: readonly string[];
  readonly icon: Icon;
  readonly color: SupportedRepoColor & IconColor;
}

interface RepositoryGroup {
  readonly id: string;
  readonly shortTabLabel: string;
  readonly title: string;
  readonly subtitle: string;
  readonly columnSpan: { xsmall: 12; medium: 6; large?: 4 };
  readonly repositories: readonly RepositoryOpportunity[];
}

const REPOSITORY_GROUPS: readonly RepositoryGroup[] = [
  {
    id: 'engine-research',
    shortTabLabel: 'Engine & R&D',
    title: 'Graphics engine and R&D',
    subtitle: 'Low-level C++23 rendering, GPU APIs, sample scenes, and experimental shaders.',
    columnSpan: { xsmall: 12, medium: 6, large: 4 },
    repositories: [
      {
        id: 'gp-engine',
        name: Repositories.GpEngine.displayName,
        url: Repositories.GpEngine.url,
        description: Repositories.GpEngine.description,
        license: Repositories.GpEngine.license,
        stackBadge: 'C++23',
        focusLabel: 'Core engine',
        skills: ['C++23', 'Vulkan', 'DirectX 11/12', 'Metal', 'OpenGL', 'Render graphs', 'CMake'],
        icon: CpuIcon,
        color: 'orange'
      },
      {
        id: 'gp-sample-projects',
        name: Repositories.GpSampleProjects.displayName,
        url: Repositories.GpSampleProjects.url,
        description: Repositories.GpSampleProjects.description,
        license: Repositories.GpSampleProjects.license,
        stackBadge: 'Shaders',
        focusLabel: 'Learning demos',
        skills: ['C++23', 'GLSL / HLSL / Slang', 'PBR materials', '3D math', 'Example scenes'],
        icon: CodeIcon,
        color: 'blue'
      },
      {
        id: 'gp-experiments',
        name: Repositories.GpExperiments.displayName,
        url: Repositories.GpExperiments.url,
        description: Repositories.GpExperiments.description,
        license: Repositories.GpExperiments.license,
        stackBadge: 'Research',
        focusLabel: 'R&D prototypes',
        skills: ['Ray tracing', 'Compute shaders', 'Mesh shaders', 'GPU profiling', 'Prototyping'],
        icon: BeakerIcon,
        color: 'purple'
      }
    ]
  },
  {
    id: 'platform-curriculum',
    shortTabLabel: 'Platform & Docs',
    title: 'Platform, curriculum and documentation',
    subtitle: 'Web frontend and backend systems, interactive lessons, references, and docs.',
    columnSpan: { xsmall: 12, medium: 6 },
    repositories: [
      {
        id: 'gp-platform',
        name: Repositories.GpPlatform.displayName,
        url: Repositories.GpPlatform.url,
        description: Repositories.GpPlatform.description,
        license: Repositories.GpPlatform.license,
        stackBadge: 'TypeScript',
        focusLabel: 'Web monorepo',
        skills: ['TypeScript', 'React & Next.js', 'CSS Modules', 'Accessibility (a11y)', 'Node.js APIs'],
        icon: FileCodeIcon,
        color: 'indigo'
      },
      {
        id: 'gp-curriculum',
        name: Repositories.GpCurriculum.displayName,
        url: Repositories.GpCurriculum.url,
        description: Repositories.GpCurriculum.description,
        license: Repositories.GpCurriculum.license,
        stackBadge: 'Curriculum',
        focusLabel: 'Coursework',
        skills: ['Graphics pedagogy', 'MDX authoring', 'Linear algebra', 'Lesson review', 'Exercises'],
        icon: MortarBoardIcon,
        color: 'green'
      },
      {
        id: 'gp-handbook',
        name: Repositories.GpHandbook.displayName,
        url: Repositories.GpHandbook.url,
        description: Repositories.GpHandbook.description,
        license: Repositories.GpHandbook.license,
        stackBadge: 'Reference',
        focusLabel: 'Design guide',
        skills: ['Technical writing', 'Rendering patterns', 'GPU fundamentals', 'Technical diagrams'],
        icon: BookIcon,
        color: 'teal'
      },
      {
        id: 'gp-docs',
        name: Repositories.GpDocs.displayName,
        url: Repositories.GpDocs.url,
        description: Repositories.GpDocs.description,
        license: Repositories.GpDocs.license,
        stackBadge: 'MDX Docs',
        focusLabel: 'Technical docs',
        skills: ['API documentation', 'MDX / Markdown', 'Contributor guides', 'Architecture notes'],
        icon: RepoIcon,
        color: 'pink'
      }
    ]
  },
  {
    id: 'cloud-build-automation',
    shortTabLabel: 'Cloud & Tooling',
    title: 'Cloud, build tooling and automation',
    subtitle: 'Remote GPU runners, cross-platform CMake orchestration, CI workflows, and org compliance.',
    columnSpan: { xsmall: 12, medium: 6 },
    repositories: [
      {
        id: 'gp-infrastructure',
        name: Repositories.GpInfrastructure.displayName,
        url: Repositories.GpInfrastructure.url,
        description: Repositories.GpInfrastructure.description,
        license: Repositories.GpInfrastructure.license,
        stackBadge: 'Cloud GPU',
        focusLabel: 'Infrastructure',
        skills: ['Linux & containers', 'Remote GPU execution', 'Terraform / IaC', 'Networking', 'Security'],
        icon: ServerIcon,
        color: 'coral'
      },
      {
        id: 'gp-build-tool',
        name: Repositories.GpBuildTool.displayName,
        url: Repositories.GpBuildTool.url,
        description: Repositories.GpBuildTool.description,
        license: Repositories.GpBuildTool.license,
        stackBadge: 'CMake',
        focusLabel: 'Build CLI',
        skills: ['CMake', 'Build orchestration', 'C++ toolchains', 'CLI ergonomics', 'Cross-platform'],
        icon: ToolsIcon,
        color: 'yellow'
      },
      {
        id: 'gp-actions',
        name: Repositories.GpActions.displayName,
        url: Repositories.GpActions.url,
        description: Repositories.GpActions.description,
        license: Repositories.GpActions.license,
        stackBadge: 'CI / CD',
        focusLabel: 'Automation',
        skills: ['GitHub Actions', 'CI/CD pipelines', 'Shell / PowerShell', 'Build caching'],
        icon: WorkflowIcon,
        color: 'blue'
      },
      {
        id: 'gp-source-of-truth',
        name: Repositories.GpSourceOfTruth.displayName,
        url: Repositories.GpSourceOfTruth.url,
        description: Repositories.GpSourceOfTruth.description,
        license: Repositories.GpSourceOfTruth.license,
        stackBadge: 'Governance',
        focusLabel: 'Org standards',
        skills: ['Open-source templates', 'Repo config sync', 'Compliance checks', 'Automation'],
        icon: ShieldLockIcon,
        color: 'gray'
      }
    ]
  }
];

const TOTAL_PUBLIC_REPOS = REPOSITORY_GROUPS.reduce((sum, group) => sum + group.repositories.length, 0);

const PRIVATE_CONSOLE_REPOS = [
  Repositories.GpEnginePlaystation.displayName,
  Repositories.GpEngineSwitch.displayName,
  Repositories.GpEngineXbox.displayName
] as const;

interface ContributeStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: Icon;
}

const CONTRIBUTE_STEPS: readonly ContributeStep[] = [
  {
    id: 'pick-repo',
    title: 'Pick a repository and skill area',
    description:
      'Choose a codebase from the list above based on whether you prefer C++ rendering, TypeScript web tooling, curriculum writing, or cloud GPU ops.',
    icon: TerminalIcon
  },
  {
    id: 'read-guide',
    title: 'Follow CONTRIBUTING.md',
    description:
      'Check local build commands, coding rules, and pull request expectations in the contribution guide before writing code.',
    icon: GitPullRequestIcon
  },
  {
    id: 'discuss-early',
    title: 'Share your plan early',
    description:
      'Open an issue on GitHub or ask maintainers in Discord first so your patch fits the architecture before you invest hours.',
    icon: CommentDiscussionIcon
  }
];

const CAREERS_FAQ_ITEMS: FaqEntry[] = [
  {
    question: 'Is Graphical Playground hiring paid employees right now?',
    answer:
      'No. Graphical Playground is a free, open-source platform and we cannot offer paid jobs or funded employment right now. Whenever funded positions open, they are published here through our CMS.'
  },
  {
    question: 'Are open-source contributions paid or volunteer?',
    answer:
      'All open-source contributions right now are voluntary. You keep credit in git history and contributor pages, and sponsors fund our hosting and GPU server bills.'
  },
  {
    question: 'Where should a new contributor start?',
    answer:
      'Pick one of the 11 public repositories above that matches your skills, read CONTRIBUTING.md, and look at open issues or ask in Discord before opening a pull request.'
  },
  {
    question: 'Why are the console engine repositories private?',
    answer:
      'Console SDKs for PlayStation, Nintendo Switch, and Xbox require vendor NDAs. Those three backend repositories stay private and do not accept outside pull requests.'
  },
  {
    question: 'Can universities, interns, or thesis students reach out?',
    answer: `Yes. If you want to propose a supervised student project, research topic, or academic collaboration, email ${Organization.emails.careers}.`
  }
];

function renderRepositoryGroup(group: RepositoryGroup, headingIdPrefix: string) {
  return (
    <section
      key={`${headingIdPrefix}-${group.id}`}
      aria-labelledby={`${headingIdPrefix}-${group.id}`}
      className={styles.repoGroup}
    >
      <div className={styles.repoGroupHeader}>
        <div className={styles.repoGroupTitleWrap}>
          <Heading as='h3' id={`${headingIdPrefix}-${group.id}`} size='5'>
            {group.title}
          </Heading>
          <Text as='p' size='200' variant='muted'>
            {group.subtitle}
          </Text>
        </div>
        <Token variant='default'>
          {group.repositories.length} {group.repositories.length === 1 ? 'repository' : 'repositories'}
        </Token>
      </div>

      <Grid>
        {group.repositories.map((repo) => (
          <Grid.Column key={repo.id} span={group.columnSpan}>
            <Box
              backgroundColor='default'
              borderColor='muted'
              borderRadius='large'
              borderStyle='solid'
              borderWidth='thin'
              className={clsx(styles.repoShowcaseCard, REPO_ACCENT_CLASS[repo.color])}
              padding='normal'
            >
              <div className={styles.repoHeader}>
                <div className={styles.repoIdentityWrap}>
                  <GpIcon hasBackground color={repo.color} icon={repo.icon} size='medium' />
                  <div className={styles.repoTitleBlock}>
                    <Text className={styles.repoOrgPrefix} font='monospace' size='100' variant='muted'>
                      {GITHUB_ORG_HANDLE}/
                    </Text>
                    <Heading as='h4' size='6'>
                      {repo.name}
                    </Heading>
                  </div>
                </div>
                <Label color={repo.color} size='small'>
                  {repo.stackBadge}
                </Label>
              </div>

              <Text as='p' className={styles.repoDescription} size='200' variant='muted'>
                {repo.description}
              </Text>

              <div className={styles.repoSkillsBand}>
                <div className={styles.repoSkillsLabelRow}>
                  <CodeIcon aria-hidden='true' size={12} />
                  <EyebrowText variant='muted'>Skills wanted</EyebrowText>
                </div>
                <div className={styles.repoSkillsList}>
                  {repo.skills.map((skill) => (
                    <Token key={skill} variant='outline'>
                      {skill}
                    </Token>
                  ))}
                </div>
              </div>

              <div className={styles.repoFooter}>
                <div className={styles.repoFooterMeta}>
                  <Token variant='default'>{repo.license}</Token>
                  <Text size='100' variant='muted'>
                    {repo.focusLabel}
                  </Text>
                </div>
                <Link arrowDirection='end' href={repo.url} rel='noopener noreferrer' target='_blank' variant='accent'>
                  Open repo
                </Link>
              </div>
            </Box>
          </Grid.Column>
        ))}
      </Grid>
    </section>
  );
}

export interface CareersViewProps {
  title: string;
  positions: readonly CareerPostingSummary[];
}

/**
 * @brief Client view for `/careers`, pairing a Bayer-dithered hero and floating briefcases with
 * CMS-backed openings when available and an interactive public repository skills directory.
 */
export const CareersView: React.FC<CareersViewProps> = ({ title, positions }) => {
  const { containerRef: heroDitherRef, DitherBackground: HeroDitherBackground } = useDitherBackground({
    dotOpacity: 0.24,
    interactiveCursor: false,
    maskMode: 'top-fade',
    palette: 'green',
    transparentBackground: true,
    type: 'ripple'
  });

  const openCountLabel =
    positions.length === 0
      ? 'Current status · 0 open roles'
      : `Open roles · ${positions.length} ${positions.length === 1 ? 'position' : 'positions'}`;

  return (
    <>
      <div ref={heroDitherRef} className={styles.heroBannerFrame}>
        <CareersFloatingBriefcases />
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
                {CAREERS_BREADCRUMBS.map((item, index) => (
                  <Breadcrumbs.Item
                    key={item.path}
                    href={item.path}
                    {...(index === CAREERS_BREADCRUMBS.length - 1 && { selected: true })}
                  >
                    {item.name}
                  </Breadcrumbs.Item>
                ))}
              </Breadcrumbs>
              <BreadcrumbJsonLd items={CAREERS_BREADCRUMBS} />
            </Grid.Column>

            <Grid.Column span={12}>
              <Hero align='center' className={styles.heroRoot}>
                <Hero.Label>Company · Hiring Status &amp; Contributions</Hero.Label>
                <Hero.Heading size='2'>{title}</Hero.Heading>
                <Hero.Description size='300'>
                  Graphical Playground is not open for paid roles right now. Because the platform is free and open
                  source, we cannot hire staff yet, while pull requests and open-source contributors are welcome across
                  every public repository.
                </Hero.Description>
                <Hero.ButtonGroup>
                  <Button as='a' href='#repositories' variant='primary'>
                    Browse repos &amp; skills
                  </Button>
                  <Button
                    as='a'
                    href={CONTRIBUTING_GUIDE_URL}
                    leadingVisual={<GitHubIcon />}
                    rel='noopener noreferrer'
                    target='_blank'
                    variant='secondary'
                  >
                    Read CONTRIBUTING.md
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
        id='open-positions'
        paddingBlockEnd='normal'
        paddingBlockStart='normal'
      >
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Open positions</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                Hiring status and CMS roles
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Formal roles are loaded directly from our CMS. When sponsorship or grant funding supports a hire, the
                listing appears here automatically.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          {positions.length > 0 ? (
            positions.map((role) => {
              const targetHref = role.applyUrl ?? Organization.mailto('careers');
              const ctaText = role.applyUrl
                ? 'View role details'
                : `Apply via ${role.contactEmail ?? Organization.emails.careers}`;

              return (
                <Grid.Column key={role.slug} span={{ xsmall: 12, medium: 6 }}>
                  <Card
                    fullWidth
                    hasBorder
                    backgroundColor='subtle'
                    className={styles.cmsRoleCard}
                    ctaText={ctaText}
                    href={targetHref}
                  >
                    <Card.Label variant='token'>
                      {DEPARTMENT_LABELS[role.department]} · {ENGAGEMENT_LABELS[role.engagement]} · {role.location}
                    </Card.Label>
                    <Card.Heading as='h3'>{role.title}</Card.Heading>
                    <Card.Description>{role.summary}</Card.Description>
                    {(role.skills.length > 0 || role.repositories.length > 0) && (
                      <Card.Tokens position='block-end'>
                        {role.skills.map((skill) => (
                          <Token key={skill} variant='outline'>
                            {skill}
                          </Token>
                        ))}
                        {role.repositories.map((repo) => (
                          <Token key={repo} variant='default'>
                            {repo}
                          </Token>
                        ))}
                      </Card.Tokens>
                    )}
                  </Card>
                </Grid.Column>
              );
            })
          ) : (
            <Grid.Column span={12}>
              <Box
                backgroundColor='subtle'
                borderColor='subtle'
                borderRadius='large'
                borderStyle='solid'
                borderWidth='thin'
                className={styles.statusCard}
                padding='normal'
              >
                <div className={styles.statusHeader}>
                  <EyebrowText variant='muted'>{openCountLabel}</EyebrowText>
                  <div className={styles.statusMeta}>
                    <Token variant='outline'>Not hiring right now</Token>
                    <Token variant='accent'>Open-source contributions open</Token>
                  </div>
                </div>

                <Heading as='h3' size='5'>
                  No staff positions are open at the moment
                </Heading>

                <Text as='p' size='200' variant='muted'>
                  Graphical Playground runs on volunteer maintainers and community backing, so we do not have payroll
                  budget for salaried or contract roles today. If you still want to contribute code, lessons, shaders,
                  or documentation, check the repository skills below. Academic teams and students proposing research
                  projects can email{' '}
                  <Link href={Organization.mailto('careers')} variant='accent'>
                    {Organization.emails.careers}
                  </Link>
                  .
                </Text>

                <div className={styles.statusActions}>
                  <Button as='a' href='#repositories' leadingVisual={<RepoIcon />} variant='primary'>
                    See needed skills by repo
                  </Button>
                  <Button as='a' href={Organization.mailto('careers')} leadingVisual={<MailIcon />} variant='secondary'>
                    Email {Organization.emails.careers}
                  </Button>
                  <Button as='a' href='/sponsors' variant='subtle'>
                    Help fund future roles
                  </Button>
                </div>
              </Box>
            </Grid.Column>
          )}
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='subtle' id='repositories' paddingBlockEnd='normal' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Open-source directory</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                Repositories and skills needed
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Filter by engineering track or browse all {TOTAL_PUBLIC_REPOS} public repositories accepting external
                pull requests and issue reports.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          <Grid.Column span={12}>
            <div className={styles.repoDirectoryTabs}>
              <Tabs align='start' aria-label='Filter repositories by engineering track' variant='underline'>
                <Tabs.Item>All ({TOTAL_PUBLIC_REPOS})</Tabs.Item>
                {REPOSITORY_GROUPS.map((group) => (
                  <Tabs.Item key={group.id}>
                    {group.shortTabLabel} ({group.repositories.length})
                  </Tabs.Item>
                ))}

                <Tabs.Panel>
                  <div className={styles.repoGroups}>
                    {REPOSITORY_GROUPS.map((group) => renderRepositoryGroup(group, 'all'))}
                  </div>
                </Tabs.Panel>

                {REPOSITORY_GROUPS.map((group) => (
                  <Tabs.Panel key={group.id}>
                    <div className={styles.repoGroups}>{renderRepositoryGroup(group, 'track')}</div>
                  </Tabs.Panel>
                ))}
              </Tabs>
            </div>

            <Box
              backgroundColor='default'
              borderColor='subtle'
              borderRadius='large'
              borderStyle='solid'
              borderWidth='thin'
              className={styles.privateNoticeBox}
              padding='normal'
            >
              <div className={styles.privateNoticeStack}>
                <div className={styles.statusMeta}>
                  <LockIcon aria-hidden='true' size={16} />
                  <Heading as='h3' size='6'>
                    Private console repositories (NDA restricted)
                  </Heading>
                </div>

                <Text as='p' size='200' variant='muted'>
                  Console graphics backends are kept private due to platform holder NDA agreements and cannot accept
                  external open-source pull requests. Public engine work happens in{' '}
                  <Link href={Repositories.GpEngine.url} rel='noopener noreferrer' target='_blank' variant='accent'>
                    {Repositories.GpEngine.displayName}
                  </Link>
                  .
                </Text>

                <div className={styles.privateRepoList}>
                  {PRIVATE_CONSOLE_REPOS.map((repoName) => (
                    <Token key={repoName} variant='outline'>
                      {repoName}
                    </Token>
                  ))}
                </div>
              </div>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>

      <Section
        fullWidth
        backgroundColor='default'
        id='how-to-contribute'
        paddingBlockEnd='normal'
        paddingBlockStart='normal'
      >
        <Grid>
          <Grid.Column span={12}>
            <SectionIntro fullWidth align='start'>
              <SectionIntro.Label>Getting started</SectionIntro.Label>
              <SectionIntro.Heading as='h2' size='3'>
                How open-source contributions work
              </SectionIntro.Heading>
              <SectionIntro.Description>
                A short path from browsing a repository to getting your first pull request merged cleanly.
              </SectionIntro.Description>
            </SectionIntro>
          </Grid.Column>

          {CONTRIBUTE_STEPS.map((step) => {
            const StepIcon = step.icon;

            return (
              <Grid.Column key={step.id} span={{ xsmall: 12, medium: 6, large: 4 }}>
                <Box
                  backgroundColor='subtle'
                  borderColor='subtle'
                  borderRadius='large'
                  borderStyle='solid'
                  borderWidth='thin'
                  className={styles.stepCard}
                  padding='normal'
                >
                  <Pillar>
                    <Pillar.Icon icon={<StepIcon size={24} />} />
                    <Pillar.Heading as='h3'>{step.title}</Pillar.Heading>
                    <Pillar.Description>{step.description}</Pillar.Description>
                  </Pillar>
                </Box>
              </Grid.Column>
            );
          })}
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='subtle' id='careers-faq' paddingBlockEnd='normal' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <FAQ variant='default'>
              <FAQ.Heading align='center' as='h2' size='3'>
                Questions about roles and contributing
              </FAQ.Heading>
              {CAREERS_FAQ_ITEMS.map((item) => (
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
              description='Answers about Graphical Playground hiring status, open-source contributions, needed repository skills, private console repos, and academic collaboration.'
              items={CAREERS_FAQ_ITEMS}
              name='Careers and Contributions Frequently Asked Questions'
              path='/careers'
            />
          </Grid.Column>
        </Grid>
      </Section>

      <Section fullWidth backgroundColor='default' paddingBlockEnd='spacious' paddingBlockStart='normal'>
        <Grid>
          <Grid.Column span={12}>
            <CTABanner hasBorder align='center' backgroundColor='subtle' variant='default'>
              <CTABanner.Heading as='h2'>Start contributing in the open</CTABanner.Heading>
              <CTABanner.Description>
                Explore the repositories on GitHub, talk with maintainers on Discord, or write to{' '}
                {Organization.emails.careers} with academic collaboration ideas.
              </CTABanner.Description>
              <CTABanner.ButtonGroup>
                <Button
                  as='a'
                  href={Organization.socials.github}
                  leadingVisual={<GitHubIcon />}
                  rel='noopener noreferrer'
                  target='_blank'
                  variant='primary'
                >
                  Explore GitHub organization
                </Button>
                <Button
                  as='a'
                  href={Organization.socials.discord}
                  leadingVisual={<DiscordIcon />}
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

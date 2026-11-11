// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { Organization, Repositories } from '@gp/constants';

/**
 * @brief Extensible partner entry for the homepage LogoSuite and partner spotlight features.
 * @details Add future partners or enable optional features (`badge`, `caseStudyHref`, `tier`) by
 * appending entries to {@link PARTNERS}. The homepage LogoSuite adapts automatically when more than one active
 * partner is configured.
 */
export interface HomePartnerEntry {
  readonly id: string;
  readonly name: string;
  readonly href: string;
  readonly logoSrc: string;
  readonly marqueeLogoSrc: string;
  readonly alt: string;
  readonly role: string;
  readonly location?: string;
  readonly tier: 'academic' | 'industry' | 'infrastructure' | 'community';
  readonly badge?: string;
  readonly caseStudyHref?: string;
  readonly enabled: boolean;
}

/**
 * @brief Partner directory backing the homepage LogoSuite.
 * @details Currently contains EPITECH as the sole active partner; add future partners here with `enabled: true`
 * to render multi-logo and marquee layouts automatically.
 */
export const PARTNERS: readonly HomePartnerEntry[] = [
  {
    id: 'epitech',
    name: 'EPITECH',
    href: '/sponsors',
    logoSrc: '/images/brands/epitech.svg',
    marqueeLogoSrc: '/images/marquees/epitech.svg',
    alt: 'EPITECH, European Institute of Technology',
    role: 'Founding Academic Home, EPITECH Innovative Project (EIP)',
    location: 'Lyon, France',
    tier: 'academic',
    badge: 'EIP Origin',
    enabled: true
  }
] as const;

export const ACTIVE_PARTNERS: readonly HomePartnerEntry[] = PARTNERS.filter((partner) => partner.enabled);

export const HERO_CURSOR_PHRASES: readonly string[] = [
  'FROM SCRATCH TO AAA',
  'LEARN TO ABSTRACT HARDWARE',
  'SEE THE CONCEPT BEFORE CODE',
  'REBUILD AN ENGINE IN BROWSER',
  'INSPECT EVERY RENDER PASS'
] as const;

export interface HomeBarrierItem {
  readonly id: string;
  readonly iconName: 'cloud' | 'eye' | 'cpu';
  readonly color: 'green' | 'teal' | 'lime';
  readonly title: string;
  readonly description: string;
}

export const PLATFORM_BARRIERS: readonly HomeBarrierItem[] = [
  {
    id: 'cloud-runners',
    iconName: 'cloud',
    color: 'green',
    title: 'Browser sandboxes backed by cloud GPUs',
    description:
      'Workstation GPUs price students out early. Cloud rendering workers let you compile shaders and inspect live 3D output from an ordinary laptop or Chromebook.'
  },
  {
    id: 'visual-first',
    iconName: 'eye',
    color: 'teal',
    title: 'See math move before editing C++',
    description:
      'Linear algebra stays abstract when it only sits inside headers. Lessons begin with interactive 3D diagrams and shader stages so pipeline data flow clicks visually first.'
  },
  {
    id: 'local-engine',
    iconName: 'cpu',
    color: 'lime',
    title: 'Run the same lessons on your own machine',
    description:
      'When you want to use local hardware, connect a local gp-engine worker to the workspace and run the identical curriculum directly on your GPU.'
  }
] as const;

export interface WorkbenchTabSpec {
  readonly id: 'visualizer' | 'engine' | 'cloud';
  readonly iconName: 'beaker' | 'code' | 'server';
  readonly heading: string;
  readonly description: string;
  readonly linkLabel: string;
  readonly href: string;
  readonly visualAlt: string;
}

export const WORKBENCH_TABS: readonly WorkbenchTabSpec[] = [
  {
    id: 'visualizer',
    iconName: 'beaker',
    heading: 'Interactive pipeline visualizers',
    description:
      'Adjust coordinate transforms, Bayer dithering, and render passes live in the page before changing shader source files.',
    linkLabel: 'Explore GP Studio',
    href: '/products/studio',
    visualAlt: 'Interactive 4-stage coordinate space visualizer inside GP Studio'
  },
  {
    id: 'engine',
    iconName: 'code',
    heading: 'A modular C++23 engine',
    description:
      'Read and replace subsystems inside gp-engine, from custom math types and arena allocators to desktop rendering backends.',
    linkLabel: 'Inspect GP Engine',
    href: '/products/engine',
    visualAlt: 'Modular C++23 subsystem layout for gp-engine'
  },
  {
    id: 'cloud',
    iconName: 'server',
    heading: 'Cloud containers or local GPU',
    description:
      'Compile shaders and C++23 scenes inside isolated remote workers or on your own machine and view rendered frames in your browser.',
    linkLabel: 'See GP Cloud architecture',
    href: '/products/cloud',
    visualAlt: 'Browser to cloud worker and local engine server execution flow'
  }
] as const;

export interface StudioAccordionSpec {
  readonly id: 'architecture' | 'curriculum' | 'standards' | 'certification';
  readonly iconName: 'repo' | 'book' | 'globe' | 'verified';
  readonly heading: string;
  readonly description: string;
  readonly linkLabel: string;
  readonly href: string;
  readonly external?: boolean;
}

export const STUDIO_ACCORDION_ITEMS: readonly StudioAccordionSpec[] = [
  {
    id: 'architecture',
    iconName: 'repo',
    heading: 'Organized like a multi-repo codebase',
    description:
      'Work across separate open source repositories for the engine, web learning app, shared build scripts, CI automation, and engineering standards.',
    linkLabel: 'Browse GitHub organization',
    href: Organization.socials.github,
    external: true
  },
  {
    id: 'curriculum',
    iconName: 'book',
    heading: 'Built with mentors, studio reviews, and research',
    description:
      'EPITECH provides educational guidance while we seek practicing studio engineers for feedback, attend graphics conferences, and distill technical reading into interactive labs.',
    linkLabel: 'See how curriculum is researched',
    href: '/about'
  },
  {
    id: 'standards',
    iconName: 'globe',
    heading: 'Designed for future screens beyond desktop',
    description:
      'Today the engine runs on desktop workstations and remote cloud containers. Platform-specific code stays behind explicit boundaries so mobile, TV, and console targets can be added later.',
    linkLabel: 'Read technical breakdowns',
    href: '/breakdowns'
  },
  {
    id: 'certification',
    iconName: 'verified',
    heading: 'Certifications backed by working projects',
    description:
      'Earn credentials by shipping compiled rendering projects reviewed against practical studio criteria so teams can read your code directly.',
    linkLabel: 'Learn about certifications',
    href: '/certifications'
  }
] as const;

/**
 * @brief Curated glossary slugs highlighted on the homepage Knowledge Matrix.
 */
export const FEATURED_GLOSSARY_SLUGS: readonly string[] = [
  'coordinate-spaces',
  'physically-based-rendering',
  'raytracing',
  'mesh-shader',
  'variable-rate-shading',
  '3d-gaussian-splatting'
] as const;

export const HOME_COURSE_DATA = {
  name: '3D Graphics Engineering & C++23 Engine Curriculum',
  description:
    'An open source online curriculum covering 3D math from scratch, render graphs, shader pipelines, physically based shading, ray tracing, and modern studio rendering techniques.',
  educationalLevel: 'Beginner to Advanced',
  inLanguage: 'en',
  path: '/curriculum',
  prerequisites: 'Foundational C++ or systems programming familiarity'
} as const;

export const HOME_REPO_HIGHLIGHTS = [
  {
    name: Repositories.GpEngine.name,
    description: 'Modular C++23 graphics engine built with portable desktop rendering backends.',
    url: Repositories.GpEngine.url
  },
  {
    name: Repositories.GpPlatform.name,
    description: 'Interactive web learning platform built with Next.js and Gridline UI.',
    url: Repositories.GpPlatform.url
  },
  {
    name: Repositories.GpInfrastructure.name,
    description: 'Containerized cloud graphics runners for browser execution.',
    url: Repositories.GpInfrastructure.url
  },
  {
    name: Repositories.GpHandbook.name,
    description: 'Technical manuals explaining engine math and memory design.',
    url: Repositories.GpHandbook.url
  }
] as const;

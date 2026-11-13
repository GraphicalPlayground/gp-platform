// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { Organization } from '@gp/constants';
import type { IconColor, labelColors } from '@gp/ui/components';

export type RouteStateIconName =
  | 'alert'
  | 'book'
  | 'breakdowns'
  | 'discord'
  | 'faq'
  | 'github'
  | 'glossary'
  | 'guides'
  | 'legal'
  | 'lock'
  | 'search'
  | 'shield-lock'
  | 'status';

export type RouteStateLabelTone = Extract<(typeof labelColors)[number], 'blue' | 'green' | 'orange' | 'purple' | 'red'>;

export interface RouteStateLinkAction {
  kind: 'link';
  label: string;
  href: string;
  external?: boolean;
}

export interface RouteStateButtonAction {
  kind: 'button';
  label: string;
  icon?: 'reload' | 'arrow';
  onClick: () => void;
}

export type RouteStateAction = RouteStateLinkAction | RouteStateButtonAction;

export interface RouteStateBreadcrumb {
  label: string;
  href: string;
}

export interface RouteStateDestination {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaText: string;
  color: IconColor;
  icon: RouteStateIconName;
}

export const ROUTE_STATE_COMMON_CARDS = {
  breakdowns: {
    color: 'green',
    ctaText: 'Read breakdowns',
    description: 'Engineering notes on engine directory structure, memory allocators, and Vulkan rendering.',
    eyebrow: 'Engineering',
    href: '/breakdowns',
    icon: 'breakdowns',
    title: 'Technical Breakdowns'
  },
  docs: {
    color: 'indigo',
    ctaText: 'Open docs',
    description: 'Architecture guides, API references, and setup documentation for Graphical Playground.',
    eyebrow: 'Documentation',
    href: Organization.subdomain('docs'),
    icon: 'book',
    title: 'Platform Documentation'
  },
  faq: {
    color: 'indigo',
    ctaText: 'Read FAQ',
    description: 'Answers about gp-engine, cloud rendering, hardware requirements, and open-source repos.',
    eyebrow: 'Support',
    href: '/faq',
    icon: 'faq',
    title: 'Frequently Asked Questions'
  },
  github: {
    color: 'indigo',
    ctaText: 'View repositories',
    description: 'Source code and issue trackers for gp-engine, gp-platform, and shared build tools.',
    eyebrow: 'Open Source',
    href: Organization.socials.github,
    icon: 'github',
    title: 'GitHub Organization'
  },
  glossary: {
    color: 'blue',
    ctaText: 'Browse glossary',
    description: 'Definitions for shader stages, GPU pipeline steps, culling methods, and rendering math.',
    eyebrow: 'Reference',
    href: '/glossary',
    icon: 'glossary',
    title: 'Graphics Glossary'
  },
  legal: {
    color: 'teal',
    ctaText: 'Read legal docs',
    description: 'Terms of service, privacy policy, licensing notices, and security disclosure rules.',
    eyebrow: 'Governance',
    href: '/legal',
    icon: 'legal',
    title: 'Legal Directory'
  },
  status: {
    color: 'orange',
    ctaText: 'Check status',
    description: 'Live uptime and incident reports for Graphical Playground websites and cloud runners.',
    eyebrow: 'Operations',
    href: Organization.subdomain('status'),
    icon: 'status',
    title: 'System Status'
  }
} satisfies Record<string, RouteStateDestination>;

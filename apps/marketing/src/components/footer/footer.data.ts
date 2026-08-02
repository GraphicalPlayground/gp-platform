// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { FooterLinkSection, LegalLink } from './footer.types';
import type { SocialLink } from '@gp/ui/components';

/**
 * @brief The data for the footer sections.
 */
export const footerSections: FooterLinkSection[] = [
  {
    title: 'Platform',
    id: 'footer-title-platform',
    context: 'platform',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Curriculum', href: '/curriculum' },
      { label: 'Handbook', href: '/handbook' },
      { label: 'Roadmaps', href: '/roadmaps' },
      { label: 'Changelogs', href: '/changelogs' },
      { label: 'Showcases', href: '/showcases' },
      { label: 'Research', href: '/research' },
      { label: 'Testimonials', href: '/testimonials' }
    ]
  },
  {
    title: 'Ecosystem',
    id: 'footer-title-ecosystem',
    context: 'ecosystem',
    links: [
      { label: 'Developer API', href: 'https://docs.graphical-playground.com/docs/api/intro' },
      { label: 'Github Organization', href: 'https://github.com/GraphicalPlayground' },
      { label: 'GP Engine', href: '/products/engine' },
      { label: 'GP Cloud', href: '/products/cloud' },
      { label: 'GP Studio', href: '/products/studio' },
      { label: 'GP Platform', href: '/products/platform' }
    ]
  },
  {
    title: 'Resources',
    id: 'footer-title-resources',
    context: 'resources',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Community', href: '/community' },
      { label: 'Status', href: 'https://status.graphical-playground.com' },
      { label: 'Site Map', href: '/sitemap' },
      { label: 'Technical Breakdowns', href: '/breakdowns' },
      { label: 'Comparisons', href: '/comparisons' },
      { label: 'Glossary', href: '/glossary' },
      { label: 'Guides', href: '/guides' },
      { label: 'Interviews', href: '/interviews' },
      { label: 'Technical Articles', href: '/tech-articles' },
      { label: 'Brand Guidelines', href: '/brand-guidelines' }
    ]
  },
  {
    title: 'Company',
    id: 'footer-title-company',
    context: 'company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Sponsors', href: '/sponsors' },
      { label: 'Donate', href: '/donate' },
      { label: 'Events', href: '/events' },
      { label: 'Press & Media', href: '/press' },
      { label: 'Accessibility Statement', href: '/accessibility' },
      { label: 'Security Statement', href: '/security' },
      { label: 'Legal', href: '/legal' }
    ]
  }
] as const;

/**
 * @brief The social links for the footer.
 */
export const socialLinks: SocialLink[] = [
  {
    srLabel: 'Graphical Playground on LinkedIn',
    url: 'https://www.linkedin.com/company/graphical-playground',
    iconName: 'linkedin'
  },
  {
    srLabel: 'Graphical Playground\u2019s organization on Github',
    url: 'https://github.com/GraphicalPlayground',
    iconName: 'github'
  },
  {
    srLabel: 'Graphical Playground on Discord',
    url: 'https://discord.graphical-playground.com',
    iconName: 'discord'
  }
] as const;

/**
 * @brief The legal links for the footer.
 */
export const legalLinks: LegalLink[] = [
  { label: 'Terms', href: '/legal/terms-of-service' },
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Eula', href: '/legal/eula' },
  { label: 'Cookies', href: '/legal/cookies' },
  { label: 'Data Processing', href: '/legal/data-processing' },
  { label: 'Accessibility', href: '/legal/accessibility' },
  { label: 'Security', href: '/legal/security' }
] as const;

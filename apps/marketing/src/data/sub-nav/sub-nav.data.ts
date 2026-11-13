// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { MarketingSubNavProps, SubNavItem } from '@/components/marketing-sub-nav';

export const productsSubNav: MarketingSubNavProps = {
  action: { href: '/pricing', label: 'Pricing' },
  heading: { href: '/products', label: 'Products' },
  links: [
    { href: '/products', label: 'Overview' },
    { href: '/products/engine', label: 'GP Engine' },
    { href: '/products/cloud', label: 'GP Cloud' },
    { href: '/products/studio', label: 'GP Studio' },
    { href: '/products/platform', label: 'GP Platform' },
    { href: '/products/handbook', label: 'GP Handbook' }
  ]
};

export const legalSubNav: MarketingSubNavProps = {
  action: { href: '/contact', label: 'Contact us' },
  heading: { href: '/legal', label: 'Legal' },
  links: [
    { href: '/legal', label: 'Overview' },
    {
      label: 'Policies',
      links: [
        { href: '/legal/terms-of-service', label: 'Terms of Service' },
        { href: '/legal/privacy', label: 'Privacy Policy' },
        { href: '/legal/cookies', label: 'Cookie Policy' },
        { href: '/legal/acceptable-use', label: 'Acceptable Use Policy' },
        { href: '/legal/eula', label: 'End User License Agreement' }
      ]
    },
    {
      label: 'Compliance',
      links: [
        { href: '/legal/data-processing', label: 'Data Processing Addendum' },
        { href: '/legal/gdpr-compliance', label: 'GDPR Compliance' },
        { href: '/legal/subprocessors', label: 'Subprocessors' },
        { href: '/legal/oss-notices', label: 'Open Source Notices' }
      ]
    },
    { href: '/accessibility', label: 'Accessibility' },
    { href: '/security', label: 'Security' }
  ]
};

export const helpSubNav: MarketingSubNavProps = {
  action: { href: '/contact', label: 'Contact us' },
  heading: { href: '/help', label: 'Help Center' },
  links: [
    { href: '/help', label: 'Overview' },
    { href: '/faq', label: 'FAQ' },
    { href: '/community', label: 'Community' },
    { href: 'https://docs.graphical-playground.com', label: 'Documentation' },
    { href: 'https://status.graphical-playground.com', label: 'System Status' }
  ]
};

export const communitySubNav: MarketingSubNavProps = {
  action: { href: 'https://discord.graphical-playground.com', label: 'Join Discord' },
  heading: { href: '/community', label: 'Community' },
  links: [
    { href: '/community', label: 'Overview' },
    { href: '/events', label: 'Events' },
    { href: '/showcases', label: 'Showcases', match: 'prefix' },
    { href: '/interviews', label: 'Interviews', match: 'prefix' },
    { href: 'https://github.com/GraphicalPlayground', label: 'GitHub' }
  ]
};

export const curriculumSubNav: MarketingSubNavProps = {
  action: { href: '/sign-up', label: 'Get started' },
  heading: { href: '/curriculum', label: 'Curriculum' },
  links: [
    { href: '/curriculum', label: 'Overview' },
    { href: '/guides', label: 'Guides', match: 'prefix' },
    { href: '/breakdowns', label: 'Breakdowns', match: 'prefix' },
    { href: '/tech-articles', label: 'Articles', match: 'prefix' },
    { href: '/glossary', label: 'Glossary', match: 'prefix' },
    { href: '/research', label: 'Research', match: 'prefix' }
  ]
};

export const sitemapSubNav: MarketingSubNavProps = {
  heading: { href: '/sitemap', label: 'Site Map' },
  links: [
    { href: '/products', label: 'Products' },
    { href: '/curriculum', label: 'Curriculum' },
    { href: '/guides', label: 'Guides' },
    { href: '/help', label: 'Help Center' },
    { href: '/legal', label: 'Legal' }
  ]
};

const learningContentLinks: SubNavItem[] = [
  { href: '/guides', label: 'Guides', match: 'prefix' },
  { href: '/breakdowns', label: 'Breakdowns', match: 'prefix' },
  { href: '/tech-articles', label: 'Articles', match: 'prefix' },
  { href: '/glossary', label: 'Glossary', match: 'prefix' },
  { href: '/interviews', label: 'Interviews', match: 'prefix' },
  {
    label: 'More',
    links: [
      { href: '/curriculum', label: 'Curriculum' },
      { href: '/research', label: 'Research', match: 'prefix' },
      { href: '/showcases', label: 'Showcases', match: 'prefix' },
      { href: '/comparisons', label: 'Comparisons', match: 'prefix' },
      { href: '/testimonials', label: 'Testimonials', match: 'prefix' }
    ]
  }
];

const updatesContentLinks: SubNavItem[] = [
  { href: '/roadmaps', label: 'Roadmaps', match: 'prefix' },
  { href: '/changelogs', label: 'Changelogs', match: 'prefix' },
  { href: '/features', label: 'Features' },
  { href: '/products', label: 'Products' },
  { href: '/research', label: 'Research', match: 'prefix' }
];

const evidenceContentLinks: SubNavItem[] = [
  { href: '/showcases', label: 'Showcases', match: 'prefix' },
  { href: '/research', label: 'Research', match: 'prefix' },
  { href: '/comparisons', label: 'Comparisons', match: 'prefix' },
  { href: '/testimonials', label: 'Testimonials', match: 'prefix' },
  { href: '/curriculum', label: 'Curriculum' }
];

export const contentSubNavs = {
  breakdowns: {
    action: { href: '/curriculum', label: 'Curriculum' },
    heading: { href: '/breakdowns', label: 'Breakdowns' },
    links: learningContentLinks
  },
  changelogs: {
    action: { href: '/products', label: 'View products' },
    heading: { href: '/changelogs', label: 'Changelogs' },
    links: updatesContentLinks
  },
  comparisons: {
    action: { href: '/sign-up', label: 'Get started' },
    heading: { href: '/comparisons', label: 'Comparisons' },
    links: evidenceContentLinks
  },
  glossary: {
    action: { href: '/curriculum', label: 'Curriculum' },
    heading: { href: '/glossary', label: 'Glossary' },
    links: learningContentLinks
  },
  guides: {
    action: { href: '/curriculum', label: 'Curriculum' },
    heading: { href: '/guides', label: 'Guides' },
    links: learningContentLinks
  },
  interviews: {
    action: { href: '/curriculum', label: 'Curriculum' },
    heading: { href: '/interviews', label: 'Interviews' },
    links: learningContentLinks
  },
  research: {
    action: { href: '/sign-up', label: 'Get started' },
    heading: { href: '/research', label: 'Research' },
    links: evidenceContentLinks
  },
  roadmaps: {
    action: { href: '/products', label: 'View products' },
    heading: { href: '/roadmaps', label: 'Roadmaps' },
    links: updatesContentLinks
  },
  showcases: {
    action: { href: '/sign-up', label: 'Get started' },
    heading: { href: '/showcases', label: 'Showcases' },
    links: evidenceContentLinks
  },
  techArticles: {
    action: { href: '/curriculum', label: 'Curriculum' },
    heading: { href: '/tech-articles', label: 'Articles' },
    links: learningContentLinks
  },
  testimonials: {
    action: { href: '/sign-up', label: 'Get started' },
    heading: { href: '/testimonials', label: 'Testimonials' },
    links: evidenceContentLinks
  }
} satisfies Record<string, MarketingSubNavProps>;

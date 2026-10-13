// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import {
  CpuIcon,
  CloudIcon,
  DeviceDesktopIcon,
  StackIcon,
  BookIcon,
  StarIcon,
  TerminalIcon,
  MilestoneIcon,
  HistoryIcon,
  MortarBoardIcon,
  TrophyIcon,
  BeakerIcon,
  CommentDiscussionIcon,
  GitCompareIcon,
  RepoIcon,
  ToolsIcon,
  FileDirectoryIcon,
  TypographyIcon,
  MegaphoneIcon,
  QuestionIcon,
  PeopleIcon,
  MarkGithubIcon,
  PulseIcon,
  ListUnorderedIcon,
  InfoIcon,
  MailIcon,
  SponsorTiersIcon,
  GiftIcon,
  BroadcastIcon,
  BriefcaseIcon,
  PaintbrushIcon
} from '@primer/octicons-react';
import type { HeaderNavData } from './header.types'; // Adjust based on your types location

export const headerNavData: HeaderNavData = [
  {
    render: true,
    title: 'Platform',
    groups: [
      {
        title: 'PRODUCTS',
        items: [
          {
            title: 'GP Engine',
            url: '/products/engine',
            subtitle: 'High-performance graphics rendering core',
            icon: CpuIcon
          },
          {
            title: 'GP Cloud',
            url: '/products/cloud',
            subtitle: 'Deploy and scale your projects globally',
            icon: CloudIcon
          },
          {
            title: 'GP Studio',
            url: '/products/studio',
            subtitle: 'Interactive visual workspace and editor',
            icon: DeviceDesktopIcon
          },
          {
            title: 'GP Platform',
            url: '/products/platform',
            subtitle: 'The foundation for your ecosystem',
            icon: StackIcon
          },
          {
            title: 'GP Handbook',
            url: '/products/handbook',
            subtitle: 'Official product guides and manuals',
            icon: BookIcon
          }
        ]
      },
      {
        title: 'OVERVIEW',
        items: [
          {
            title: 'Features',
            url: '/features',
            subtitle: 'Discover what you can build',
            icon: StarIcon
          },
          {
            title: 'Developer API',
            url: 'https://docs.graphical-playground.com/docs/api/intro',
            subtitle: 'Integrate GP programmatically',
            icon: TerminalIcon
          },
          {
            title: 'Roadmaps',
            url: '/roadmaps',
            subtitle: 'See what we are building next',
            icon: MilestoneIcon
          },
          {
            title: 'Changelogs',
            url: '/changelogs',
            subtitle: 'Track recent updates and fixes',
            icon: HistoryIcon
          }
        ]
      }
    ]
  },
  {
    render: true,
    title: 'Solutions',
    groups: [
      {
        title: 'USE CASES & EVIDENCE',
        items: [
          {
            title: 'Curriculum',
            url: '/curriculum',
            subtitle: 'Educational paths and training materials',
            icon: MortarBoardIcon
          },
          {
            title: 'Showcases',
            url: '/showcases',
            subtitle: 'Explore what the community has built',
            icon: TrophyIcon
          },
          {
            title: 'Research',
            url: '/research',
            subtitle: 'Academic and technical papers',
            icon: BeakerIcon
          },
          {
            title: 'Testimonials',
            url: '/testimonials',
            subtitle: 'Read success stories from our users',
            icon: CommentDiscussionIcon
          },
          {
            title: 'Comparisons',
            url: '/comparisons',
            subtitle: 'See how GP stacks up against alternatives',
            icon: GitCompareIcon
          }
        ]
      }
    ]
  },
  {
    render: true,
    title: 'Resources',
    groups: [
      {
        title: 'LEARNING & CONTENT',
        items: [
          {
            title: 'Guides',
            url: '/guides',
            subtitle: 'Step-by-step tutorials and walkthroughs',
            icon: RepoIcon
          },
          {
            title: 'Technical Breakdowns',
            url: '/breakdowns',
            subtitle: 'Deep dives into engine architecture',
            icon: ToolsIcon
          },
          {
            title: 'Technical Articles',
            url: '/tech-articles',
            subtitle: 'Engineering blog posts and insights',
            icon: FileDirectoryIcon
          },
          {
            title: 'Glossary',
            url: '/glossary',
            subtitle: 'Definitions of key platform terms',
            icon: TypographyIcon
          },
          {
            title: 'Interviews',
            url: '/interviews',
            icon: MegaphoneIcon
          }
        ]
      },
      {
        title: 'SUPPORT & COMMUNITY',
        items: [
          {
            title: 'Help Center',
            url: '/help',
            subtitle: 'Get answers to common issues',
            icon: QuestionIcon
          },
          {
            title: 'Community',
            url: '/community',
            subtitle: 'Join the conversation on Discord',
            icon: PeopleIcon
          },
          {
            title: 'Github Organization',
            url: 'https://github.com/GraphicalPlayground',
            subtitle: 'Contribute to our open source repos',
            icon: MarkGithubIcon
          },
          {
            title: 'System Status',
            url: 'https://status.graphical-playground.com',
            subtitle: 'Check platform uptime and incidents',
            icon: PulseIcon
          },
          {
            title: 'Site Map',
            url: '/sitemap',
            icon: ListUnorderedIcon
          }
        ]
      }
    ]
  },
  {
    render: true,
    title: 'Company',
    groups: [
      {
        title: 'LEARN ABOUT GRAPHICAL PLAYGROUND',
        items: [
          {
            title: 'About Us',
            url: '/about',
            subtitle: 'Our mission and story',
            icon: InfoIcon
          },
          {
            title: 'Contact Us',
            url: '/contact',
            subtitle: 'Get in touch with the team',
            icon: MailIcon
          },
          {
            title: 'Our Sponsors',
            url: '/sponsors',
            subtitle: 'The organizations backing our work',
            icon: SponsorTiersIcon
          },
          {
            title: 'Donate',
            url: '/donate',
            subtitle: 'Support our open source initiatives',
            icon: GiftIcon
          },
          {
            title: 'Press',
            url: '/press',
            icon: BroadcastIcon
          },
          {
            title: 'Careers',
            url: '/careers',
            subtitle: 'Join our growing team',
            icon: BriefcaseIcon
          },
          {
            title: 'Brand Guidelines',
            url: '/brand-guidelines',
            icon: PaintbrushIcon
          }
        ]
      }
    ]
  },
  {
    render: true,
    title: 'Pricing',
    url: '/pricing'
  }
] as const;

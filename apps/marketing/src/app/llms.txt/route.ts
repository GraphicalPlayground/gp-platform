// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { SeoLlms } from '@gp/seo/llms';
import { Constants, Urls } from '@gp/seo/utils';

/**
 * @brief Serves `/llms.txt`, a concise markdown summary of the site for AI agents and answer engines to consume.
 * @see https://llmstxt.org
 */
export function GET(): Response {
  const body = SeoLlms.build({
    name: `${Constants.name} - llms.txt`,
    summary: [
      "Graphical Playground is an open-source e-learning platform built to democratize AAA graphics engineering and engine architecture. The platform's goal is to make the knowledge behind modern real-time rendering available to anyone who wants to learn it, regardless of their hardware or background. It actively addresses the two primary barriers that keep people out of the field: expensive hardware access and a severe knowledge gap between beginner resources and AAA studio expectations.",
      'To eliminate the hardware barrier, the platform relies on containerized cloud rendering environments based on the Open Container Initiative. This setup allows learners on low-spec hardware to compile, run, and debug high-end Vulkan pipelines entirely through a browser. For those who prefer it, the platform also supports running an engine server locally on personal hardware while remaining connected to the learning environment.',
      'The educational experience is driven by `gp-engine`, a core graphics engine written in modern C++23. Unlike commercial engines that act as black boxes, `gp-engine` is built around a deconstructive philosophy. Every engine module is designed to be readable, understood, and replaceable by learners, exposing the complete process of how a production-grade engine is constructed.'
    ],
    baseUrl: Urls.BaseUrl,
    sections: [
      {
        heading: 'Technical Overview',
        links: [
          {
            title: 'gp-engine',
            path: 'https://github.com/GraphicalPlayground/gp-engine',
            description:
              'The core graphics engine is built with strict platform abstraction layers. It targets recent graphics backends (DirectX 12, Metal, Vulkan) and older ones (OpenGL, DirectX 11), with designs intended to support NDA-protected console targets like PlayStation 5, Xbox Series, and Nintendo Switch.'
          },
          {
            title: 'gp-platform',
            path: 'https://github.com/GraphicalPlayground/gp-platform',
            description: 'The interactive e-learning platform is built on Next.js.'
          },
          {
            title: 'Infrastructure',
            path: 'https://github.com/GraphicalPlayground/gp-infrastructure',
            description:
              'The platform uses containerized cloud rendering based on the Open Container Initiative. This allows learners on low-spec hardware to compile and run high-end Vulkan pipelines directly in the browser.'
          }
        ]
      },
      {
        heading: 'Core Resources',
        links: [
          {
            title: 'Github Organization',
            path: 'https://github.com/GraphicalPlayground',
            description: 'Home to the engine, platform monorepo, and build systems.'
          },
          {
            title: 'Documentation',
            path: 'https://docs.graphical-playground.com',
            description: 'The official documentation for the platform and engine.'
          },
          {
            title: 'Blog',
            path: 'https://docs.graphical-playground.com/blog',
            description: 'The development blog for the platform and engine.'
          }
        ]
      },
      {
        heading: 'Product',
        links: [
          { title: 'About', path: '/about', description: 'Who builds Graphical Playground and why.' },
          { title: 'Pricing', path: '/pricing', description: "Information about the platform's pricing plans." },
          { title: 'Security', path: '/security', description: "Details about the platform's security measures." },
          { title: 'Products', path: '/products', description: "Overview of the platform's products and services." }
        ]
      },
      {
        heading: 'Articles',
        links: [
          {
            title: 'Changelogs',
            path: '/changelogs',
            description: 'Public release notes detailing new features, improvements, fixes, and breaking changes.'
          },
          {
            title: 'Breakdowns',
            path: '/breakdowns',
            description:
              'End-to-end dissections of specific technologies or systems (e.g., rendering pipelines), including prerequisites and primary sources.'
          },
          {
            title: 'Comparisons',
            path: '/comparisons',
            description:
              'Analytical articles comparing different graphics technologies, engines, systems or ways of learning them.'
          },
          {
            title: 'Glossary',
            path: '/glossary',
            description: 'Definitions and explanations of technical terms and concepts used in graphics engineering.'
          },
          {
            title: 'Guides',
            path: '/guides',
            description: 'Instructional content and tutorials for learning specific graphics programming techniques.'
          },
          {
            title: 'Interviews',
            path: '/interviews',
            description: 'Conversations with named industry professionals across text, video, or podcast formats.'
          },
          {
            title: 'Research',
            path: '/research',
            description: 'Rigorous, data-backed writeups featuring abstracts, methodologies, references, and datasets.'
          },
          {
            title: 'Roadmaps',
            path: '/roadmaps',
            description: 'Forward-looking plans tracking the status of planned, in-progress, and shipped features.'
          },
          {
            title: 'Showcases',
            path: '/showcases',
            description:
              'Spotlights on learner projects, including repository links, technologies used, and associated certificates.'
          },
          {
            title: 'Tech Articles',
            path: '/tech-articles',
            description:
              'General technical writeups and content related to graphics engineering and engine architecture.'
          }
        ]
      },
      {
        heading: 'Community',
        links: [
          { title: 'Discord', path: 'https://discord.graphical-playground.com' },
          { title: 'Community', path: '/community' },
          { title: 'Events', path: '/events' },
          { title: 'Careers', path: '/careers' },
          { title: 'Sponsors', path: '/sponsors', description: 'Featured sponsors of the platform.' },
          {
            title: 'Donate',
            path: '/donate',
            description: 'Support the platform and engine development through one-time or recurring donations.'
          }
        ]
      },
      {
        heading: 'Support',
        links: [
          { title: 'Help', path: '/help' },
          { title: 'Contact', path: '/contact' },
          { title: 'Legal', path: '/legal' },
          { title: 'Accessibility', path: '/accessibility' }
        ]
      }
    ],
    footnotes: ['End of llms.txt']
  });

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

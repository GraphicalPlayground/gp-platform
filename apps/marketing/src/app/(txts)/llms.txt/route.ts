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
      'Graphical Playground is an open-source e-learning platform for graphics engineering and engine architecture. Its goal is to make modern real-time rendering accessible to anyone, regardless of hardware or background, by solving two barriers: expensive GPU hardware and the gap between beginner tutorials and AAA studio expectations.',
      'To eliminate the hardware barrier, the platform uses containerized cloud rendering environments based on the Open Container Initiative. This setup allows learners on low-spec hardware to compile, run, and debug high-end Vulkan pipelines directly in a browser. Learners can also run an engine server locally on personal hardware while staying connected to the platform.',
      'The learning environment runs on `gp-engine`, a C++23 graphics engine built so each module can be read, understood, and replaced by learners rather than hidden behind a commercial black box.'
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
          {
            title: 'About',
            path: '/about',
            description: 'The founding team, EPITECH origins, and teaching philosophy.'
          },
          {
            title: 'Features',
            path: '/features',
            description: 'Interactive pipeline diagrams, shader labs, cloud GPU execution, and certifications.'
          },
          {
            title: 'Curriculum',
            path: '/curriculum',
            description: 'Structured learning paths from graphics math to AAA rendering.'
          },
          {
            title: 'Pricing',
            path: '/pricing',
            description: 'Cloud rendering subscription plans and free local engine access.'
          },
          { title: 'Waitlist', path: '/waitlist', description: 'Request early access to the interactive platform.' },
          { title: 'Products', path: '/products', description: 'Overview of the Graphical Playground ecosystem.' },
          {
            title: 'GP Engine',
            path: '/products/engine',
            description: 'Open-source C++23 graphics engine targeting Vulkan, DirectX, Metal, and OpenGL.'
          },
          {
            title: 'GP Cloud',
            path: '/products/cloud',
            description: 'OCI containerized cloud GPU sandboxes for browser-based Vulkan execution.'
          },
          {
            title: 'GP Studio',
            path: '/products/studio',
            description: 'Visual frame debugger and shader workspace in the browser.'
          },
          {
            title: 'GP Platform',
            path: '/products/platform',
            description: 'Next.js learning platform tying curriculum, execution, and tracking together.'
          },
          {
            title: 'GP Handbook',
            path: '/products/handbook',
            description: 'Theory-to-implementation guide for graphics engineering patterns.'
          },
          {
            title: 'Certifications',
            path: '/certifications',
            description:
              'Overview of the project-based certification system, evaluation criteria, and public verification.'
          }
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
          },
          {
            title: 'Testimonials',
            path: '/testimonials',
            description: 'Feedback and stories from learners and graphics engineers.'
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
          },
          { title: 'Press', path: '/press', description: 'Media kit, assets, and press contact information.' },
          {
            title: 'Brand Guidelines',
            path: '/brand-guidelines',
            description: 'Logos, typography, and color usage rules.'
          }
        ]
      },
      {
        heading: 'Support',
        links: [
          {
            title: 'FAQ',
            path: '/faq',
            description: 'Answers about Graphical Playground, gp-engine, hardware requirements, and curriculum.'
          },
          { title: 'Help', path: '/help' },
          {
            title: 'Contact',
            path: '/contact',
            description:
              'Direct email directory (14 team inboxes including contact, support, security, privacy, legal, press, partnerships, sponsor, billing, careers, feedback, marketing, accessibility, and abuse), Discord, GitHub, LinkedIn, and postal mail c/o EPITECH Lyon (2 Rue du Professeur Charles Appleton, 69007 Lyon, France).'
          },
          {
            title: 'Security',
            path: '/security',
            description: 'Vulnerability disclosure policy, scope, and safe harbor.'
          },
          { title: 'Legal', path: '/legal' },
          { title: 'Accessibility', path: '/accessibility' },
          { title: 'Site Map', path: '/sitemap' }
        ]
      }
    ],
    footnotes: [
      `See [llms-full.txt](${Urls.BaseUrl}/llms-full.txt) for the full text of every article.`,
      '',
      'End of llms.txt'
    ]
  });

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
    }
  });
}

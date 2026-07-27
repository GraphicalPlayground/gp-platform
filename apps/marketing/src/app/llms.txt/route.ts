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
    name: Constants.name,
    summary: Constants.description,
    baseUrl: Urls.BaseUrl,
    sections: [
      {
        heading: 'Product',
        links: [
          { title: 'About', path: '/about', description: 'Who builds Graphical Playground and why.' },
          { title: 'Pricing', path: '/pricing' },
          { title: 'Security', path: '/security' }
        ]
      },
      {
        heading: 'Community',
        links: [
          { title: 'Community', path: '/community' },
          { title: 'Events', path: '/events' },
          { title: 'Careers', path: '/careers' },
          { title: 'Sponsors', path: '/sponsors' }
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
    ]
  });

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

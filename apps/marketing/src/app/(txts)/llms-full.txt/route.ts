// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { SeoLlms } from '@gp/seo/llms';
import type { LlmsSection } from '@gp/seo/llms';
import { Constants, Urls } from '@gp/seo/utils';
import type { Article, MdxDocument } from '@gp/content';
import { cms } from '@/lib/cms';

const ARTICLE_TYPE_HEADINGS: Record<Article['type'], string> = {
  'breakdown': 'Breakdowns',
  'changelog': 'Changelogs',
  'comparison': 'Comparisons',
  'glossary': 'Glossary',
  'guide': 'Guides',
  'interview': 'Interviews',
  'research': 'Research',
  'roadmap': 'Roadmaps',
  'showcase': 'Showcases',
  'tech-article': 'Tech Articles',
  'testimonial': 'Testimonials'
};

/**
 * @brief Groups published, indexable articles by their `type`, in the same order as {@link ARTICLE_TYPE_HEADINGS}.
 * @param docs - Every article document to group.
 */
function groupArticlesByType(docs: MdxDocument<Article>[]): LlmsSection[] {
  const byType = new Map<Article['type'], MdxDocument<Article>[]>();

  for (const doc of docs) {
    if (doc.frontmatter.noindex) continue;

    const bucket = byType.get(doc.frontmatter.type) ?? [];

    bucket.push(doc);
    byType.set(doc.frontmatter.type, bucket);
  }

  return Object.keys(ARTICLE_TYPE_HEADINGS)
    .filter((type): type is Article['type'] => byType.has(type as Article['type']))
    .map((type) => ({
      heading: ARTICLE_TYPE_HEADINGS[type],
      links: byType.get(type)!.map((doc) => ({
        title: doc.frontmatter.title,
        path: `/${type}/${doc.slug}`,
        description: doc.frontmatter.description,
        content: doc.rawContent
      }))
    }));
}

/**
 * @brief Serves `/llms-full.txt`, the full-content counterpart to `/llms.txt`: every published
 * article, inlined in full so an LLM can ingest the entire curriculum in one fetch instead of
 * crawling each page individually. Legal documents are deliberately excluded - they're boilerplate
 * an LLM has no reason to learn or cite, and stay fully crawlable via the sitemap on their own.
 * @see https://llmstxt.org
 */
export async function GET(): Promise<Response> {
  const articles = await cms.articles.getAll({ locale: 'en' });
  const sections = groupArticlesByType(articles);

  const body = SeoLlms.buildFull({
    name: `${Constants.name} - llms-full.txt`,
    summary: [
      'This is the full-content counterpart to /llms.txt: every published article on ' +
        'Graphical Playground, inlined in full so an LLM or answer engine can ingest the ' +
        'entire curriculum in a single fetch instead of crawling each page individually.'
    ],
    baseUrl: Urls.BaseUrl,
    sections,
    footnotes: ['End of llms-full.txt']
  });

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Full-content dump: cache aggressively so re-crawls by AI/LLM bots don't rebuild it on
      // every hit. Content only changes on publish, so an hour of staleness is a non-issue.
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
    }
  });
}

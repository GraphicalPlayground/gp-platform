// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { trimTrailingSlash } from '../utils/urls';

/**
 * @brief A single link listed under a section of an llms.txt document.
 */
export interface LlmsLink {
  title: string;
  path: string;
  description?: string;

  /**
   * @brief Full markdown body for this link, used by {@link SeoLlms.buildFull} to inline the
   * complete page content instead of just linking to it. Ignored by {@link SeoLlms.build}.
   */
  content?: string;
}

/**
 * @brief A named group of links in an llms.txt document, rendered as a markdown H2 section.
 */
export interface LlmsSection {
  heading: string;
  links: LlmsLink[];
}

/**
 * @brief Input for {@link SeoLlms.build}.
 */
export interface LlmsTxtInput {
  name: string;
  summary: string | string[];
  baseUrl: string;
  sections: LlmsSection[];
  footnotes: string | string[];
}

/**
 * @brief Generates `/llms.txt` documents, the emerging convention (llmstxt.org) AI agents and answer engines
 * check for a concise, markdown summary of a site's key pages. Marketing-only: admin/app are never meant to be
 * read by an LLM crawler any more than by a search engine.
 */
export class SeoLlms {
  /**
   * @brief Builds the shared `# name` + summary blockquote header both document flavors start with.
   */
  private static buildHeader(input: Pick<LlmsTxtInput, 'name' | 'summary'>): string[] {
    return [
      `# ${input.name}`,
      '',
      ...(Array.isArray(input.summary) ? input.summary.map((s) => `> ${s}`) : [`> ${input.summary}`]),
      ''
    ];
  }

  /**
   * @brief Appends the trailing `---` + footnotes block shared by both document flavors, if any.
   */
  private static appendFootnotes(lines: string[], footnotes: LlmsTxtInput['footnotes']): void {
    if (footnotes.length === 0) return;

    lines.push('---', '', ...(Array.isArray(footnotes) ? footnotes : [footnotes]));
  }

  /**
   * @brief Builds the plaintext content of an llms.txt document.
   * @param input - The site name/summary and the sections of links to list.
   */
  static build(input: LlmsTxtInput): string {
    const base = trimTrailingSlash(input.baseUrl);
    const lines: string[] = this.buildHeader(input);

    for (const section of input.sections) {
      lines.push(`## ${section.heading}`, '');
      for (const link of section.links) {
        const url = link.path.startsWith('http') ? link.path : `${base}${link.path}`;

        const description = link.description ? `: ${link.description}` : '';

        lines.push(`- [${link.title}](${url})${description}`);
      }
      lines.push('');
    }

    this.appendFootnotes(lines, input.footnotes);

    return `${lines.join('\n').trimEnd()}\n`;
  }

  /**
   * @brief Builds the plaintext content of an `llms-full.txt` document: the full-content
   * counterpart to `llms.txt`, inlining each link's {@link LlmsLink.content} instead of just
   * linking to it, so an LLM can ingest an entire site in a single fetch.
   * @param input - The site name/summary and the sections of links (with full content) to inline.
   */
  static buildFull(input: LlmsTxtInput): string {
    const base = trimTrailingSlash(input.baseUrl);
    const lines: string[] = this.buildHeader(input);

    for (const section of input.sections) {
      lines.push('---', '', `## ${section.heading}`, '');
      for (const link of section.links) {
        const url = link.path.startsWith('http') ? link.path : `${base}${link.path}`;

        lines.push(`### ${link.title}`, '', url, '');
        if (link.description) lines.push(link.description, '');
        if (link.content) lines.push(link.content.trim(), '');
      }
    }

    this.appendFootnotes(lines, input.footnotes);

    return `${lines.join('\n').trimEnd()}\n`;
  }
}

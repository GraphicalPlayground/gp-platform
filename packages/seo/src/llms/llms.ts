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
  summary: string;
  baseUrl: string;
  sections: LlmsSection[];
}

/**
 * @brief Generates `/llms.txt` documents, the emerging convention (llmstxt.org) AI agents and answer engines
 * check for a concise, markdown summary of a site's key pages. Marketing-only: admin/app are never meant to be
 * read by an LLM crawler any more than by a search engine.
 */
export class SeoLlms {
  /**
   * @brief Builds the plaintext content of an llms.txt document.
   * @param input - The site name/summary and the sections of links to list.
   */
  static build(input: LlmsTxtInput): string {
    const base = trimTrailingSlash(input.baseUrl);
    const lines: string[] = [`# ${input.name}`, '', `> ${input.summary}`, ''];

    for (const section of input.sections) {
      lines.push(`## ${section.heading}`, '');
      for (const link of section.links) {
        const description = link.description ? `: ${link.description}` : '';
        lines.push(`- [${link.title}](${base}${link.path})${description}`);
      }
      lines.push('');
    }

    return `${lines.join('\n').trimEnd()}\n`;
  }
}

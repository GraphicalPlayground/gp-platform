// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { FAQPage, WithContext } from 'schema-dts';
import type { FaqEntry } from '@gp/content';
import { Organization } from '@gp/constants';
import { JsonLdIds } from './ids';

export interface FaqJsonLdOptions {
  /**
   * @brief CSS selectors of the DOM nodes that render each answer, if known, to enable `speakable` hints.
   */
  speakableCssSelectors?: string[];

  /**
   * @brief Page path when the FAQPage is the primary page entity (e.g. `/faq`).
   */
  path?: string;

  /**
   * @brief Page title and description when rendered as a standalone FAQPage.
   */
  name?: string;
  description?: string;
}

/**
 * @brief Builds the JSON-LD `FAQPage` representation of a list of FAQ entries.
 * @details Pure data builder, meant to be rendered via `<FaqJsonLd>` right next to the actual visual FAQ component,
 * from the exact same `items` array — never generated independently from page frontmatter, to guarantee the
 * structured data can't drift from what's visibly rendered (a Google Search Console penalty risk otherwise).
 * @param items - The question/answer pairs to expose as structured data.
 * @param speakableOrOptions - Either speakable CSS selectors or an options object with page metadata.
 */
export const buildFaqJsonLd = (
  items: FaqEntry[],
  speakableOrOptions?: string[] | FaqJsonLdOptions
): WithContext<FAQPage> => {
  const options: FaqJsonLdOptions = Array.isArray(speakableOrOptions)
    ? { speakableCssSelectors: speakableOrOptions }
    : (speakableOrOptions ?? {});

  const { description, name, path, speakableCssSelectors } = options;
  const normalizedPath = path ? (path === '/' ? '' : path.startsWith('/') ? path : `/${path}`) : undefined;
  const url = normalizedPath !== undefined ? `${Organization.url}${normalizedPath}` : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(path && { '@id': JsonLdIds.faq(path) }),
    ...(url && { url }),
    ...(name && { name }),
    ...(description && { description }),
    ...(path && { isPartOf: { '@id': JsonLdIds.website } }),
    'mainEntity': items.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer }
    })),
    ...(speakableCssSelectors?.length && {
      speakable: { '@type': 'SpeakableSpecification', 'cssSelector': speakableCssSelectors }
    })
  };
};

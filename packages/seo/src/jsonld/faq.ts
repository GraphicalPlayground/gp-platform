// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { FAQPage, WithContext } from 'schema-dts';
import type { FaqEntry } from '@gp/content';

/**
 * @brief Builds the JSON-LD `FAQPage` representation of a list of FAQ entries.
 * @details Pure data builder, meant to be rendered via `<FaqJsonLd>` right next to the actual visual FAQ component,
 * from the exact same `items` array — never generated independently from page frontmatter, to guarantee the
 * structured data can't drift from what's visibly rendered (a Google Search Console penalty risk otherwise).
 * @param items - The question/answer pairs to expose as structured data.
 * @param speakableCssSelectors - CSS selectors of the DOM nodes that actually render each answer, if the visual FAQ
 * component exposes them. Only emits `speakable` (used by voice assistants and answer engines) when provided —
 * never fabricates a selector that doesn't correspond to real markup.
 */
export const buildFaqJsonLd = (items: FaqEntry[], speakableCssSelectors?: string[]): WithContext<FAQPage> => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': items.map((item) => ({
    '@type': 'Question',
    'name': item.question,
    'acceptedAnswer': { '@type': 'Answer', 'text': item.answer }
  })),
  ...(speakableCssSelectors?.length && {
    speakable: { '@type': 'SpeakableSpecification', cssSelector: speakableCssSelectors }
  })
});

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { FaqEntry } from '@gp/content';
import { buildFaqJsonLd } from '../jsonld/faq';
import { JsonLd } from './JsonLd';

/**
 * @brief Props for the FaqJsonLd component.
 */
export interface FaqJsonLdProps {
  items: FaqEntry[];

  /**
   * @brief CSS selectors of the DOM nodes that render each answer, if known, to enable `speakable` hints.
   */
  speakableCssSelectors?: string[];
}

/**
 * @brief Renders the JSON-LD `FAQPage` for a list of FAQ entries.
 * @details Render this right next to your visual FAQ component, passing it the exact same `items` array, so the
 * structured data can never drift from what's actually shown on the page.
 */
export const FaqJsonLd = ({ items, speakableCssSelectors }: FaqJsonLdProps) => (
  <JsonLd data={buildFaqJsonLd(items, speakableCssSelectors)} />
);

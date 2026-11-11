// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LanguageCode } from './language';

/* ISO 639-1 language codes that are written right-to-left */
const RTL_LANGUAGE_CODES = new Set(['ar', 'he', 'fa', 'ur']);

/**
 * @brief Represents the reading direction of a language.
 */
export type LanguageDirection = 'ltr' | 'rtl';

/**
 * @brief Resolves the reading direction for a given language code.
 * @param language - The language code to resolve the direction for.
 * @returns "rtl" for right-to-left languages, "ltr" otherwise.
 */
export const getLanguageDirection = (language: LanguageCode): LanguageDirection =>
  RTL_LANGUAGE_CODES.has(language) ? 'rtl' : 'ltr';

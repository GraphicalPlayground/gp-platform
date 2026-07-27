// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

/* Matches BCP 47 language tags such as "en", "fr-FR" or "pt-BR" */
const LOCALE_PATTERN = /^[a-z]{2,3}(-[A-Z]{2})?$/;

/**
 * @brief Represents a BCP 47 locale tag (e.g. "en", "fr-FR").
 */
export type Locale = Brand<string, 'Locale'>;

/**
 * @brief Checks whether the given value is a well-formed BCP 47 locale tag.
 * @param value - The value to check.
 * @returns Whether the value is a valid Locale.
 */
export const isLocale = (value: string): value is Locale => LOCALE_PATTERN.test(value);

/**
 * @brief Splits a locale tag into its language and, if present, country parts.
 * @param locale - The locale tag to parse.
 * @returns The language code and optional country code making up the locale.
 */
export const parseLocale = (locale: Locale): { language: string; country?: string } => {
  const parts = locale.split('-');
  const language = parts[0] as string;
  const country = parts[1];
  return country ? { language, country } : { language };
};

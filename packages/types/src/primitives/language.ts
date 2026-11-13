// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief The ISO 639-1 language codes supported out of the box by the Graphical Playground platform.
 */
export type StandardLanguageCode =
  | 'en'
  | 'fr'
  | 'es'
  | 'de'
  | 'it'
  | 'pt'
  | 'nl'
  | 'pl'
  | 'sv'
  | 'da'
  | 'no'
  | 'fi'
  | 'ru'
  | 'uk'
  | 'tr'
  | 'ar'
  | 'he'
  | 'hi'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'vi'
  | 'th'
  | 'id';

/**
 * @brief Represents an ISO 639-1 language code, including standard codes and any custom code.
 */
export type LanguageCode = StandardLanguageCode | (string & {});

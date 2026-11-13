// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

/**
 * @brief Represents an IANA time zone identifier (e.g. "Europe/Paris").
 */
export type TimeZone = Brand<string, 'TimeZone'>;

/**
 * @brief Checks whether the given value is a valid IANA time zone identifier.
 * @param value - The value to check.
 * @returns Whether the value is a valid TimeZone.
 */
export const isTimeZone = (value: string): value is TimeZone => {
  try {
    new Intl.DateTimeFormat(undefined, { timeZone: value });
    return true;
  } catch {
    return false;
  }
};

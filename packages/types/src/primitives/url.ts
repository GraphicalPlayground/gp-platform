// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

/**
 * @brief Represents a syntactically valid absolute URL.
 */
export type Url = Brand<string, 'Url'>;

/**
 * @brief Checks whether the given value is a syntactically valid absolute URL.
 * @param value - The value to check.
 * @returns Whether the value is a valid Url.
 */
export const isUrl = (value: string): value is Url => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

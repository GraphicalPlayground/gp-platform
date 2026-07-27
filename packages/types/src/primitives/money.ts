// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { CurrencyCode } from './currency';

/**
 * @brief Represents a monetary amount in a given currency, expressed in the currency's minor unit (e.g. cents).
 */
export interface Money {
  readonly amount: number;
  readonly currency: CurrencyCode;
}

/**
 * @brief Checks whether the given value is a well-formed Money value.
 * @param value - The value to check.
 * @returns Whether the value is a valid Money.
 */
export const isMoney = (value: unknown): value is Money =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as Money).amount === 'number' &&
  Number.isInteger((value as Money).amount) &&
  (value as Money).amount >= 0 &&
  typeof (value as Money).currency === 'string';

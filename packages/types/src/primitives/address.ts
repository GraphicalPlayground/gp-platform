// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { CountryCode } from './country';

/**
 * @brief Represents a postal address.
 */
export interface PostalAddress {
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly state?: string;
  readonly postalCode: string;
  readonly country: CountryCode;
}

/**
 * @brief Checks whether the given value is a well-formed PostalAddress value.
 * @param value - The value to check.
 * @returns Whether the value is a valid PostalAddress.
 */
export const isPostalAddress = (value: unknown): value is PostalAddress =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as PostalAddress).line1 === 'string' &&
  ((value as PostalAddress).line2 === undefined || typeof (value as PostalAddress).line2 === 'string') &&
  typeof (value as PostalAddress).city === 'string' &&
  ((value as PostalAddress).state === undefined || typeof (value as PostalAddress).state === 'string') &&
  typeof (value as PostalAddress).postalCode === 'string' &&
  typeof (value as PostalAddress).country === 'string';

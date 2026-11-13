// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief The ISO 3166-1 alpha-2 country codes supported out of the box by the Graphical Playground platform.
 */
export type StandardCountryCode =
  | 'FR'
  | 'US'
  | 'GB'
  | 'DE'
  | 'ES'
  | 'IT'
  | 'PT'
  | 'NL'
  | 'BE'
  | 'CH'
  | 'LU'
  | 'IE'
  | 'SE'
  | 'NO'
  | 'DK'
  | 'FI'
  | 'PL'
  | 'CZ'
  | 'AT'
  | 'CA'
  | 'AU'
  | 'NZ'
  | 'JP'
  | 'KR'
  | 'CN'
  | 'IN'
  | 'BR'
  | 'MX'
  | 'ZA'
  | 'AE';

/**
 * @brief Represents an ISO 3166-1 alpha-2 country code, including standard codes and any custom code.
 */
export type CountryCode = StandardCountryCode | (string & {});

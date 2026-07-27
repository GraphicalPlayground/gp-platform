// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief The ISO 4217 currency codes supported out of the box by the Graphical Playground platform.
 */
export type StandardCurrencyCode =
  | 'EUR'
  | 'USD'
  | 'GBP'
  | 'CHF'
  | 'CAD'
  | 'AUD'
  | 'NZD'
  | 'JPY'
  | 'CNY'
  | 'INR'
  | 'BRL'
  | 'MXN'
  | 'ZAR'
  | 'SEK'
  | 'NOK'
  | 'DKK'
  | 'PLN'
  | 'CZK'
  | 'AED';

/**
 * @brief Represents an ISO 4217 currency code, including standard codes and any custom code.
 */
export type CurrencyCode = StandardCurrencyCode | (string & {});

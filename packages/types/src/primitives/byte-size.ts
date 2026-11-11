// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'] as const;

/**
 * @brief Represents a size in bytes (e.g. a file or upload size).
 */
export type ByteSize = Brand<number, 'ByteSize'>;

/**
 * @brief Checks whether the given value is a valid ByteSize (a non-negative integer).
 * @param value - The value to check.
 * @returns Whether the value is a valid ByteSize.
 */
export const isByteSize = (value: number): value is ByteSize => Number.isInteger(value) && value >= 0;

/**
 * @brief Formats a ByteSize into a human-readable string (e.g. "1.5 MB").
 * @param size - The byte size to format.
 * @param precision - The number of decimal places to keep, defaults to 1.
 * @returns The formatted, human-readable size.
 */
export const formatByteSize = (size: ByteSize, precision = 1): string => {
  if (size === 0) {
    return '0 B';
  }

  const exponent = Math.min(Math.floor(Math.log(size) / Math.log(1024)), UNITS.length - 1);
  const value = size / 1024 ** exponent;

  return `${value.toFixed(precision)} ${UNITS[exponent]!}`;
};

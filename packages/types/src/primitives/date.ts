// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

const ISO_DATE_STRING_PATTERN = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/;

/**
 * @brief Represents an ISO 8601 date or date-time string (e.g. "2026-07-27", "2026-07-27T14:30:00Z").
 */
export type ISODateString = Brand<string, 'ISODateString'>;

/**
 * @brief Checks whether the given value is a well-formed ISO 8601 date or date-time string.
 * @param value - The value to check.
 * @returns Whether the value is a valid ISODateString.
 */
export const isISODateString = (value: string): value is ISODateString => ISO_DATE_STRING_PATTERN.test(value);

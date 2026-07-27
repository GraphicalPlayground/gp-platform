// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

const MIN_PERCENTAGE = 0;
const MAX_PERCENTAGE = 100;

/**
 * @brief Represents a percentage value between 0 and 100.
 */
export type Percentage = Brand<number, 'Percentage'>;

/**
 * @brief Checks whether the given value is a valid Percentage (a number between 0 and 100).
 * @param value - The value to check.
 * @returns Whether the value is a valid Percentage.
 */
export const isPercentage = (value: number): value is Percentage => value >= MIN_PERCENTAGE && value <= MAX_PERCENTAGE;

/**
 * @brief Clamps an arbitrary number into a valid Percentage.
 * @param value - The number to clamp.
 * @returns The clamped Percentage.
 */
export const toPercentage = (value: number): Percentage =>
  Math.min(MAX_PERCENTAGE, Math.max(MIN_PERCENTAGE, value)) as Percentage;

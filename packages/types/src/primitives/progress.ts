// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';
import type { Percentage } from './percentage';

const MIN_PROGRESS = 0;
const MAX_PROGRESS = 1;

/**
 * @brief Represents completion progress as a fraction between 0 and 1 (e.g. a course's completion state).
 */
export type Progress = Brand<number, 'Progress'>;

/**
 * @brief Checks whether the given value is a valid Progress (a number between 0 and 1).
 * @param value - The value to check.
 * @returns Whether the value is a valid Progress.
 */
export const isProgress = (value: number): value is Progress => value >= MIN_PROGRESS && value <= MAX_PROGRESS;

/**
 * @brief Clamps an arbitrary number into a valid Progress.
 * @param value - The number to clamp.
 * @returns The clamped Progress.
 */
export const toProgress = (value: number): Progress =>
  Math.min(MAX_PROGRESS, Math.max(MIN_PROGRESS, value)) as Progress;

/**
 * @brief Converts a Progress fraction into its equivalent Percentage.
 * @param progress - The progress fraction to convert.
 * @returns The equivalent Percentage.
 */
export const progressToPercentage = (progress: Progress): Percentage => (progress * 100) as Percentage;

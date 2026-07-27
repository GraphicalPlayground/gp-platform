// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

const MIN_RATING = 0;
const MAX_RATING = 5;

/**
 * @brief Represents a rating on the platform's 0-5 scale (e.g. course or review ratings).
 */
export type Rating = Brand<number, 'Rating'>;

/**
 * @brief Checks whether the given value is a valid Rating (a number between 0 and 5).
 * @param value - The value to check.
 * @returns Whether the value is a valid Rating.
 */
export const isRating = (value: number): value is Rating => value >= MIN_RATING && value <= MAX_RATING;

/**
 * @brief Clamps an arbitrary number into a valid Rating.
 * @param value - The number to clamp.
 * @returns The clamped Rating.
 */
export const toRating = (value: number): Rating => Math.min(MAX_RATING, Math.max(MIN_RATING, value)) as Rating;

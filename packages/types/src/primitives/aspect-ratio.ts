// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

const ASPECT_RATIO_PATTERN = /^[1-9]\d*:[1-9]\d*$/;

/**
 * @brief Represents an aspect ratio (e.g. "16:9", "4:3"), used for videos, thumbnails and images.
 */
export type AspectRatio = Brand<string, 'AspectRatio'>;

/**
 * @brief Checks whether the given value is a well-formed AspectRatio.
 * @param value - The value to check.
 * @returns Whether the value is a valid AspectRatio.
 */
export const isAspectRatio = (value: string): value is AspectRatio => ASPECT_RATIO_PATTERN.test(value);

/**
 * @brief Converts an AspectRatio into its decimal width/height ratio.
 * @param aspectRatio - The aspect ratio to convert.
 * @returns The width divided by the height.
 */
export const toRatio = (aspectRatio: AspectRatio): number => {
  const [width, height] = aspectRatio.split(':').map(Number) as [number, number];
  return width / height;
};

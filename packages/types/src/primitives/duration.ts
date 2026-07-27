// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

/* Matches ISO 8601 durations, e.g. "PT1H30M", "P3D" */
const DURATION_PATTERN = /^P(?!$)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/;

/**
 * @brief Represents an ISO 8601 duration (e.g. "PT1H30M" for a 90-minute lesson).
 */
export type Duration = Brand<string, 'Duration'>;

/**
 * @brief Checks whether the given value is a well-formed ISO 8601 duration.
 * @param value - The value to check.
 * @returns Whether the value is a valid Duration.
 */
export const isDuration = (value: string): value is Duration => DURATION_PATTERN.test(value);

/**
 * @brief Converts a number of seconds into an ISO 8601 Duration.
 * @param totalSeconds - The total number of seconds to convert.
 * @returns The equivalent Duration.
 */
export const fromSeconds = (totalSeconds: number): Duration => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const time = `${hours ? `${hours}H` : ''}${minutes ? `${minutes}M` : ''}${seconds ? `${seconds}S` : ''}`;

  return `P${time ? `T${time}` : 'T0S'}` as Duration;
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { ClassValue } from 'clsx';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @brief Combines class names using clsx and tailwind-merge.
 * @param inputs An array of class values to combine.
 * @returns A single string of combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

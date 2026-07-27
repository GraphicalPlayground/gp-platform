// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief Represents an array of T that is guaranteed to contain at least one element.
 */
export type NonEmptyArray<T> = [T, ...T[]];

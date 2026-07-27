// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief Represents the union of all property value types of T.
 */
export type ValueOf<T> = T[keyof T];

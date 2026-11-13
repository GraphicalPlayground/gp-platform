// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief Flattens an intersection or mapped type into a single object shape for cleaner editor hovers.
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

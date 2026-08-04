// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief Loose Auto-completion type for string literals.
 * @details This type allows for auto-completion of string literals while still allowing any string value to be assigned.
 * It is useful for scenarios where you want to provide a set of known values for auto-completion, but also allow for flexibility in accepting other string values.
 */
export type Loose<T extends string> = T | (string & {});

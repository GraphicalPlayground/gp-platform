// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief Attaches a nominal tag to a base type so structurally identical values
 * (e.g. two different kinds of string) are no longer interchangeable.
 */
export type Brand<Value, Name extends string> = Value & { readonly __brand: Name };

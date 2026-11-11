// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { useId as reactUseId } from 'react';

/**
 * @brief A hook that generates a unique ID for a component, with an optional override.
 * @param overrideId - An optional string to override the generated ID.
 * @returns A unique ID string.
 */
export function useId(overrideId?: string): string {
  if (overrideId) {
    return overrideId;
  }

  return reactUseId();
}

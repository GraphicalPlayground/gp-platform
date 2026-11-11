// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Metadata } from 'next';

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * @brief Deep-merges Metadata objects, later sources winning on conflicts.
 * @details Next.js merges parent/child `generateMetadata` results shallowly (a child's `openGraph` fully replaces
 * the parent's). This merges nested keys like `openGraph`/`twitter`/`robots` instead, so a page can override just
 * `openGraph.images` without losing the base `openGraph.siteName`/`type`/etc.
 * @param sources - Metadata objects to merge, applied in order.
 * @returns A single Metadata object combining every source.
 */
export const mergeMetadata = (...sources: Metadata[]): Metadata => {
  const merge = (target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> => {
    for (const [key, value] of Object.entries(source)) {
      const existing = target[key];
      if (isPlainObject(existing) && isPlainObject(value)) {
        target[key] = merge({ ...existing }, value);
      } else {
        target[key] = value;
      }
    }
    return target;
  };

  return sources.reduce<Record<string, unknown>>(
    (acc, source) => merge(acc, source as Record<string, unknown>),
    {}
  ) as Metadata;
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief Identifies which app a piece of SEO configuration is being generated for.
 */
export type AppTarget = 'admin' | 'app' | 'marketing';

/**
 * @brief Whether the given app target is meant to be publicly indexed by search engines.
 * @details Single source of truth for the "only marketing is public" rule, shared by robots, sitemap, and metadata.
 */
export const isPubliclyIndexable = (target: AppTarget): boolean => target === 'marketing';

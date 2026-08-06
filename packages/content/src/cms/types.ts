// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { MDXComponents } from 'mdx/types';
import type { ReactElement } from 'react';

import type { PublishStatus } from '../shared/publish-status';

/**
 * @brief A single content file discovered on disk, with its frontmatter parsed and validated but its MDX body left uncompiled.
 * @details Cheap to produce for every file in a collection, safe to use for index/listing/category pages.
 */
export interface MdxDocument<TFrontmatter> {
  /**
   * @brief Public slug used for routing.
   * @example `/articles/guide/vulkan-101`
   */
  slug: string;

  /**
   * @brief Absolute path on disk, useful for error messages / debugging.
   */
  filePath: string;

  /**
   * @brief Path relative to the collection root.
   * @example `guide/vulkan-101.mdx`
   */
  relativePath: string;

  /**
   * @brief Validated frontmatter (typed via the collection's zod schema).
   */
  frontmatter: TFrontmatter;

  /**
   * @brief Raw MDX body (frontmatter stripped).
   */
  rawContent: string;

  /**
   * @brief Estimated reading time in minutes, derived if not set in frontmatter.
   */
  readingTimeMinutes: number;
}

/**
 * @brief An {@link MdxDocument} whose body has additionally been compiled to renderable React content via `next-mdx-remote/rsc`.
 * @details Expensive, only produce this for the single document being rendered on a page, never for a whole collection at once.
 */
export interface CompiledMdxDocument<TFrontmatter> extends MdxDocument<TFrontmatter> {
  content: ReactElement;
}

/**
 * @brief Options for constructing an {@link MdxCollection}.
 * @details These options are passed to the {@link MdxCollection} constructor.
 */
export interface MdxCollectionOptions {
  /**
   * @brief Whether non-published documents should be included. Defaults to `process.env.NODE_ENV !== 'production'`.
   * @details Ignored when `statuses` is provided.
   */
  includeDrafts?: boolean;

  /**
   * @brief Explicit allow-list of publish statuses to return. Overrides `includeDrafts` when provided.
   */
  statuses?: PublishStatus[];

  /**
   * @brief The "current time" used to resolve `scheduled` documents whose `publishAt` has passed.
   * Defaults to `new Date()`. Mostly useful for deterministic tests/previews.
   */
  now?: Date;

  /**
   * @brief Restrict results to a single locale, falling back to the collection's default locale
   * for any translation group that has no variant in the requested locale.
   */
  locale?: string;
}

/**
 * @brief Options for compiling an {@link MdxDocument} to a {@link CompiledMdxDocument}.
 * @details These options are passed to the {@link MdxCollection.compile} method.
 */
export interface CompileOptions {
  components?: MDXComponents;
}

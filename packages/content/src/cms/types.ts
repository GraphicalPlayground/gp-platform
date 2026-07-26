// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { MDXComponents } from 'mdx/types';
import type { ReactElement } from 'react';

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
   * @brief Whether draft documents (`frontmatter.draft === true`) should be included. Defaults to `process.env.NODE_ENV !== 'production'`.
   */
  includeDrafts?: boolean;
}

/**
 * @brief Options for compiling an {@link MdxDocument} to a {@link CompiledMdxDocument}.
 * @details These options are passed to the {@link MdxCollection.compile} method.
 */
export interface CompileOptions {
  components?: MDXComponents;
}

/**
 * @brief Thrown when a content file fails frontmatter validation. Carries the file path so build failures point
 * straight at the offending MDX file.
 */
export class MdxFrontmatterError extends Error {
  constructor(
    public readonly filePath: string,
    cause: unknown
  ) {
    super(`Invalid frontmatter in "${filePath}":\n${cause instanceof Error ? cause.message : String(cause)}`);
    this.name = 'MdxFrontmatterError';
    this.cause = cause;
  }
}

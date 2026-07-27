// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

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

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import path from 'node:path';
import { ArticlesRepository, LegalRepository } from './repositories';

/**
 * @brief Configuration for a {@link Cms} instance.
 */
export interface CmsConfig {
  /**
   * @brief Absolute or process-cwd-relative path to the root content directory.
   * @details Expected to contain one subdirectory per repository (`articles/`, `legal/`).
   */
  contentRootDirectory: string;
}

/**
 * @brief Top-level entry point for the build-time content source.
 * @details Wires up one {@link MdxCollection}-backed repository per content type. Meant to be
 * instantiated once per app as a module-level singleton, see `apps/marketing/src/lib/cms.ts`.
 */
export class Cms {
  public readonly articles: ArticlesRepository;
  public readonly legal: LegalRepository;

  /**
   * @brief Constructs a new {@link Cms} instance.
   * @param config - Configuration for the CMS, including the root content directory.
   */
  constructor(config: CmsConfig) {
    const contentRootDirectory = config.contentRootDirectory;
    this.articles = new ArticlesRepository(path.join(contentRootDirectory, 'articles'));
    this.legal = new LegalRepository(path.join(contentRootDirectory, 'legal'));
  }

  /**
   * @brief Drops every collection's in-memory cache - useful for dev tooling.
   */
  public invalidateAll(): void {
    this.articles.invalidateCache();
    this.legal.invalidateCache();
  }
}

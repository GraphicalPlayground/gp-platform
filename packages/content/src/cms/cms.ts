// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import path from 'node:path';
import { ArticlesRepository, LegalRepository } from './repositories';

export interface CmsConfig {
  contentRootDirectory: string;
}

export class Cms {
  public readonly articles: ArticlesRepository;
  public readonly legal: LegalRepository;

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

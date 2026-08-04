// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { MdxCollection } from '../collection';
import { legalFrontmatterSchema } from '../../legal';
import type { LegalFrontmatter } from '../../legal';
import remarkGfm from 'remark-gfm';

/**
 * @brief Repository for managing legal documents in the CMS.
 */
export class LegalRepository {
  private readonly collection: MdxCollection<LegalFrontmatter>;

  constructor(contentDir: string) {
    this.collection = new MdxCollection<LegalFrontmatter>({
      contentDir,
      schema: legalFrontmatterSchema,
      useSmartypants: true,
      remarkPlugins: [remarkGfm]
    });
  }

  /**
   * @brief Drops the collection's in-memory cache. Useful for dev-mode hot reload scripts.
   */
  public invalidateCache(): void {
    this.collection.invalidateCache();
  }

  /**
   * @brief Returns the slugs of every legal document in the collection, optionally filtering out drafts.
   */
  public getSlugs(...args: Parameters<MdxCollection<LegalFrontmatter>['getSlugs']>) {
    return this.collection.getSlugs(...args);
  }

  /**
   * @brief Returns every legal document in the collection, optionally filtering out drafts.
   */
  public getAll(...args: Parameters<MdxCollection<LegalFrontmatter>['getAll']>) {
    return this.collection.getAll(...args);
  }

  /**
   * @brief Returns a single legal document by slug, frontmatter only (MDX uncompiled).
   */
  public getBySlug(...args: Parameters<MdxCollection<LegalFrontmatter>['getBySlug']>) {
    return this.collection.getBySlug(...args);
  }

  /**
   * @brief Returns a single legal document by slug, with the MDX body compiled to React content.
   */
  public getCompiledBySlug(...args: Parameters<MdxCollection<LegalFrontmatter>['getCompiledBySlug']>) {
    return this.collection.getCompiledBySlug(...args);
  }
}

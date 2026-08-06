// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { MdxCollection } from '../collection';
import { legalFrontmatterSchema } from '../../legal';
import type { LegalFrontmatter } from '../../legal';
import type { MdxDocument } from '../types';
import remarkGfm from 'remark-gfm';

/**
 * @brief Repository for managing legal documents in the CMS.
 */
export class LegalRepository {
  private readonly collection: MdxCollection<LegalFrontmatter>;

  constructor(contentDir: string, defaultLocale?: string) {
    this.collection = new MdxCollection<LegalFrontmatter>({
      contentDir,
      schema: legalFrontmatterSchema,
      useSmartypants: true,
      remarkPlugins: [remarkGfm],
      defaultLocale
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

  /**
   * @brief Every locale variant belonging to the same translation group.
   * @details Matches on `frontmatter.translationGroupId`, falling back to `frontmatter.slug`
   * for documents that don't set one (i.e. untranslated documents only ever match themselves).
   * @param translationGroupId - The translation group id (or default-locale slug) to match.
   */
  public async getTranslations(translationGroupId: string): Promise<MdxDocument<LegalFrontmatter>[]> {
    const all = await this.collection.getAll({
      statuses: ['draft', 'in-review', 'scheduled', 'published', 'archived']
    });

    return all.filter((doc) => (doc.frontmatter.translationGroupId ?? doc.frontmatter.slug) === translationGroupId);
  }
}

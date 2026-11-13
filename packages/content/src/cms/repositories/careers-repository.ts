// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { MdxCollection } from '../collection';
import { careerFrontmatterSchema } from '../../career';
import type { CareerFrontmatter } from '../../career';
import type { MdxDocument } from '../types';

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

/**
 * @brief Repository for managing career and contributor role postings in the CMS.
 */
export class CareersRepository {
  private readonly collection: MdxCollection<CareerFrontmatter>;

  constructor(contentDir: string, defaultLocale?: string) {
    this.collection = new MdxCollection<CareerFrontmatter>({
      contentDir,
      schema: careerFrontmatterSchema,
      useSmartypants: true,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
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
   * @brief Returns the slugs of every career posting in the collection, optionally filtering out drafts.
   */
  public getSlugs(...args: Parameters<MdxCollection<CareerFrontmatter>['getSlugs']>) {
    return this.collection.getSlugs(...args);
  }

  /**
   * @brief Returns every career posting in the collection, optionally filtering out drafts.
   */
  public getAll(...args: Parameters<MdxCollection<CareerFrontmatter>['getAll']>) {
    return this.collection.getAll(...args);
  }

  /**
   * @brief Returns every published career posting currently marked open (`frontmatter.open === true`).
   */
  public async getOpenPositions(
    ...args: Parameters<MdxCollection<CareerFrontmatter>['getAll']>
  ): Promise<MdxDocument<CareerFrontmatter>[]> {
    const all = await this.collection.getAll(...args);

    return all.filter((doc) => doc.frontmatter.open);
  }

  /**
   * @brief Returns a single career posting by slug, frontmatter only (MDX uncompiled).
   */
  public getBySlug(...args: Parameters<MdxCollection<CareerFrontmatter>['getBySlug']>) {
    return this.collection.getBySlug(...args);
  }

  /**
   * @brief Returns a single career posting by slug, with the MDX body compiled to React content.
   */
  public getCompiledBySlug(...args: Parameters<MdxCollection<CareerFrontmatter>['getCompiledBySlug']>) {
    return this.collection.getCompiledBySlug(...args);
  }

  /**
   * @brief Every locale variant belonging to the same translation group.
   * @param translationGroupId - The translation group id (or default-locale slug) to match.
   */
  public async getTranslations(translationGroupId: string): Promise<MdxDocument<CareerFrontmatter>[]> {
    const all = await this.collection.getAll({
      statuses: ['draft', 'in-review', 'scheduled', 'published', 'archived']
    });

    return all.filter((doc) => (doc.frontmatter.translationGroupId ?? doc.frontmatter.slug) === translationGroupId);
  }
}

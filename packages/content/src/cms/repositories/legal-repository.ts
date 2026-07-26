// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { MdxCollection } from '../mdx-collection';
import { legalFrontmatterSchema } from '../../legal';
import type { LegalFrontmatter } from '../../legal';

/**
 * @brief Repository for managing legal documents in the CMS.
 */
export class LegalRepository {
  private readonly collection: MdxCollection<LegalFrontmatter>;

  constructor(contentDir: string) {
    this.collection = new MdxCollection<LegalFrontmatter>({
      contentDir,
      schema: legalFrontmatterSchema
    });
  }

  public invalidateCache(): void {
    this.collection.invalidateCache();
  }

  public getSlugs(...args: Parameters<MdxCollection<LegalFrontmatter>['getSlugs']>) {
    return this.collection.getSlugs(...args);
  }

  public getAll(...args: Parameters<MdxCollection<LegalFrontmatter>['getAll']>) {
    return this.collection.getAll(...args);
  }

  public getBySlug(...args: Parameters<MdxCollection<LegalFrontmatter>['getBySlug']>) {
    return this.collection.getBySlug(...args);
  }

  public getCompiledBySlug(...args: Parameters<MdxCollection<LegalFrontmatter>['getCompiledBySlug']>) {
    return this.collection.getCompiledBySlug(...args);
  }
}

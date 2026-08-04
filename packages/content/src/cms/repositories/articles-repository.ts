// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { MdxCollection } from '../collection';
import type { MdxCollectionOptions, MdxDocument } from '../types';
import type { Article } from '../../article';
import { articleFrontmatterUnionSchema as articleUnionSchema } from '../../article';
import remarkGfm from 'remark-gfm';

export type ArticleType = Article['type'];
export type ArticleOfType<T extends ArticleType> = Extract<Article, { type: T }>;

export interface ArticleListOptions extends MdxCollectionOptions {
  /**
   * @brief Restrict to one or more article types (guide, glossary, ...).
   */
  types?: ArticleType[];

  /**
   * @brief Restrict to a single category slug (topic, not article type).
   */
  category?: string;

  /**
   * @brief Restrict to articles containing this tag.
   */
  tag?: string;

  /**
   * @brief Sort order by `datePublished`. Defaults to `'desc'`.
   */
  sortBy?: 'desc' | 'asc';

  /**
   * @brief Slice the result after filtering/sorting.
   */
  limit?: number;
}

/**
 * @brief Repository for managing articles in the CMS.
 */
export class ArticlesRepository {
  private readonly collection: MdxCollection<Article>;

  constructor(contentDir: string) {
    this.collection = new MdxCollection<Article>({
      contentDir,
      schema: articleUnionSchema,
      // frontmatter.slug is authoritative; falls back to filename otherwise
      resolveSlug: (frontmatter, relativePath) => frontmatter.slug ?? relativePath,
      useSmartypants: false,
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
   * @brief Returns the slugs of every article in the collection, optionally filtering out drafts.
   * @param options - Options for filtering the returned slugs, including whether to include drafts.
   */
  public getSlugs(options?: MdxCollectionOptions) {
    return this.collection.getSlugs(options);
  }

  /**
   * @brief Returns a single article by slug, frontmatter only (MDX uncompiled).
   * @param slug - The slug of the article to retrieve.
   */
  public getBySlug(slug: string) {
    return this.collection.getBySlug(slug);
  }

  /**
   * @brief Returns a single article by slug, with the MDX body compiled to React content.
   */
  public getCompiledBySlug(...args: Parameters<MdxCollection<Article>['getCompiledBySlug']>) {
    return this.collection.getCompiledBySlug(...args);
  }

  /**
   * @brief Filtered, sorted, paginated article listing.
   * @details The workhorse for index pages, category pages, and type-specific pages (e.g. `/glossary`).
   * @param options - Type/category/tag filters, sort order, and pagination limit.
   * @returns Articles matching every supplied filter, sorted by `datePublished`.
   */
  public async getAll(options: ArticleListOptions = {}): Promise<MdxDocument<Article>[]> {
    const { category, limit, sortBy = 'desc', tag, types, ...baseOptions } = options;

    let docs = await this.collection.getAll(baseOptions);

    if (types?.length) {
      docs = docs.filter((doc) => types.includes(doc.frontmatter.type));
    }
    if (category) {
      docs = docs.filter((doc) => doc.frontmatter.category === category);
    }
    if (tag) {
      docs = docs.filter((doc) => doc.frontmatter.tags?.includes(tag));
    }

    // Precompute each document's sort key once rather than re-parsing
    // `datePublished` on every comparison inside `.sort()`.
    const sorted = docs
      .map((doc) => ({ doc, time: new Date(doc.frontmatter.datePublished).getTime() }))
      .sort((a, b) => (sortBy === 'desc' ? b.time - a.time : a.time - b.time))
      .map(({ doc }) => doc);

    return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
  }

  /**
   * @brief Convenience wrapper narrowing the result of {@link getAll} to a single article type.
   * @param type - The article type to filter by.
   * @param options - The same filters as {@link getAll}, minus `types`.
   */
  public async getByType<T extends ArticleType>(
    type: T,
    options: Omit<ArticleListOptions, 'types'> = {}
  ): Promise<MdxDocument<ArticleOfType<T>>[]> {
    const docs = await this.getAll({ ...options, types: [type] });

    return docs as MdxDocument<ArticleOfType<T>>[];
  }

  /** @brief Shorthand for `getByType('guide', options)`. */
  public getGuides(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('guide', options);
  }

  /** @brief Shorthand for `getByType('comparison', options)`. */
  public getComparisons(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('comparison', options);
  }

  /** @brief Shorthand for `getByType('tech-article', options)`. */
  public getTechArticles(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('tech-article', options);
  }

  /** @brief Shorthand for `getByType('glossary', options)`. */
  public getGlossaryEntries(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('glossary', options);
  }

  /** @brief Shorthand for `getByType('breakdown', options)`. */
  public getBreakdowns(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('breakdown', options);
  }

  /** @brief Shorthand for `getByType('interview', options)`. */
  public getInterviews(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('interview', options);
  }

  /** @brief Shorthand for `getByType('changelog', options)`. */
  public getChangelogEntries(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('changelog', options);
  }

  /** @brief Shorthand for `getByType('roadmap', options)`. */
  public getRoadmapEntries(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('roadmap', options);
  }

  /** @brief Shorthand for `getByType('showcase', options)`. */
  public getShowcases(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('showcase', options);
  }

  /** @brief Shorthand for `getByType('research', options)`. */
  public getResearchEntries(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('research', options);
  }

  /** @brief Shorthand for `getByType('testimonial', options)`. */
  public getTestimonials(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('testimonial', options);
  }

  /**
   * @brief Distinct list of every tag used across all (non-draft) articles.
   * @param options - Options for filtering the underlying articles, including whether to include drafts.
   */
  public async getAllTags(options?: MdxCollectionOptions): Promise<string[]> {
    const docs = await this.collection.getAll(options);
    const tags = new Set<string>();

    for (const doc of docs) {
      doc.frontmatter.tags?.forEach((tag: string) => tags.add(tag));
    }

    return [...tags].sort((a, b) => a.localeCompare(b));
  }

  /**
   * @brief Related articles for a given document.
   * @details Based on its `relatedSlugs` field, falling back to same-category articles if the field is empty
   * or none of the referenced slugs resolve to an existing article.
   * @param doc - The article to find related articles for.
   * @param limit - Maximum number of related articles to return. Defaults to `3`.
   */
  public async getRelated(doc: MdxDocument<Article>, limit = 3): Promise<MdxDocument<Article>[]> {
    const related: string[] = doc.frontmatter.relatedSlugs ?? [];

    if (related.length > 0) {
      const resolved = await Promise.all(related.map((slug: string) => this.getBySlug(slug)));
      const found = resolved.filter((d: MdxDocument<Article> | undefined): d is MdxDocument<Article> => Boolean(d));

      if (found.length > 0) return found.slice(0, limit);
    }

    const sameCategory = await this.getAll({ category: doc.frontmatter.category, limit: limit + 1 });

    return sameCategory.filter((d) => d.slug !== doc.slug).slice(0, limit);
  }
}

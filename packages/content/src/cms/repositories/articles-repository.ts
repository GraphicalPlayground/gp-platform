// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { MdxCollection } from '../mdx-collection';
import type { MdxCollectionOptions, MdxDocument } from '../types';
import type { Article, articleFrontmatterUnionSchema } from '../../article';
import { articleFrontmatterUnionSchema as articleUnionSchema } from '../../article';

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
      resolveSlug: (frontmatter, relativePath) => frontmatter.slug ?? relativePath
    });
  }

  public invalidateCache(): void {
    this.collection.invalidateCache();
  }

  public getSlugs(options?: MdxCollectionOptions) {
    return this.collection.getSlugs(options);
  }

  public getBySlug(slug: string) {
    return this.collection.getBySlug(slug);
  }

  public getCompiledBySlug(...args: Parameters<MdxCollection<Article>['getCompiledBySlug']>) {
    return this.collection.getCompiledBySlug(...args);
  }

  /**
   * Filtered, sorted, paginated article listing - the workhorse for
   * index pages, category pages, and type-specific pages (e.g. `/glossary`).
   */
  public async getAll(options: ArticleListOptions = {}): Promise<MdxDocument<Article>[]> {
    const { types, category, tag, sortBy = 'desc', limit, ...baseOptions } = options;

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

    docs = docs.sort((a, b) => {
      const diff = new Date(a.frontmatter.datePublished).getTime() - new Date(b.frontmatter.datePublished).getTime();
      return sortBy === 'desc' ? -diff : diff;
    });

    return typeof limit === 'number' ? docs.slice(0, limit) : docs;
  }

  /** Convenience wrapper narrowing the result to a single article type. */
  public async getByType<T extends ArticleType>(
    type: T,
    options: Omit<ArticleListOptions, 'types'> = {}
  ): Promise<MdxDocument<ArticleOfType<T>>[]> {
    const docs = await this.getAll({ ...options, types: [type] });
    return docs as MdxDocument<ArticleOfType<T>>[];
  }

  public getGuides(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('guide', options);
  }

  public getComparisons(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('comparison', options);
  }

  public getTechArticles(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('tech-article', options);
  }

  public getGlossaryEntries(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('glossary', options);
  }

  public getBreakdowns(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('breakdown', options);
  }

  public getInterviews(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('interview', options);
  }

  public getChangelogEntries(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('changelog', options);
  }

  public getRoadmapEntries(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('roadmap', options);
  }

  public getShowcases(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('showcase', options);
  }

  public getResearchEntries(options?: Omit<ArticleListOptions, 'types'>) {
    return this.getByType('research', options);
  }

  /** Distinct list of every tag used across all (non-draft) articles. */
  public async getAllTags(options?: MdxCollectionOptions): Promise<string[]> {
    const docs = await this.collection.getAll(options);
    const tags = new Set<string>();
    for (const doc of docs) {
      doc.frontmatter.tags?.forEach((tag: string) => tags.add(tag));
    }
    return [...tags].sort();
  }

  /**
   * Related articles for a given document, based on its `relatedSlugs`
   * field, falling back to same-category articles if the field is empty.
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

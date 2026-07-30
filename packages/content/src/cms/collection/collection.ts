// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import fs from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkSmartypants from 'remark-smartypants';
import type { ZodType } from 'zod';

import { estimateReadingTimeMinutes, walkMdxFiles } from './fs-utils';
import { MdxFrontmatterError } from '../errors';
import type { CompileOptions, CompiledMdxDocument, MdxCollectionOptions, MdxDocument } from '../types';
import type { PluggableList } from 'unified';

/**
 * @brief Configuration for an {@link MdxCollection}.
 */
export interface MdxCollectionConfig<TFrontmatter> {
  /**
   * @brief Absolute or process-cwd-relative path to the content directory.
   */
  contentDir: string;

  /**
   * @brief Zod schema used to validate every file's frontmatter.
   */
  schema: ZodType<TFrontmatter>;

  /**
   * @brief Given validated frontmatter and the file's relative path, return the
   * public slug used for routing. Defaults to `frontmatter.slug` when
   * present, otherwise the filename (without extension).
   */
  resolveSlug?: (frontmatter: TFrontmatter, relativePath: string) => string;

  /**
   * @brief Type guard used to decide whether a document counts as a draft.
   */
  isDraft?: (frontmatter: TFrontmatter) => boolean;

  /**
   * @brief Whether to enable smartypants transformations (e.g., converting straight quotes to curly quotes) when compiling MDX content. Defaults to `false`.
   * @details This option is passed to the `remark-smartypants` plugin used by `next-mdx-remote`. If enabled, it will apply typographic transformations to the MDX content during compilation.
   */
  useSmartypants?: boolean;

  /**
   * @brief Additional remark plugins to apply when compiling MDX content. Defaults to an empty array.
   */
  remarkPlugins?: PluggableList;
}

/**
 * @brief Build-time content source for a single directory of MDX files sharing
 * one frontmatter schema (or a discriminated union of schemas).
 *
 * @details Instances are meant to live as module-level singletons, see `cms.ts`, so the filesystem
 * is only walked once per server process / build.
 */
export class MdxCollection<TFrontmatter extends { draft?: boolean }> {
  private readonly contentDir: string;
  private readonly schema: ZodType<TFrontmatter>;
  private readonly resolveSlug: (frontmatter: TFrontmatter, relativePath: string) => string;
  private readonly isDraft: (frontmatter: TFrontmatter) => boolean;

  /**
   * @brief Process-lifetime cache of the in-flight/completed load.
   * @details A single promise (rather than a promise + a separate result map) so that
   * concurrent callers arriving before the first load resolves all await the same
   * filesystem walk instead of each triggering their own.
   */
  private loadingPromise: Promise<Map<string, MdxDocument<TFrontmatter>>> | null = null;

  /**
   * @brief Constructs a new {@link MdxCollection} instance.
   * @param config - Configuration for the collection, including content directory, frontmatter schema, and optional slug resolver and draft checker.
   */
  constructor(private readonly config: MdxCollectionConfig<TFrontmatter>) {
    this.config.remarkPlugins = this.config.remarkPlugins ?? [];
    this.contentDir = path.isAbsolute(config.contentDir)
      ? config.contentDir
      : path.join(process.cwd(), config.contentDir);
    this.schema = config.schema;
    this.resolveSlug =
      config.resolveSlug ??
      ((frontmatter, relativePath) =>
        (frontmatter as { slug?: string }).slug ?? path.basename(relativePath).replace(/\.mdx?$/i, ''));
    this.isDraft = config.isDraft ?? ((frontmatter) => Boolean(frontmatter.draft));
  }

  /**
   * @brief Drops the in-memory cache. Useful for dev-mode hot reload scripts.
   */
  public invalidateCache(): void {
    this.loadingPromise = null;
  }

  /**
   * @brief Reads, parses, and validates a single content file.
   * @param filePath - Absolute path to the `.mdx`/`.md` file.
   * @returns The slug the file resolves to, and its parsed {@link MdxDocument}.
   * @throws {@link MdxFrontmatterError} if the file's frontmatter fails validation.
   */
  private async loadDocument(filePath: string): Promise<{ slug: string; doc: MdxDocument<TFrontmatter> }> {
    const relativePath = path.relative(this.contentDir, filePath);
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(raw);

    const parsed = this.schema.safeParse(data);
    if (!parsed.success) {
      throw new MdxFrontmatterError(filePath, parsed.error);
    }

    const frontmatter = parsed.data;
    const slug = this.resolveSlug(frontmatter, relativePath);
    const readingTimeMinutes =
      (frontmatter as { readingTimeMinutes?: number }).readingTimeMinutes ?? estimateReadingTimeMinutes(content);

    return {
      slug,
      doc: {
        slug,
        filePath,
        relativePath,
        frontmatter,
        rawContent: content,
        readingTimeMinutes
      }
    };
  }

  /**
   * @brief Loads all documents in the collection, parsing frontmatter and caching results.
   * @returns A map of slug -> {@link MdxDocument} for all documents in the collection.
   * @throws {@link MdxFrontmatterError} if any document's frontmatter fails validation.
   */
  private loadAll(): Promise<Map<string, MdxDocument<TFrontmatter>>> {
    if (!this.loadingPromise) {
      this.loadingPromise = this.buildCache().catch((error: unknown) => {
        // Don't cache a failed load - let the next caller retry.
        this.loadingPromise = null;
        throw error;
      });
    }
    return this.loadingPromise;
  }

  /**
   * @brief Walks the content directory and parses every file concurrently.
   * @returns A map of slug -> {@link MdxDocument} for all documents in the collection.
   */
  private async buildCache(): Promise<Map<string, MdxDocument<TFrontmatter>>> {
    const filePaths = await walkMdxFiles(this.contentDir);
    const results = await Promise.all(
      filePaths.filter((file) => !file.endsWith('README.md')).map((filePath) => this.loadDocument(filePath))
    );

    const cacheMap = new Map<string, MdxDocument<TFrontmatter>>();
    for (const { slug, doc } of results) {
      if (cacheMap.has(slug)) {
        throw new Error(
          `Duplicate slug "${slug}" in collection "${this.contentDir}" ` + `(conflicting file: ${doc.relativePath})`
        );
      }
      cacheMap.set(slug, doc);
    }

    return cacheMap;
  }

  /**
   * @brief Returns all documents in the collection, optionally filtering out drafts.
   * @param options - Options for filtering the returned documents, including whether to include drafts.
   * @returns An array of {@link MdxDocument} for all documents in the collection.
   */
  public async getSlugs(options: MdxCollectionOptions = {}): Promise<string[]> {
    const docs = await this.getAll(options);
    return docs.map((doc) => doc.slug);
  }

  /**
   * @brief Returns all documents in the collection, optionally filtering out drafts.
   * @param options - Options for filtering the returned documents, including whether to include drafts.
   * @returns An array of {@link MdxDocument} for all documents in the collection.
   */
  public async getAll(options: MdxCollectionOptions = {}): Promise<MdxDocument<TFrontmatter>[]> {
    const includeDrafts = options.includeDrafts ?? process.env['NODE_ENV'] !== 'production';
    const all = [...(await this.loadAll()).values()];
    return includeDrafts ? all : all.filter((doc) => !this.isDraft(doc.frontmatter));
  }

  /**
   * @brief Returns a single document by slug, frontmatter only (MDX uncompiled).
   * @param slug - The slug of the document to retrieve.
   * @returns The {@link MdxDocument} for the requested slug, or `undefined` if not found.
   */
  public async getBySlug(slug: string): Promise<MdxDocument<TFrontmatter> | undefined> {
    return (await this.loadAll()).get(slug);
  }

  /**
   * @brief Returns a single document by slug, with the MDX body compiled to React content.
   * @param slug - The slug of the document to retrieve.
   * @param options - Options for compiling the MDX content, including custom React components.
   */
  public async getCompiledBySlug(
    slug: string,
    options: CompileOptions = {}
  ): Promise<CompiledMdxDocument<TFrontmatter> | undefined> {
    const doc = await this.getBySlug(slug);
    if (!doc) return undefined;

    const { content } = await compileMDX<TFrontmatter>({
      source: doc.rawContent,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: this.config.useSmartypants
            ? [remarkSmartypants, ...this.config.remarkPlugins!]
            : this.config.remarkPlugins
        }
      },
      components: options.components
    });

    return { ...doc, content };
  }
}

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { cache } from 'react';
import type { ZodType } from 'zod';

import type { CompileOptions, CompiledMdxDocument, MdxCollectionOptions, MdxDocument } from './types';
import { MdxFrontmatterError } from './types';

const WORDS_PER_MINUTE = 220;

/**
 * @brief Estimates the reading time in minutes for a given content string.
 * @param content - The content string to estimate reading time for.
 * @returns The estimated reading time in minutes, rounded to the nearest whole number.
 * Returns a minimum of 1 minute for any non-empty content.
 */
function estimateReadingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * @brief Recursively lists every `.mdx`/`.md` file under `dir`.
 * @param dir - The directory to search for MDX files.
 * @returns An array of file paths to all `.mdx`/`.md` files found under `dir`.
 */
function walkMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMdxFiles(fullPath));
    } else if (/\.mdx?$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

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

  /** Process-lifetime cache: relativePath -> parsed document. */
  private documentCache: Map<string, MdxDocument<TFrontmatter>> | null = null;

  /**
   * @brief Constructs a new {@link MdxCollection} instance.
   * @param config - Configuration for the collection, including content directory, frontmatter schema, and optional slug resolver and draft checker.
   */
  constructor(config: MdxCollectionConfig<TFrontmatter>) {
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
    this.documentCache = null;
  }

  /**
   * @brief Loads all documents in the collection, parsing frontmatter and caching results.
   * @returns A map of slug -> {@link MdxDocument} for all documents in the collection.
   * @throws {@link MdxFrontmatterError} if any document's frontmatter fails validation.
   */
  private loadAll = cache(async (): Promise<Map<string, MdxDocument<TFrontmatter>>> => {
    if (this.documentCache) return this.documentCache;

    const filePaths = walkMdxFiles(this.contentDir);
    const cacheMap = new Map<string, MdxDocument<TFrontmatter>>();

    for (const filePath of filePaths) {
      const relativePath = path.relative(this.contentDir, filePath);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);

      const parsed = this.schema.safeParse(data);
      if (!parsed.success) {
        throw new MdxFrontmatterError(filePath, parsed.error);
      }

      const frontmatter = parsed.data;
      const slug = this.resolveSlug(frontmatter, relativePath);

      if (cacheMap.has(slug)) {
        throw new Error(
          `Duplicate slug "${slug}" in collection "${this.contentDir}" ` + `(conflicting file: ${relativePath})`
        );
      }

      const readingTimeMinutes =
        (frontmatter as { readingTimeMinutes?: number }).readingTimeMinutes ?? estimateReadingTimeMinutes(content);

      cacheMap.set(slug, {
        slug,
        filePath,
        relativePath,
        frontmatter,
        rawContent: content,
        readingTimeMinutes
      });
    }

    this.documentCache = cacheMap;
    return cacheMap;
  });

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
      options: { parseFrontmatter: false },
      components: options.components
    });

    return { ...doc, content };
  }
}

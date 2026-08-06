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
import type { PublishStatus, PublishWorkflowFields } from '../../shared/publish-status';
import { resolvePublishStatus, validatePublishWorkflow } from '../../shared/publish-status';

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
   * @brief Resolves a document's effective publish status. Defaults to {@link resolvePublishStatus}.
   */
  getPublishStatus?: (frontmatter: TFrontmatter, now: Date) => PublishStatus;

  /**
   * @brief Locale assumed for documents that don't set `frontmatter.locale`, and used as the
   * fallback when a requested locale has no variant. Defaults to `'en'`.
   */
  defaultLocale?: string;

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
export class MdxCollection<TFrontmatter extends PublishWorkflowFields> {
  private readonly contentDir: string;
  private readonly schema: ZodType<TFrontmatter>;
  private readonly resolveSlug: (frontmatter: TFrontmatter, relativePath: string) => string;
  private readonly getPublishStatus: (frontmatter: TFrontmatter, now: Date) => PublishStatus;
  private readonly defaultLocale: string;

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
      ((frontmatter, relativePath) => {
        const explicitSlug = (frontmatter as { slug?: string }).slug;

        if (explicitSlug) return explicitSlug;

        // Strip a trailing locale segment (e.g. "foo.fr.mdx" -> "foo") so a locale-suffixed
        // filename doesn't leak into the derived slug when frontmatter.slug is absent.
        return path
          .basename(relativePath)
          .replace(/\.mdx?$/i, '')
          .replace(/\.[a-z]{2}(-[A-Z]{2})?$/, '');
      });
    this.getPublishStatus = config.getPublishStatus ?? resolvePublishStatus;
    this.defaultLocale = config.defaultLocale ?? 'en';
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
   * @returns The composite `slug::locale` cache key the file resolves to, and its parsed {@link MdxDocument}.
   * @throws {@link MdxFrontmatterError} if the file's frontmatter fails validation, or is internally
   * inconsistent (e.g. `publishStatus: "scheduled"` without a `publishAt`).
   */
  private async loadDocument(filePath: string): Promise<{ cacheKey: string; doc: MdxDocument<TFrontmatter> }> {
    const relativePath = path.relative(this.contentDir, filePath);
    const raw = await fs.readFile(filePath, 'utf-8');
    const { content, data } = matter(raw);

    const parsed = this.schema.safeParse(data);

    if (!parsed.success) {
      throw new MdxFrontmatterError(filePath, parsed.error);
    }

    const frontmatter = parsed.data;

    const workflowError = validatePublishWorkflow(frontmatter);

    if (workflowError) {
      throw new MdxFrontmatterError(filePath, new Error(workflowError));
    }

    const slug = this.resolveSlug(frontmatter, relativePath);
    const locale = (frontmatter as { locale?: string }).locale ?? this.defaultLocale;
    const readingTimeMinutes =
      (frontmatter as { readingTimeMinutes?: number }).readingTimeMinutes ?? estimateReadingTimeMinutes(content);

    return {
      cacheKey: `${slug}::${locale}`,
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
   * @returns A map of `slug::locale` -> {@link MdxDocument} for all documents in the collection.
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
   * @returns A map of `slug::locale` -> {@link MdxDocument} for all documents in the collection.
   */
  private async buildCache(): Promise<Map<string, MdxDocument<TFrontmatter>>> {
    const filePaths = await walkMdxFiles(this.contentDir);
    const results = await Promise.all(
      filePaths.filter((file) => !file.endsWith('README.md')).map((filePath) => this.loadDocument(filePath))
    );

    const cacheMap = new Map<string, MdxDocument<TFrontmatter>>();

    for (const { cacheKey, doc } of results) {
      if (cacheMap.has(cacheKey)) {
        throw new Error(
          `Duplicate slug/locale "${cacheKey}" in collection "${this.contentDir}" ` +
            `(conflicting file: ${doc.relativePath})`
        );
      }
      cacheMap.set(cacheKey, doc);
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
   * @brief Returns all documents in the collection, filtered by publish status and, optionally, locale.
   * @param options - Status filter (`statuses`, or `includeDrafts`/`now` for the legacy behavior) and
   * an optional `locale` to restrict/fall-back the result to.
   * @returns An array of {@link MdxDocument} for all documents in the collection.
   */
  public async getAll(options: MdxCollectionOptions = {}): Promise<MdxDocument<TFrontmatter>[]> {
    const now = options.now ?? new Date();
    const all = [...(await this.loadAll()).values()];

    const statusFiltered = options.statuses
      ? all.filter((doc) => options.statuses!.includes(this.getPublishStatus(doc.frontmatter, now)))
      : all.filter((doc) => {
          const includeDrafts = options.includeDrafts ?? process.env['NODE_ENV'] !== 'production';
          const status = this.getPublishStatus(doc.frontmatter, now);

          return includeDrafts ? status !== 'archived' : status === 'published';
        });

    if (!options.locale) return statusFiltered;

    // Group by translation group so a listing shows exactly one variant per logical
    // document: the requested locale if present, otherwise the collection's default locale.
    const groups = new Map<string, MdxDocument<TFrontmatter>[]>();

    for (const doc of statusFiltered) {
      const groupId = (doc.frontmatter as { translationGroupId?: string }).translationGroupId ?? doc.slug;
      const group = groups.get(groupId);

      if (group) group.push(doc);
      else groups.set(groupId, [doc]);
    }

    const picked: MdxDocument<TFrontmatter>[] = [];

    for (const group of groups.values()) {
      const localeOf = (doc: MdxDocument<TFrontmatter>) =>
        (doc.frontmatter as { locale?: string }).locale ?? this.defaultLocale;
      const chosen =
        group.find((doc) => localeOf(doc) === options.locale) ??
        group.find((doc) => localeOf(doc) === this.defaultLocale);

      if (chosen) picked.push(chosen);
    }

    return picked;
  }

  /**
   * @brief Returns a single document by slug and locale, frontmatter only (MDX uncompiled).
   * @param slug - The slug of the document to retrieve.
   * @param locale - The locale to look up. Falls back to the collection's default locale if no
   * variant exists in the requested locale. Defaults to the collection's default locale.
   * @returns The {@link MdxDocument} for the requested slug/locale, or `undefined` if not found.
   */
  public async getBySlug(
    slug: string,
    locale: string = this.defaultLocale
  ): Promise<MdxDocument<TFrontmatter> | undefined> {
    const cache = await this.loadAll();
    const exact = cache.get(`${slug}::${locale}`);

    if (exact) return exact;
    if (locale !== this.defaultLocale) return cache.get(`${slug}::${this.defaultLocale}`);

    return undefined;
  }

  /**
   * @brief Returns a single document by slug and locale, with the MDX body compiled to React content.
   * @param slug - The slug of the document to retrieve.
   * @param locale - The locale to look up, with the same fallback semantics as {@link getBySlug}.
   * @param options - Options for compiling the MDX content, including custom React components.
   */
  public async getCompiledBySlug(
    slug: string,
    locale: string = this.defaultLocale,
    options: CompileOptions = {}
  ): Promise<CompiledMdxDocument<TFrontmatter> | undefined> {
    const doc = await this.getBySlug(slug, locale);

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

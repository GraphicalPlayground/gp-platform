// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief Fast content validator: schema + cross-reference checks over `content/`, without
 * booting Next.js or compiling any MDX body.
 * @details Run via `pnpm content:validate` (all files) or `pnpm content:validate -- --file <path>`
 * (report only that file's problems, though every file is still loaded so cross-document
 * reference checks stay accurate).
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import matter from 'gray-matter';
import type { ZodType } from 'zod';

import { walkMdxFiles } from '../src/cms/collection/fs-utils';
import { articleFrontmatterUnionSchema } from '../src/article';
import { legalFrontmatterSchema, subprocessorsFrontmatterSchema } from '../src/legal';
import { validatePublishWorkflow } from '../src/shared/publish-status';
import type { PublishWorkflowFields } from '../src/shared/publish-status';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../../..');
const DEFAULT_LOCALE = 'en';

interface LoadedDoc {
  absolutePath: string;
  relativePath: string;
  slug: string;
  locale: string;
  cacheKey: string;
  frontmatter: Record<string, unknown>;
}

interface Problem {
  absolutePath: string;
  relativePath: string;
  level: 'error' | 'warning';
  message: string;
}

function deriveSlug(frontmatter: Record<string, unknown>, relativePath: string): string {
  const explicit = typeof frontmatter['slug'] === 'string' ? frontmatter['slug'] : undefined;

  if (explicit) return explicit;

  return path
    .basename(relativePath)
    .replace(/\.mdx?$/i, '')
    .replace(/\.[a-z]{2}(-[A-Z]{2})?$/, '');
}

function deriveLocale(frontmatter: Record<string, unknown>): string {
  return typeof frontmatter['locale'] === 'string' ? frontmatter['locale'] : DEFAULT_LOCALE;
}

function validateLegalFrontmatter(
  data: Record<string, unknown>
): { success: true; data: Record<string, unknown> } | { success: false; message: string } {
  const base = legalFrontmatterSchema.safeParse(data);

  if (!base.success) return { success: false, message: base.error.message };

  // subprocessors.mdx carries an extra `subprocessors` array that `legalFrontmatterSchema`
  // doesn't itself validate the shape of - re-check with the stricter variant when present.
  if ('subprocessors' in data) {
    const withSubprocessors = subprocessorsFrontmatterSchema.safeParse(data);

    if (!withSubprocessors.success) return { success: false, message: withSubprocessors.error.message };

    return { success: true, data: withSubprocessors.data };
  }

  return { success: true, data: base.data };
}

function validateWithSchema(schema: ZodType) {
  return (
    data: Record<string, unknown>
  ): { success: true; data: Record<string, unknown> } | { success: false; message: string } => {
    const parsed = schema.safeParse(data);

    if (!parsed.success) return { success: false, message: parsed.error.message };

    return { success: true, data: parsed.data as Record<string, unknown> };
  };
}

async function loadCollection(
  collectionDir: string,
  validate: (
    data: Record<string, unknown>
  ) => { success: true; data: Record<string, unknown> } | { success: false; message: string }
): Promise<{ docs: LoadedDoc[]; problems: Problem[] }> {
  const problems: Problem[] = [];
  const docs: LoadedDoc[] = [];

  const filePaths = (await walkMdxFiles(collectionDir)).filter((file) => !file.endsWith('README.md'));

  for (const absolutePath of filePaths) {
    const relativePath = path.relative(collectionDir, absolutePath);
    const raw = await fs.readFile(absolutePath, 'utf-8');
    const { data } = matter(raw);

    const result = validate(data);

    if (!result.success) {
      problems.push({ absolutePath, relativePath, level: 'error', message: result.message });
      continue;
    }

    const workflowError = validatePublishWorkflow(result.data as PublishWorkflowFields);

    if (workflowError) {
      problems.push({ absolutePath, relativePath, level: 'error', message: workflowError });
      continue;
    }

    const slug = deriveSlug(result.data, relativePath);
    const locale = deriveLocale(result.data);

    docs.push({ absolutePath, relativePath, slug, locale, cacheKey: `${slug}::${locale}`, frontmatter: result.data });
  }

  return { docs, problems };
}

/**
 * @brief Same duplicate-key check `MdxCollection.buildCache()` enforces at runtime, replicated
 * here so it surfaces in a fast CI/pre-commit check instead of only when an app boots.
 */
function checkDuplicateSlugs(docs: LoadedDoc[]): Problem[] {
  const problems: Problem[] = [];
  const seen = new Map<string, LoadedDoc>();

  for (const doc of docs) {
    const conflict = seen.get(doc.cacheKey);

    if (conflict) {
      problems.push({
        absolutePath: doc.absolutePath,
        relativePath: doc.relativePath,
        level: 'error',
        message: `Duplicate slug/locale "${doc.cacheKey}" (conflicting file: ${conflict.relativePath})`
      });
      continue;
    }
    seen.set(doc.cacheKey, doc);
  }

  return problems;
}

/**
 * @brief Whether `referencedSlug` resolves to a real document, mirroring `MdxCollection.getBySlug`'s
 * own fallback semantics: exact slug+locale match, else the collection's default-locale document.
 */
function referenceResolves(docs: LoadedDoc[], referencedSlug: string, fromLocale: string): boolean {
  return docs.some(
    (doc) =>
      (doc.slug === referencedSlug && doc.locale === fromLocale) ||
      (doc.slug === referencedSlug && doc.locale === DEFAULT_LOCALE)
  );
}

/**
 * @brief Validates `relatedSlugs` (every article type) and `relatedChangelogSlug` (roadmap only)
 * against the full set of loaded articles - drafts included, since an author should be able to
 * link to a still-drafted related article without this being flagged as broken.
 */
function checkArticleReferences(docs: LoadedDoc[]): Problem[] {
  const problems: Problem[] = [];

  for (const doc of docs) {
    const relatedSlugs = doc.frontmatter['relatedSlugs'];

    if (Array.isArray(relatedSlugs)) {
      for (const referenced of relatedSlugs) {
        if (typeof referenced !== 'string') continue;
        if (!referenceResolves(docs, referenced, doc.locale)) {
          problems.push({
            absolutePath: doc.absolutePath,
            relativePath: doc.relativePath,
            level: 'error',
            message: `relatedSlugs references unknown slug "${referenced}"`
          });
        }
      }
    }

    const relatedChangelogSlug = doc.frontmatter['relatedChangelogSlug'];

    if (typeof relatedChangelogSlug === 'string' && !referenceResolves(docs, relatedChangelogSlug, doc.locale)) {
      problems.push({
        absolutePath: doc.absolutePath,
        relativePath: doc.relativePath,
        level: 'error',
        message: `relatedChangelogSlug references unknown slug "${relatedChangelogSlug}"`
      });
    }
  }

  return problems;
}

/**
 * @brief Non-fatal locale-pairing hygiene checks - translation coverage is inherently partial and
 * shouldn't block unrelated content changes, so these are always warnings, never errors.
 */
function checkLocalePairing(docs: LoadedDoc[]): Problem[] {
  const problems: Problem[] = [];
  const defaultLocaleSlugs = new Set(docs.filter((doc) => doc.locale === DEFAULT_LOCALE).map((doc) => doc.slug));

  for (const doc of docs) {
    if (doc.locale === DEFAULT_LOCALE) continue;
    const translationGroupId = doc.frontmatter['translationGroupId'];

    if (typeof translationGroupId !== 'string') {
      problems.push({
        absolutePath: doc.absolutePath,
        relativePath: doc.relativePath,
        level: 'warning',
        message: `non-default-locale document ("${doc.locale}") has no translationGroupId - it won't be paired with its default-locale counterpart in locale-aware listings`
      });
      continue;
    }

    if (!defaultLocaleSlugs.has(translationGroupId)) {
      problems.push({
        absolutePath: doc.absolutePath,
        relativePath: doc.relativePath,
        level: 'warning',
        message: `translationGroupId "${translationGroupId}" doesn't match any default-locale ("${DEFAULT_LOCALE}") document's slug`
      });
    }
  }

  return problems;
}

function parseArgs(argv: string[]): { file?: string } {
  const fileIndex = argv.indexOf('--file');

  if (fileIndex === -1 || !argv[fileIndex + 1]) return {};

  return { file: path.resolve(process.cwd(), argv[fileIndex + 1]!) };
}

async function main(): Promise<void> {
  const { file: filterFile } = parseArgs(process.argv.slice(2));

  const [articles, legal] = await Promise.all([
    loadCollection(path.join(REPO_ROOT, 'content', 'articles'), validateWithSchema(articleFrontmatterUnionSchema)),
    loadCollection(path.join(REPO_ROOT, 'content', 'legal'), validateLegalFrontmatter)
  ]);

  const allProblems: Problem[] = [
    ...articles.problems,
    ...legal.problems,
    ...checkDuplicateSlugs(articles.docs),
    ...checkDuplicateSlugs(legal.docs),
    ...checkArticleReferences(articles.docs),
    ...checkLocalePairing(articles.docs),
    ...checkLocalePairing(legal.docs)
  ];

  const filtered = filterFile ? allProblems.filter((problem) => problem.absolutePath === filterFile) : allProblems;

  const errors = filtered.filter((problem) => problem.level === 'error');
  const warnings = filtered.filter((problem) => problem.level === 'warning');

  for (const problem of [...errors, ...warnings]) {
    // eslint-disable-next-line no-console
    console.log(`[${problem.level}] ${problem.relativePath}: ${problem.message}`);
  }

  const totalDocs = articles.docs.length + legal.docs.length;

  // eslint-disable-next-line no-console
  console.log(`\n${totalDocs} document(s) checked, ${errors.length} error(s), ${warnings.length} warning(s).`);

  process.exitCode = errors.length > 0 ? 1 : 0;
}

main().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exitCode = 1;
});

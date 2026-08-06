// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief Bumps a single content document's version field in place.
 * @details Usage: `pnpm content:bump-version -- --slug <slug> --collection <articles|legal> --bump <major|minor|patch>`.
 * Standalone (bypasses `MdxCollection`, no git involved) - locates the file by slug, bumps its
 * semver field, and rewrites frontmatter while preserving the MDX body.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import matter from 'gray-matter';
import { isSemver, parseSemver } from '@gp/types';
import type { Semver } from '@gp/types';

import { walkMdxFiles } from '../src/cms/collection/fs-utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../../..');

type BumpKind = 'major' | 'minor' | 'patch';
type Collection = 'articles' | 'legal';

interface BumpVersionArgs {
  slug: string;
  collection: Collection;
  bump: BumpKind;
}

function parseArgs(argv: string[]): BumpVersionArgs {
  const get = (flag: string): string | undefined => {
    const index = argv.indexOf(flag);

    return index === -1 ? undefined : argv[index + 1];
  };

  const slug = get('--slug');
  const collection = get('--collection');
  const bump = get('--bump');

  if (!slug) throw new Error('Missing required --slug <slug>');
  if (collection !== 'articles' && collection !== 'legal') {
    throw new Error('Missing/invalid --collection <articles|legal>');
  }
  if (bump !== 'major' && bump !== 'minor' && bump !== 'patch') {
    throw new Error('Missing/invalid --bump <major|minor|patch>');
  }

  return { slug, collection, bump };
}

function bumpSemver(current: Semver, bump: BumpKind): string {
  const parts = parseSemver(current);

  switch (bump) {
    case 'major':
      return `${parts.major + 1}.0.0`;
    case 'minor':
      return `${parts.major}.${parts.minor + 1}.0`;
    case 'patch':
      return `${parts.major}.${parts.minor}.${parts.patch + 1}`;
  }
}

async function findFileBySlug(collectionDir: string, slug: string): Promise<string> {
  const filePaths = await walkMdxFiles(collectionDir);

  for (const filePath of filePaths) {
    if (filePath.endsWith('README.md')) continue;
    const raw = await fs.readFile(filePath, 'utf-8');
    // Explicit `{}` options bypasses gray-matter's content-keyed cache, which returns a stale
    // shallow copy (missing `.matter`) on a second parse of the same raw string - see `main()`,
    // which re-parses this same file's content once its path is found here.
    const { data } = matter(raw, {});

    if (data['slug'] === slug) return filePath;
  }

  throw new Error(`No document with slug "${slug}" found under "${collectionDir}"`);
}

/**
 * @brief Replaces (or appends) a single top-level frontmatter field's value in the raw YAML block,
 * leaving every other line - and its original formatting - untouched.
 * @details Deliberately avoids a full `matter.stringify()` round-trip: gray-matter parses date-like
 * scalars (e.g. `effectiveDate: 2026-01-01`) into real `Date` objects, and re-serializing the whole
 * frontmatter object would reformat every such field into a verbose ISO timestamp, corrupting
 * unrelated content on every bump.
 */
function setFrontmatterField(rawFrontmatter: string, field: string, value: string): string {
  const linePattern = new RegExp(`^${field}:.*$`, 'm');

  if (linePattern.test(rawFrontmatter)) {
    return rawFrontmatter.replace(linePattern, `${field}: ${value}`);
  }

  return `${rawFrontmatter}\n${field}: ${value}`;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const collectionDir = path.join(REPO_ROOT, 'content', args.collection);
  const filePath = await findFileBySlug(collectionDir, args.slug);

  const raw = await fs.readFile(filePath, 'utf-8');
  const parsed = matter(raw, {});
  const rawFrontmatter = parsed.matter;
  const { content, data } = parsed;

  // Articles use `contentVersion`; legal documents use `version`.
  const versionField = args.collection === 'articles' ? 'contentVersion' : 'version';
  const currentVersion = data[versionField];
  const current: Semver =
    typeof currentVersion === 'string' && isSemver(currentVersion) ? currentVersion : ('1.0.0' as Semver);

  const next = bumpSemver(current, args.bump);
  const dateField = args.collection === 'articles' ? 'dateModified' : 'updateDate';
  const today = new Date().toISOString().slice(0, 10);

  let updatedFrontmatter = setFrontmatterField(rawFrontmatter, versionField, next);

  updatedFrontmatter = setFrontmatterField(updatedFrontmatter, dateField, today);

  await fs.writeFile(filePath, `---${updatedFrontmatter}\n---\n${content}`, 'utf-8');

  // eslint-disable-next-line no-console
  console.log(`Bumped ${path.relative(REPO_ROOT, filePath)}: ${current} -> ${next}`);
}

main().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { after, before, describe, it } from 'node:test';
import { z } from 'zod';

import { publishStatusSchema } from '../../shared/publish-status';
import { MdxCollection } from './collection';

const testFrontmatterSchema = z.object({
  draft: z.boolean().default(false),
  locale: z.string().default('en'),
  publishAt: z.date().optional(),
  publishStatus: publishStatusSchema.optional(),
  slug: z.string().min(1),
  title: z.string().min(1),
  translationGroupId: z.string().optional()
});

type TestFrontmatter = z.infer<typeof testFrontmatterSchema>;

async function withNodeEnv<T>(value: string | undefined, fn: () => Promise<T>): Promise<T> {
  const prev = process.env['NODE_ENV'];

  if (value === undefined) {
    delete process.env['NODE_ENV'];
  } else {
    process.env['NODE_ENV'] = value;
  }

  try {
    return await fn();
  } finally {
    if (prev === undefined) {
      delete process.env['NODE_ENV'];
    } else {
      process.env['NODE_ENV'] = prev;
    }
  }
}

describe('MdxCollection publish visibility', () => {
  let tmpDir: string;
  let collection: MdxCollection<TestFrontmatter>;

  before(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'gp-mdx-collection-test-'));

    const fixtures: Record<string, string> = {
      'published-article.mdx': `---\ntitle: Published\nslug: published-article\ndraft: false\n---\n\nHello world.`,
      'draft-article.mdx': `---\ntitle: Draft\nslug: draft-article\ndraft: true\n---\n`,
      'archived-article.mdx': `---\ntitle: Archived\nslug: archived-article\npublishStatus: archived\n---\n`,
      'future-scheduled.mdx': `---\ntitle: Scheduled Future\nslug: future-scheduled\npublishStatus: scheduled\npublishAt: 2099-01-01\n---\n`,
      'localized-only.mdx': `---\ntitle: Localized Default\nslug: localized-only\ndraft: false\n---\n\nEnglish body.`,
      'localized-only.fr.mdx': `---\ntitle: Localized FR Draft\nslug: localized-only\nlocale: fr\ntranslationGroupId: localized-only\ndraft: true\n---\n`
    };

    await Promise.all(
      Object.entries(fixtures).map(([filename, body]) => fs.writeFile(path.join(tmpDir, filename), body, 'utf-8'))
    );

    collection = new MdxCollection<TestFrontmatter>({
      contentDir: tmpDir,
      schema: testFrontmatterSchema
    });
  });

  after(async () => {
    if (tmpDir) {
      await fs.rm(tmpDir, { force: true, recursive: true });
    }
  });

  it('hides drafts and unpublished docs in production across getAll, getSlugs, getBySlug, and getCompiledBySlug', async () => {
    await withNodeEnv('production', async () => {
      const docs = await collection.getAll();
      const slugs = await collection.getSlugs();

      assert.deepEqual(docs.map((d) => d.slug).sort(), ['localized-only', 'published-article']);
      assert.deepEqual(slugs.sort(), ['localized-only', 'published-article']);

      assert.ok(await collection.getBySlug('published-article'));
      assert.equal(await collection.getBySlug('draft-article'), undefined);
      assert.equal(await collection.getBySlug('archived-article'), undefined);
      assert.equal(await collection.getBySlug('future-scheduled'), undefined);

      assert.ok(await collection.getCompiledBySlug('published-article'));
      assert.equal(await collection.getCompiledBySlug('draft-article'), undefined);
    });
  });

  it('falls back to default locale in production when a localized variant is a draft', async () => {
    await withNodeEnv('production', async () => {
      const resolved = await collection.getBySlug('localized-only', 'fr');

      assert.equal(resolved?.frontmatter.locale, 'en');
    });
  });

  it('includes drafts (excluding archived) in development mode', async () => {
    await withNodeEnv('development', async () => {
      const docs = await collection.getAll();

      assert.deepEqual(docs.map((d) => `${d.slug}:${d.frontmatter.locale}`).sort(), [
        'draft-article:en',
        'future-scheduled:en',
        'localized-only:en',
        'localized-only:fr',
        'published-article:en'
      ]);

      assert.ok(await collection.getBySlug('draft-article'));
      assert.ok(await collection.getCompiledBySlug('draft-article'));
      assert.equal(await collection.getBySlug('archived-article'), undefined);
      assert.equal((await collection.getBySlug('localized-only', 'fr'))?.frontmatter.locale, 'fr');
    });
  });

  it('supports explicit includeDrafts override for preview tokens even in production', async () => {
    await withNodeEnv('production', async () => {
      assert.equal(await collection.getBySlug('draft-article'), undefined);
      assert.ok(await collection.getBySlug('draft-article', 'en', { includeDrafts: true }));
      assert.ok(await collection.getCompiledBySlug('draft-article', 'en', { includeDrafts: true }));
    });
  });
});

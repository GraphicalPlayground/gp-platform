// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { ARTICLE_ROUTES, findArticleRouteByBasePath, getArticlePath } from './article-routes';

describe('ARTICLE_ROUTES', () => {
  it('maps every article type to its plural marketing route path', () => {
    assert.equal(getArticlePath('breakdown', 'engines/4a-engine'), '/breakdowns/engines/4a-engine');
    assert.equal(getArticlePath('changelog', 'v0-1-0'), '/changelogs/v0-1-0');
    assert.equal(getArticlePath('comparison', 'vulkan-vs-dx12'), '/comparisons/vulkan-vs-dx12');
    assert.equal(getArticlePath('glossary', 'keyframe'), '/glossary/keyframe');
    assert.equal(getArticlePath('guide', 'first-triangle'), '/guides/first-triangle');
    assert.equal(getArticlePath('interview', 'john-doe'), '/interviews/john-doe');
    assert.equal(getArticlePath('research', 'radiance-cascades'), '/research/radiance-cascades');
    assert.equal(getArticlePath('roadmap', 'q4-2026'), '/roadmaps/q4-2026');
    assert.equal(getArticlePath('showcase', 'ray-marcher'), '/showcases/ray-marcher');
    assert.equal(getArticlePath('tech-article', 'allocators'), '/tech-articles/allocators');
    assert.equal(getArticlePath('testimonial', 'student-story'), '/testimonials/student-story');
  });

  it('provides non-empty titles, descriptions, and keywords for all 11 content index routes', () => {
    const entries = Object.values(ARTICLE_ROUTES);

    assert.equal(entries.length, 11);

    for (const entry of entries) {
      assert.ok(entry.title.length > 0);
      assert.ok(entry.description.length >= 80 && entry.description.length <= 165);
      assert.ok(entry.keywords.length > 0);
      assert.equal(findArticleRouteByBasePath(entry.basePath)?.basePath, entry.basePath);
    }
  });
});

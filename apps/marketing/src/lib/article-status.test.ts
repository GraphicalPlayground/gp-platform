// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getDevDraftTokenLabel, getDraftArticleLabel, resolveArticlePublishStatus } from './article-status';

describe('article-status', () => {
  it('resolves draft, published, and scheduled statuses consistently', () => {
    const now = new Date('2026-11-11T00:00:00Z');

    assert.equal(resolveArticlePublishStatus({ draft: true }, now), 'draft');
    assert.equal(resolveArticlePublishStatus({ draft: false }, now), 'published');
    assert.equal(resolveArticlePublishStatus({ draft: false, publishStatus: 'in-review' }, now), 'in-review');
    assert.equal(
      resolveArticlePublishStatus(
        { draft: false, publishAt: new Date('2026-12-01T00:00:00Z'), publishStatus: 'scheduled' },
        now
      ),
      'scheduled'
    );
    assert.equal(
      resolveArticlePublishStatus(
        { draft: false, publishAt: new Date('2026-10-01T00:00:00Z'), publishStatus: 'scheduled' },
        now
      ),
      'published'
    );
  });

  it('returns draft token labels only in non-production environments', () => {
    assert.equal(getDraftArticleLabel({ draft: true }), 'Draft article');
    assert.equal(getDraftArticleLabel({ draft: false }), null);

    assert.equal(getDevDraftTokenLabel({ draft: true }, new Date(), 'development'), 'Draft article');
    assert.equal(getDevDraftTokenLabel({ draft: false }, new Date(), 'development'), undefined);

    assert.equal(getDevDraftTokenLabel({ draft: true }, new Date(), 'production'), undefined);
    assert.equal(getDevDraftTokenLabel({ draft: false }, new Date(), 'production'), undefined);
  });
});

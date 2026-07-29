// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cms } from '@/lib/cms';
import { Link } from '@gp/ui/components';

export default async function ChangelogsPage() {
  const articles = await cms.articles.getChangelogEntries();

  return (
    <div>
      <h1>Changelogs</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.frontmatter.slug}>
            <Link
              className='text-text-link-rest hover:text-text-link-pressed underline'
              href={`/changelogs/${article.frontmatter.slug}`}
              title={article.frontmatter.title}
            >
              {article.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

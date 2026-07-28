// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cms } from '@/lib/cms';
import { Link } from '@gp/ui/components';

export default async function LegalPage() {
  const docs = await cms.legal.getAll();
  return (
    <div>
      <h1>Legal</h1>
      <ul>
        {docs.map((doc) => (
          <li key={doc.frontmatter.slug}>
            <Link
              className='text-text-link-rest hover:text-text-link-pressed underline'
              href={`/legal/${doc.frontmatter.slug}`}
              title={doc.frontmatter.title}
            >
              {doc.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

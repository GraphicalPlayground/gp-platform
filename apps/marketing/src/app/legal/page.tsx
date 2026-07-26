// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cms } from '@/lib/cms';

export default async function LegalPage() {
  const docs = await cms.legal.getAll();
  return (
    <div>
      <h1>Legal</h1>
      <ul>
        {docs.map((doc) => (
          <li key={doc.frontmatter.slug}>
            <a className='hover:text-link' href={`/legal/${doc.frontmatter.slug}`}>
              {doc.frontmatter.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

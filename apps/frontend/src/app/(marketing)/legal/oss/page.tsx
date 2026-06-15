// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { metadata as layoutMetadata } from '../layout';
import type { Metadata } from 'next';

import Content from './content.md';

export const metadata: Metadata = { ...layoutMetadata, title: 'Open Source Software Notice' };

export default function OpenSourceSoftwaresPage() {
  return (
    <article className='legal-article'>
      <Content />
    </article>
  );
}

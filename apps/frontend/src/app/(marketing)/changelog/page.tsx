// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Changelog | Graphical Playground',
  description: 'Stay up to date with the latest changes and updates to Graphical Playground.',
  keywords: ['changelog', 'updates', 'news', 'release notes']
});

export default function ChangelogPage() {
  return <div>Changelog</div>;
}

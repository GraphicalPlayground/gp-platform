// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Press | Graphical Playground',
  description: 'Stay updated with the latest news and announcements about Graphical Playground.',
  keywords: ['press', 'news', 'announcements', 'updates']
});

export default function PressPage() {
  return <div>Press</div>;
}

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Features | Graphical Playground',
  description: 'Discover the powerful features of Graphical Playground and how they can enhance your creative workflow.',
  keywords: ['features', 'capabilities', 'tools', 'creative']
});

export default function FeaturesPage() {
  return <div>Features</div>;
}

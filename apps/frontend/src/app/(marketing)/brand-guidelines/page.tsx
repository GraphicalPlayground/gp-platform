// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Brand Guidelines | Graphical Playground',
  description: 'Learn about our brand guidelines and how to use our visual identity.',
  keywords: ['brand guidelines', 'visual identity', 'design system', 'logo usage', 'color palette', 'typography']
});

export default function BrandGuidelinesPage() {
  return <div>Brand Guidelines</div>;
}

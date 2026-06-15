// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Sponsors | Graphical Playground',
  description: 'Learn about our sponsors and partners who support the Graphical Playground community.',
  keywords: ['sponsors', 'partners', 'support', 'community']
});

export default function SponsorsPage() {
  return <div>Sponsors</div>;
}

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Security | Graphical Playground',
  description: 'Learn about the security measures and protocols in place at Graphical Playground.',
  keywords: ['security', 'privacy', 'data protection', 'safety']
});

export default function SecurityPage() {
  return <div>Security</div>;
}

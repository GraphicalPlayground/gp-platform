// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'FAQ | Graphical Playground',
  description: 'Find answers to frequently asked questions about Graphical Playground.',
  keywords: ['faq', 'questions', 'help', 'support']
});

export default function FAQPage() {
  return <div>FAQ</div>;
}

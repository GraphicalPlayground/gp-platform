// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Help | Graphical Playground',
  description: 'Get help and support for using Graphical Playground.',
  keywords: ['help', 'support', 'faq', 'questions']
});

export default function HelpPage() {
  return <div>Help</div>;
}

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Contact Us | Graphical Playground',
  description: 'Get in touch with the Graphical Playground team.',
  keywords: ['contact', 'get in touch', 'support']
});

export default function ContactPage() {
  return <div>Contact Us</div>;
}

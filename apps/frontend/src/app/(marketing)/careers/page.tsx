// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Careers | Graphical Playground',
  description: 'Explore career opportunities at Graphical Playground and learn about our team.',
  keywords: ['careers', 'jobs', 'job openings', 'employment', 'team']
});

export default function CareersPage() {
  return <div>Careers</div>;
}

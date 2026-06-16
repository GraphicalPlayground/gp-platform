// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/under-construction';

export const metadata: Metadata = createMetadata({
  title: 'Studio | Graphical Playground',
  description: 'Discover the power of our studio platform and how it can enhance your creative projects.',
  keywords: ['studio', 'creative tools', 'collaboration', 'capabilities']
});

export default function StudioPage() {
  return (
    <div className='w-full h-[50vh] flex justify-center items-center'>
      <UnderConstruction />
    </div>
  );
}

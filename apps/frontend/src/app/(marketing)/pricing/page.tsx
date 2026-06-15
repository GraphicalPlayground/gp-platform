// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Pricing | Graphical Playground',
  description: 'View our pricing options and find the perfect plan for your needs.',
  keywords: ['pricing', 'plans', 'subscriptions', 'cost']
});

export default function PricingPage() {
  return <div>Pricing</div>;
}

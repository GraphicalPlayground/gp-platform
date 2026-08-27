// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cms } from '@/lib/cms';
import { LegalLayoutClient } from '@/layouts/legal';

/**
 * @brief Server-side layout component for legal documents.
 * @returns A React functional component that fetches legal documents and renders the LegalLayoutClient with the fetched documents and children.
 */
export default async function LegalLayout({ children }: { children: React.ReactNode }) {
  const docs = await cms.legal.getAll({ includeDrafts: false });

  return <LegalLayoutClient docs={docs}>{children}</LegalLayoutClient>;
}

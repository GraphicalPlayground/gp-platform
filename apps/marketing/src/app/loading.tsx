// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { RouteLoadingView } from '@/components/route-state';

/**
 * @brief Renders the root Suspense fallback while a route segment is loading.
 */
export default function Loading() {
  return <RouteLoadingView />;
}

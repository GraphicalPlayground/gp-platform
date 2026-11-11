// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * @brief Custom hook to determine if a given href matches the current page's path.
 * @returns An object containing the `isCurrentPage` function.
 */
export function usePageMatcher() {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Set path on mount to avoid SSR hydration mismatches
    setCurrentPath(window.location.pathname);
  }, []);

  const isCurrentPage = useCallback(
    (href: string): boolean => {
      if (!currentPath || !href) return false;

      // Normalize paths to ensure trailing slashes don't break the match
      const normalizedPath = currentPath.replace(/\/$/, '') || '/';
      const normalizedHref = href.replace(/\/$/, '') || '/';

      return normalizedPath === normalizedHref;
    },
    [currentPath]
  );

  return { isCurrentPage };
}

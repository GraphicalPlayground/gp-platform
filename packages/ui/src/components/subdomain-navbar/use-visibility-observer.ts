// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

export type VisibilityMap = {
  [key: string]: boolean;
};

/**
 * @brief A custom React hook that observes the visibility of navigation items within a given navigation container.
 * @param navigationRef - A React ref object pointing to the navigation container (typically a <ul> element).
 * @param children - The child elements of the navigation container, which may change over time.
 * @returns An array containing a single object that maps each navigation item's 'data-navitemid' to its visibility status (true for visible, false for not visible).
 *
 * This hook uses the Intersection Observer API to monitor the visibility of each navigation item within the specified container.
 * It updates the visibility map whenever an item's visibility changes, allowing components to react to these changes as needed.
 */
export function useVisibilityObserver(
  navigationRef: RefObject<HTMLUListElement | null>,
  children: React.ReactNode
): [VisibilityMap] {
  const [visibilityMap, setVisibilityMap] = useState<VisibilityMap>({});
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const updatedEntries: VisibilityMap = {};

    for (const entry of entries) {
      const navitemid = entry.target.getAttribute('data-navitemid');

      if (navitemid) {
        if (entry.isIntersecting) {
          updatedEntries[navitemid] = true;
        } else {
          updatedEntries[navitemid] = false;
        }
      }
    }

    setVisibilityMap((prev) => ({
      ...prev,
      ...updatedEntries
    }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: navigationRef.current,
      threshold: 1
    });

    if (navigationRef.current) {
      const navItems = Array.from(navigationRef.current.children);

      for (const item of navItems) {
        if (item.getAttribute('data-navitemid')) {
          observer.observe(item);
        }
      }
    }

    return () => observer.disconnect();
  }, [navigationRef, children]);

  return [visibilityMap];
}

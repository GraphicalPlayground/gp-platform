// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useEffect } from 'react';

/**
 * @brief Custom hook to observe the resize of the window.
 * @param callback - Callback function to be called when the window is resized
 */
export function useResizeObserver(callback: (window: ResizeObserverEntry) => void) {
  useEffect(() => {
    const observer = new window.ResizeObserver((entries) => {
      const entry = entries[0];

      if (entry === undefined) {
        return;
      }

      callback(entry);
    });

    observer.observe(document.documentElement);

    return () => {
      observer.disconnect();
    };
  }, [callback]);
}

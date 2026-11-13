// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';

export function useOnClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler?: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  excludeRef?: React.RefObject<HTMLElement | null>
): void {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent | FocusEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        (excludeRef && excludeRef.current && excludeRef.current.contains(event.target as Node))
      ) {
        return;
      }
      if (handler) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener, { passive: true });
    document.addEventListener('focusin', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
      document.removeEventListener('focusin', listener);
    };
  }, [ref, handler, excludeRef]);
}

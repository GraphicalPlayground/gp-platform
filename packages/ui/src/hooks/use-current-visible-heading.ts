// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

const ACTIVATION_LINE_RATIO = 0.6;

/**
 * @brief Custom React hook to determine the currently visible heading in a scrollable container.
 * @param options - An object containing a ref to the scrollable container.
 * @returns The ID of the currently visible heading, or undefined if no heading is visible.
 */
export const useCurrentVisibleHeading = (options: { ref: RefObject<HTMLDivElement | null> }) => {
  const [currVisibleHeading, setCurrVisibleHeading] = useState<string | undefined>();

  useEffect(() => {
    const root = options.ref.current;

    if (root === null) {
      return;
    }

    let headings: HTMLElement[] = Array.from(root.querySelectorAll<HTMLElement>('h2[id]'));
    let frame = 0;

    const computeActive = () => {
      frame = 0;
      if (headings.length === 0) return;

      const activationLine = window.innerHeight * ACTIVATION_LINE_RATIO;

      const measured = headings.map((heading) => ({ heading, top: heading.getBoundingClientRect().top }));

      let active: HTMLElement | undefined;
      let bestTop = -Infinity;

      for (const { heading, top } of measured) {
        if (top <= activationLine && top > bestTop) {
          bestTop = top;
          active = heading;
        }
      }

      const nextId = active?.id;

      if (typeof nextId === 'string' && nextId.length > 0) {
        setCurrVisibleHeading((prev) => (prev === nextId ? prev : nextId));
      }
    };

    const schedule = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(computeActive);
    };

    const mutationObserver = new MutationObserver(() => {
      const next = Array.from(root.querySelectorAll<HTMLElement>('h2[id]'));
      const changed = next.length !== headings.length || next.some((h, i) => h !== headings[i]);

      if (changed) {
        headings = next;
        schedule();
      }
    });

    mutationObserver.observe(root, { childList: true, subtree: true });

    schedule();
    window.addEventListener('scroll', schedule);
    window.addEventListener('resize', schedule);

    return () => {
      mutationObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [options.ref]);

  return currVisibleHeading;
};

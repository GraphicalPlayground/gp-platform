// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useEffect, useState } from 'react';

const HEADER_WRAPPER_SELECTOR = '.js-header-wrapper';
const OVERLAY_FIXED_SELECTOR = '.js-header-overlay-fixed';

const OBSERVER_OPTIONS: IntersectionObserverInit = { rootMargin: '100px 0px 0px 0px' };

/**
 * @brief Custom hook to determine if the header is at the top of the page.
 * @param headerRef - React ref to the header element
 * @param fixed - Whether the header is fixed or not
 * @returns { isTop } - Boolean indicating if the header is at the top of the page
 */
export function useHeaderIsTop(headerRef: React.RefObject<HTMLElement | null>, fixed: boolean): { isTop: boolean } {
  const [isTop, setIsTop] = useState(true);
  const [trackedFixed, setTrackedFixed] = useState(fixed);

  if (trackedFixed !== fixed) {
    setTrackedFixed(fixed);
    if (!fixed) setIsTop(true);
  }

  useEffect(() => {
    const header = headerRef.current;

    if (!header || (!fixed && !document.querySelector(OVERLAY_FIXED_SELECTOR))) return;

    const wrapper = header.closest<HTMLElement>(HEADER_WRAPPER_SELECTOR);
    const anchor = wrapper ?? header;

    const sentinel = document.createElement('div');

    sentinel.setAttribute('data-scroll-watcher', 'true');
    anchor.before(sentinel);

    // Initialize native IntersectionObserver directly for the dynamically created sentinel
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      const atTop = entry.isIntersecting;

      setIsTop(atTop);
      headerRef.current?.closest<HTMLElement>(HEADER_WRAPPER_SELECTOR)?.setAttribute('data-is-top', String(atTop));
    }, OBSERVER_OPTIONS);

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
      wrapper?.setAttribute('data-is-top', 'true');
    };
  }, [fixed, headerRef]);

  return { isTop };
}

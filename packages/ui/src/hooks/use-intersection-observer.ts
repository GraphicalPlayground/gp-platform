// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';

/**
 * @brief Custom hook to observe the intersection of an element with the viewport.
 * @param element - React ref to the element to observe
 * @param options - IntersectionObserver options, with optional isOnce and threshold (number or {mobile, desktop})
 * @param shouldUseDesktopThreshold - Whether to use desktop threshold (default: true)
 * @returns { isIntersecting, observer }
 */
export function useIntersectionObserver(
  element: React.RefObject<Element | null>,
  options: Omit<IntersectionObserverInit, 'threshold'> & {
    isOnce?: boolean;
    threshold?: number | { mobile?: number; desktop: number };
  } = {},
  shouldUseDesktopThreshold = true
) {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const observeElement = useEffectEvent(() => {
    if (element?.current) {
      if (observer.current) {
        observer.current.unobserve(element.current);
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (options.isOnce && entry?.isIntersecting) {
            observer.current?.disconnect();
          }

          setIsIntersecting(!!entry?.isIntersecting);
        },
        {
          ...options,
          threshold:
            typeof options.threshold === 'number'
              ? options.threshold
              : options.threshold?.[shouldUseDesktopThreshold ? 'desktop' : 'mobile']
        }
      );

      observer.current.observe(element.current);
    }
  });

  useEffect(() => {
    observeElement();
  }, [element, shouldUseDesktopThreshold]);

  useEffect(() => {
    const el = element?.current;

    return () => {
      if (el && observer.current) {
        observer.current.unobserve(el);
      }
    };
  }, []);

  return {
    isIntersecting,
    observer
  };
}

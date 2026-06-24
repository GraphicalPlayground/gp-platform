// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { useState, useEffect } from 'react';

/**
 * @brief A React hook that listens for changes to a CSS media query and returns whether it currently matches.
 * @param query The CSS media query string to listen for (e.g., '(max-width: 768px)').
 * @returns A boolean indicating whether the media query currently matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    mediaQueryList.addEventListener('change', handleChange);
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * @brief A set of predefined media queries for common breakpoints and features.
 */
export const MediaQueries = {
  // Breakpoints
  isMobile: '(max-width: 767px)',
  isTablet: '(min-width: 768px) and (max-width: 1024px)',
  isDesktop: '(min-width: 1025px)',
  isLargeDesktop: '(min-width: 1440px)',
  isExtraLargeDesktop: '(min-width: 1920px)',

  // Exact ranges (sometimes easier to consume)
  isMobileOnly: '(max-width: 767px)',
  isTabletOnly: '(min-width: 768px) and (max-width: 1024px)',
  isDesktopOnly: '(min-width: 1025px) and (max-width: 1439px)',
  isLargeDesktopOnly: '(min-width: 1440px) and (max-width: 1919px)',
  isExtraLargeDesktopOnly: '(min-width: 1920px)',

  // Inclusive groups
  isTabletUp: '(min-width: 769px)',
  isDesktopUp: '(min-width: 1025px)',
  isLargeDesktopUp: '(min-width: 1440px)',
  isTabletDown: '(max-width: 1024px)',
  isDesktopDown: '(max-width: 1439px)',
  isLargeDesktopDown: '(max-width: 1919px)',

  // Orientation
  isPortrait: '(orientation: portrait)',
  isLandscape: '(orientation: landscape)',

  // Input capabilities
  isTouch: '(pointer: coarse)',
  isMouse: '(pointer: fine)',
  canHover: '(hover: hover)',
  cannotHover: '(hover: none)',

  // Accessibility / user preferences
  prefersDarkMode: '(prefers-color-scheme: dark)',
  prefersLightMode: '(prefers-color-scheme: light)',
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
  prefersNoReducedMotion: '(prefers-reduced-motion: no-preference)',
  prefersHighContrast: '(prefers-contrast: more)',
  prefersReducedData: '(prefers-reduced-data: reduce)',

  // Display characteristics
  isRetina: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
  isPrint: 'print'
} as const;

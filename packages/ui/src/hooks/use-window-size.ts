// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';

/**
 * @brief Custom breakpoint sizes for responsive design.
 */
export enum BreakpointSize {
  XSMALL = 'xsmall',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  XLARGE = 'xlarge',
  XXLARGE = 'xxlarge'
}

/**
 * @brief WindowSize type definition for the useWindowSize hook.
 */
type WindowSize = {
  width?: number;
  height?: number;
  isXSmall?: boolean;
  isSmall?: boolean;
  isMedium?: boolean;
  isLarge?: boolean;
  isXLarge?: boolean;
  isXXLarge?: boolean;
  currentBreakpointSize?: BreakpointSize;
};

/**
 * @brief A utility function that determines the current breakpoint size based on the window width.
 * @param value - The current window width.
 * @returns The corresponding BreakpointSize enum value.
 */
const breakpointSwitch = (value: number) => {
  let current = BreakpointSize.XXLARGE;

  switch (true) {
    case value >= 320 && value < 544:
      current = BreakpointSize.XSMALL;
      break;
    case value >= 544 && value < 768:
      current = BreakpointSize.SMALL;
      break;
    case value >= 768 && value < 1012:
      current = BreakpointSize.MEDIUM;
      break;
    case value >= 1012 && value < 1280:
      current = BreakpointSize.LARGE;
      break;
    case value >= 1280 && value < 1440:
      current = BreakpointSize.XLARGE;
      break;
    default:
      current = BreakpointSize.XXLARGE;
  }

  return current;
};

/**
 * @brief A custom React hook that provides the current window size and breakpoint information.
 * @returns An object containing the current window width, height, and breakpoint information.
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState<WindowSize>({
    width: undefined,
    height: undefined,
    isXSmall: undefined,
    isSmall: undefined,
    isMedium: undefined,
    isLarge: undefined,
    isXLarge: undefined,
    isXXLarge: undefined,
    currentBreakpointSize: undefined
  });

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isXSmall: window.innerWidth >= 320,
        isSmall: window.innerWidth >= 544,
        isMedium: window.innerWidth >= 768,
        isLarge: window.innerWidth >= 1012,
        isXLarge: window.innerWidth >= 1280,
        isXXLarge: window.innerWidth >= 1440,
        currentBreakpointSize: breakpointSwitch(window.innerWidth)
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

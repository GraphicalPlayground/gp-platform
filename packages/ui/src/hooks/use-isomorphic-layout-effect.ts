// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useEffect, useLayoutEffect } from 'react';

/**
 * @brief A custom React hook that uses useLayoutEffect on the client and useEffect on the server to avoid warnings during server-side rendering.
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? useLayoutEffect
    : useEffect;

export default useIsomorphicLayoutEffect;

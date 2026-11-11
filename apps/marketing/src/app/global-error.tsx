// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useEffect } from 'react';
import { GlobalErrorShell } from '@/components/route-state';
import './globals.css';

export interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry?: () => void;
}

/**
 * @brief Root error boundary fallback replacing `RootLayout` if the root shell fails to render.
 */
export default function GlobalError({ error, reset, unstable_retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    if (unstable_retry) {
      unstable_retry();

      return;
    }

    reset();
  };

  return (
    <html className='min-h-screen antialiased scroll-smooth' data-scroll-behavior='smooth' lang='en'>
      <body className='relative w-full min-h-screen flex flex-col scroll-smooth'>
        <title>Application Error | Graphical Playground</title>
        <GlobalErrorShell digest={error.digest} onRetry={handleRetry} />
      </body>
    </html>
  );
}

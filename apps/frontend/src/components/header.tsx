// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { cn } from '@/utils/cn';
import React, { useEffect, useState } from 'react';

export interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {}

/**
 * @brief A header component that becomes sticky and changes style when the user scrolls down the page.
 */
export const Header: React.FC<HeaderProps> = ({ children, className, ...rest }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as Document | Element;
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || (target instanceof Element ? target.scrollTop : 0);
      setIsScrolled(scrollTop > 20);
    };
    handleScroll(new Event('scroll'));
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', handleScroll, { capture: true });
  }, []);

  return (
    <header className={cn('sticky top-0 z-50 flex w-full justify-center px-6 py-4 max-md:px-4', className)} {...rest}>
      <div
        className={cn(
          'flex w-full items-center justify-between transition-all duration-300',
          isScrolled
            ? 'max-w-3xl rounded-full bg-surface-secondary/80 px-6 py-3 pr-4 shadow-[inset_0_0_0_1px_var(--border)] backdrop-blur-lg'
            : 'max-w-5xl px-0 py-0'
        )}
      >
        {children}
      </div>
    </header>
  );
};

/*

header > sticky top-0 z-50 flex w-full justify-center px-6 py-4 max-md:px-4
  div > flex w-full items-center justify-between transition-all duration-300 max-w-5xl px-0 py-0
    a > shrink-0
      svg > hidden shrink-0 max-[400px]:block
    div > flex h-8 items-center gap-4

  on scroll a bit

  div > flex w-full items-center justify-between transition-all duration-300 bg-surface-secondary/80 max-w-3xl rounded-full px-6 py-3 pr-4 shadow-[inset_0_0_0_1px_var(--border)] backdrop-blur-lg

 */

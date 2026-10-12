// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * @brief Open/close state for the marketing-header mobile menu, replacing the legacy `details:toggled` flow with React state.
 * The consumer derives the header's `open` / `details--on` classes from `isOpen`.
 */
export function useHeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback((options?: { restoreFocus?: boolean }) => {
    setIsOpen(false);
    if (options?.restoreFocus) toggleRef.current?.focus();
  }, []);

  const toggle = useCallback(() => setIsOpen((previous) => !previous), []);

  // Escape closes the menu and restores focus to the toggle; only bound while open.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return { isOpen, open, close, toggle, toggleRef };
}

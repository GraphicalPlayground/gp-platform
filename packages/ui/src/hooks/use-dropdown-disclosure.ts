// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { useEffect, useLayoutEffect, useRef } from 'react';
import type { FocusEvent, KeyboardEvent, MouseEvent, RefObject } from 'react';

// Hover-open flows through the same React `isOpen` state as click/keyboard, so Escape, focus-out, and
// mouse-leave dismissal all apply uniformly. Gated to hover-capable fine pointers at the desktop
// breakpoint, so it never fires on touch or the narrow accordion layout (below 1012px).
function isHoverCapableDesktop(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1012px)').matches
  );
}

// Short intent delays: the open delay lets a genuine click win the race (mousedown cancels the
// pending open) and ignores accidental brushes; the longer close delay lets the pointer slip back
// toward the panel without it flickering shut.
const HOVER_OPEN_DELAY_MS = 90;
const HOVER_CLOSE_DELAY_MS = 180;

type UseDropdownDisclosureOptions = {
  isOpen: boolean;
  onOpenChange?: (nextOpen: boolean) => void;
};

type ContainerHandlers = {
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onBlur: (event: FocusEvent<HTMLDivElement>) => void;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

type UseDropdownDisclosureResult = {
  containerRef: RefObject<HTMLDivElement | null>;
  dropdownRef: RefObject<HTMLDivElement | null>;
  buttonRef: RefObject<HTMLButtonElement | null>;
  containerHandlers: ContainerHandlers;
  onButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

// Owns a NavDropdown's hover-intent and dismissal behavior, keeping the component focused on render.
// Hover, click, and keyboard all drive the single `isOpen` state (owned by the parent for
// one-open-at-a-time coordination) via `onOpenChange`.
export function useDropdownDisclosure(options: UseDropdownDisclosureOptions): UseDropdownDisclosureResult {
  const { isOpen, onOpenChange } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Single hover-intent timer; open and close are mutually exclusive, so one slot suffices.
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Whether the pointer is currently within the disclosure, so blur doesn't close a hover-opened
  // panel while hover is still an active trigger (WCAG 1.4.13 persistent).
  const isPointerInsideRef = useRef(false);
  // Previous open state, so the effect below can detect an open -> closed transition.
  const wasOpenRef = useRef(isOpen);

  // Restore focus to the trigger when the panel closes while focus is still inside it, so focus is
  // never stranded on hidden content. Centralizing on the open -> closed transition covers every
  // close path — including being closed by a sibling opening, which fires no local event here. Runs
  // before paint so focus moves before the panel is visually hidden.
  useLayoutEffect(() => {
    const wasOpen = wasOpenRef.current;

    wasOpenRef.current = isOpen;

    if (!wasOpen || isOpen) return;
    const active = document.activeElement;

    if (active instanceof HTMLElement && Boolean(containerRef.current?.contains(active))) {
      buttonRef.current?.focus();
    }
  }, [isOpen]);

  function clearHoverTimer() {
    if (hoverTimerRef.current !== null) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }

  // Clear a pending hover-intent timer if unmounted mid-delay.
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current !== null) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  function handleButtonClick(event: MouseEvent<HTMLButtonElement>) {
    // Ignore non-primary (middle/right) activations.
    if (event.button !== 0) return;
    clearHoverTimer();
    onOpenChange?.(!isOpen);
  }

  function handleMouseDown() {
    // A press commits to a click, so drop any pending hover-open and let the click toggle from the
    // current state instead of racing a stale hover-open.
    clearHoverTimer();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    // Keep Escape local (stopPropagation) so the first Escape closes only this panel; a second
    // reaches the marketing-header's document-level handler.
    if (event.key !== 'Escape' || !isOpen) return;
    event.preventDefault();
    event.stopPropagation();
    clearHoverTimer();
    onOpenChange?.(false);
    buttonRef.current?.focus();
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!isOpen) return;
    const nextFocused = event.relatedTarget as Node | null;

    // Focus stayed inside the disclosure — not a dismissal.
    if (nextFocused && event.currentTarget.contains(nextFocused)) return;

    // Hover is still an active trigger: while the pointer remains inside on a hover-capable desktop,
    // keep the panel open (WCAG 1.4.13 persistent) and let mouse-leave close it when the pointer
    // actually leaves. Closing on blur here would strand the panel shut under a resting pointer with
    // no mouse-enter to reopen it, now that the CSS `:hover` reveal is gone.
    if (isHoverCapableDesktop() && isPointerInsideRef.current) return;
    clearHoverTimer();
    onOpenChange?.(false);
  }

  function handleMouseEnter() {
    isPointerInsideRef.current = true;
    if (!isHoverCapableDesktop()) return;
    // Cancel a pending close (or not-yet-fired open); only schedule an open when actually closed.
    clearHoverTimer();
    if (isOpen) return;
    hoverTimerRef.current = setTimeout(() => {
      hoverTimerRef.current = null;
      // Re-check: the viewport may have narrowed to the accordion layout during the delay.
      if (!isHoverCapableDesktop()) return;
      onOpenChange?.(true);
    }, HOVER_OPEN_DELAY_MS);
  }

  function handleMouseLeave() {
    isPointerInsideRef.current = false;
    if (!isHoverCapableDesktop()) return;
    // Cancel a pending open (an accidental brush never opens); only schedule a close when open.
    // Focus restoration is handled centrally by the open -> closed effect above.
    clearHoverTimer();
    if (!isOpen) return;
    hoverTimerRef.current = setTimeout(() => {
      hoverTimerRef.current = null;
      // Re-check: the viewport may have narrowed to the accordion layout during the delay.
      if (!isHoverCapableDesktop()) return;
      onOpenChange?.(false);
    }, HOVER_CLOSE_DELAY_MS);
  }

  return {
    containerRef,
    dropdownRef,
    buttonRef,
    containerHandlers: {
      onKeyDown: handleKeyDown,
      onBlur: handleBlur,
      onMouseDown: handleMouseDown,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    },
    onButtonClick: handleButtonClick
  };
}

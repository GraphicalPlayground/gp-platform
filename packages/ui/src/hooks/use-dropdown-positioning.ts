// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { useCallback, useEffect, useLayoutEffect } from 'react';
import type { RefObject } from 'react';

type DropdownPosition = 'right' | 'offset-left' | 'center' | 'left';

const OFFSET_AMOUNT = 48;

/**
 * @brief Determines the optimal position for a dropdown relative to its trigger element.
 * @param container - The trigger element (e.g., button) that opens the dropdown.
 * @param dropdown - The dropdown panel element to be positioned.
 * @returns The calculated position as a string: 'right', 'offset-left', 'center', or 'left'.
 * @remarks This function calculates the best position for the dropdown to ensure it fits within the viewport.
 * It checks if the dropdown can fit to the right of the trigger, then tries an offset left position,
 * and finally checks if it can be centered. If none of these positions fit, it defaults to 'left'.
 */
function determineDropdownPosition(container: HTMLElement, dropdown: HTMLElement): DropdownPosition {
  const containerRect = container.getBoundingClientRect();
  // The panel is `transform: scale(0.99)` while closed, so `getBoundingClientRect().width` is
  // undersized. `offsetWidth` is the untransformed layout width the placement math needs.
  const dropdownWidth = dropdown.offsetWidth;
  const viewportWidth = window.innerWidth - 16;

  const fitsRight = containerRect.left + dropdownWidth <= viewportWidth;

  if (fitsRight) {
    return 'right';
  }

  const offsetLeft = containerRect.left - OFFSET_AMOUNT;
  const offsetRight = offsetLeft + dropdownWidth;
  const fitsWithOffset = offsetLeft >= 0 && offsetRight <= viewportWidth;

  if (fitsWithOffset) {
    return 'offset-left';
  }

  const centerLeft = containerRect.left + containerRect.width / 2 - dropdownWidth / 2;
  const centerRight = centerLeft + dropdownWidth;
  const fitsCenter = centerLeft >= 0 && centerRight <= viewportWidth;

  if (fitsCenter) {
    return 'center';
  }

  return 'left';
}

/**
 * @brief Hook that positions a dropdown relative to its trigger element, ensuring it fits within the viewport.
 * @param containerRef - Ref to the trigger element (e.g., button).
 * @param dropdownRef - Ref to the dropdown panel element.
 * @param isOpen - Boolean indicating whether the dropdown is currently open.
 * @returns void
 * @remarks This hook uses ResizeObserver and window resize events to dynamically adjust the dropdown's position.
 * It applies CSS classes to the dropdown element based on its calculated position: 'open-left', 'open-center', or 'open-offset-left'.
 */
export function useDropdownPositioning(
  containerRef: RefObject<HTMLElement | null>,
  dropdownRef: RefObject<HTMLElement | null>,
  isOpen: boolean
) {
  const updateDropdownPosition = useCallback(() => {
    const container = containerRef.current;
    const dropdown = dropdownRef.current;

    if (!container || !dropdown) return;

    if (window.innerWidth < 1012) return;

    const position = determineDropdownPosition(container, dropdown);

    dropdown.classList.remove('open-left', 'open-center', 'open-offset-left');

    if (position === 'offset-left') {
      dropdown.classList.add('open-offset-left');
    } else if (position === 'center') {
      dropdown.classList.add('open-center');
    } else if (position === 'left') {
      dropdown.classList.add('open-left');
    }
  }, [containerRef, dropdownRef]);

  // Recompute before paint whenever React opens the panel, so placement is correct on the first
  // frame and never visibly jumps.
  useLayoutEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
    }
  }, [isOpen, updateDropdownPosition]);

  useEffect(() => {
    const container = containerRef.current;
    const dropdown = dropdownRef.current;

    if (!container || !dropdown) return;

    // Compute once on mount even while closed, so the correct placement class is set before the
    // first open. Every open (click, keyboard, or hover) is state-driven, so the `useLayoutEffect`
    // above already recomputes before paint.
    updateDropdownPosition();

    // Viewport dependency (window width and the trigger's shifting position) is driven by the window
    // `resize` event, not a root ResizeObserver: observing the root is disallowed by
    // `no-viewport-resize-observer` and fires on every layout change, repeating synchronous work.
    window.addEventListener('resize', updateDropdownPosition);

    // ResizeObserver is scoped to real content-size changes of the trigger and panel. It does NOT
    // fire on visibility or transform changes, so it can't drive opens — hence the mount, resize,
    // and open-layout recomputes above.
    const resizeObserver = new ResizeObserver(updateDropdownPosition);

    resizeObserver.observe(container);
    resizeObserver.observe(dropdown);

    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
      resizeObserver.disconnect();
    };
  }, [containerRef, dropdownRef, updateDropdownPosition]);
}

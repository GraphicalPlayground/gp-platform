// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useEffect, useRef } from 'react';

const HEADER_WRAPPER_SELECTOR = '.js-header-wrapper';

/**
 * @brief Debounces a callback to the next animation frame, cancelling any previously scheduled frame.
 * @param callback The function to be called on the next animation frame.
 * @returns A function that, when called, will schedule the callback to be executed on the next animation frame.
 */
function debounceWithFrame(callback: () => void): () => void {
  let frame = 0;

  return () => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(callback);
  };
}

/**
 * @brief Applies padding to the top of the header menu to ensure it is positioned correctly below the header and any content above it.
 * @param header The header element.
 * @param headerMenu The header menu element.
 * @param headerWrapper The header wrapper element, if it exists.
 * This function calculates the appropriate padding-top value for the header menu based on the height of the header
 * and any content above it. It takes into account whether the header or its wrapper is fixed or absolute, and adjusts
 * the padding accordingly to ensure that the menu does not overlap with the header or other content.
 */
function applyMenuPaddingTop(header: HTMLElement, headerMenu: HTMLElement, headerWrapper: HTMLElement | null): void {
  const headerPosition = getComputedStyle(header).position;
  const headerIsFixed = headerPosition === 'fixed';
  const headerWrapperIsFixed = headerWrapper ? getComputedStyle(headerWrapper).position === 'fixed' : false;

  let height = (headerWrapper ?? header).clientHeight;

  if (headerPosition === 'absolute' || (headerIsFixed && headerWrapper)) height += header.clientHeight;
  if (!headerWrapperIsFixed && !headerIsFixed) height -= window.scrollY;

  headerMenu.style.setProperty('padding-top', `${height}px`);
}

/**
 * @brief Measures the height of the content above the header within the header wrapper.
 * @param header The header element.
 * @param headerWrapper The header wrapper element.
 * @returns The height of the content above the header in pixels.
 */
function measureContentAboveHeader(header: HTMLElement, headerWrapper: HTMLElement): number {
  const headerBranch = Array.from(headerWrapper.children).find((child) => child.contains(header));

  return headerBranch instanceof HTMLElement ? headerBranch.offsetTop : 0;
}

/**
 * @brief Custom hook to recalculate navigation padding based on header and menu states.
 * @param headerRef A ref to the header element.
 * @param headerMenuRef A ref to the header menu element.
 */
type UseNavPaddingRecalculationArgs = {
  headerRef: React.RefObject<HTMLElement | null>;
  headerMenuRef: React.RefObject<HTMLElement | null>;
  toggleRef: React.RefObject<HTMLButtonElement | null>;
  isOpen: boolean;
};

/**
 *  @brief Custom hook to recalculate navigation padding based on header and menu states.
 */
export function useNavPaddingRecalculation({
  headerMenuRef,
  headerRef,
  isOpen,
  toggleRef
}: UseNavPaddingRecalculationArgs): void {
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const header = headerRef.current;
    const headerMenu = headerMenuRef.current;
    const toggle = toggleRef.current;

    if (!header || !headerMenu) return;

    const headerWrapper = header.closest<HTMLElement>(HEADER_WRAPPER_SELECTOR);

    const recalculateNavPadding = () => applyMenuPaddingTop(header, headerMenu, headerWrapper);
    const recalculateIfMenuNotOpened = () => {
      if (!isOpenRef.current) recalculateNavPadding();
    };
    const recalculateIfMenuOpened = () => {
      if (isOpenRef.current) recalculateNavPadding();
    };

    let resizeObserver: ResizeObserver | undefined;

    if (headerWrapper && getComputedStyle(headerWrapper).position === 'fixed') {
      const recalculateNavHeightVariable = () => {
        let height = headerWrapper.clientHeight;

        if (getComputedStyle(header).position === 'fixed') {
          height += header.clientHeight;
          const contentAboveHeader = measureContentAboveHeader(header, headerWrapper);

          header.style.setProperty('--marketing-header-fixed-top', `${contentAboveHeader}px`);
        }
        document.documentElement.style.setProperty('--header-wrapper-height', `${height}px`);
      };
      const recalculateNavHeightVariableDebounced = debounceWithFrame(recalculateNavHeightVariable);

      resizeObserver = new ResizeObserver(() => recalculateNavHeightVariableDebounced());
      resizeObserver.observe(headerWrapper);
      resizeObserver.observe(header);
      recalculateNavHeightVariable();
    }

    toggle?.addEventListener('mousedown', recalculateIfMenuNotOpened);
    toggle?.addEventListener('touchstart', recalculateIfMenuNotOpened, { passive: true });
    toggle?.addEventListener('keydown', recalculateIfMenuNotOpened);

    document.addEventListener('global-banner:close', recalculateIfMenuOpened);

    return () => {
      resizeObserver?.disconnect();
      toggle?.removeEventListener('mousedown', recalculateIfMenuNotOpened);
      toggle?.removeEventListener('touchstart', recalculateIfMenuNotOpened);
      toggle?.removeEventListener('keydown', recalculateIfMenuNotOpened);
      document.removeEventListener('global-banner:close', recalculateIfMenuOpened);
    };
  }, [headerRef, headerMenuRef, toggleRef]);

  useEffect(() => {
    if (!isOpen) return;
    const header = headerRef.current;
    const headerMenu = headerMenuRef.current;

    if (!header || !headerMenu) return;

    const headerWrapper = header.closest<HTMLElement>(HEADER_WRAPPER_SELECTOR);
    const recalculateNavPadding = () => applyMenuPaddingTop(header, headerMenu, headerWrapper);
    const recalculateNavPaddingDebounced = debounceWithFrame(recalculateNavPadding);

    recalculateNavPadding();
    window.addEventListener('resize', recalculateNavPaddingDebounced);

    return () => window.removeEventListener('resize', recalculateNavPaddingDebounced);
  }, [isOpen, headerRef, headerMenuRef]);
}

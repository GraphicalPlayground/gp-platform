// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@primer/octicons-react';

import type { BaseProps } from '../helper';
import { useVisibilityObserver } from './use-visibility-observer';
import type { VisibilityMap } from './use-visibility-observer';
import type { SubdomainNavBarLinkProps } from './subdomain-navbar';

import styles from './subdomain-navbar.module.css';
import { useKeyboardEscape, useWindowSize, useProvidedRefOrCreate, useOnClickOutside } from '../../hooks';

type NavigationVisibilityObserverProps = React.PropsWithChildren<
  BaseProps<HTMLUListElement> & React.HTMLAttributes<HTMLUListElement>
>;

/**
 * @brief A React component that observes the visibility of its child navigation items and displays an overflow menu if any items are not visible.
 * @param props - The props for the component, including children and any additional HTML attributes for the <ul> element.
 * @returns A React element that renders a navigation list with visibility observation and an overflow menu if necessary.
 */
export const NavigationVisbilityObserver = React.forwardRef<HTMLUListElement, NavigationVisibilityObserverProps>(
  ({ children, className, ...rest }, forwardedRef) => {
    const navRef = useProvidedRefOrCreate<HTMLUListElement>(
      forwardedRef as React.RefObject<HTMLUListElement> | React.RefCallback<HTMLUListElement> | null
    );
    const [visibilityMap] = useVisibilityObserver(navRef, children);
    const { isMedium } = useWindowSize();

    const showOverflow = Object.values(visibilityMap).includes(false);

    return (
      <ul className={clsx(styles['subdomain-navbar-primary-nav-list'], className)} ref={navRef} {...rest}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement<SubdomainNavBarLinkProps>(child)) {
            const visibilityKey = child.props['data-navitemid'];

            if (!visibilityKey) {
              return child;
            }
            const isVisible = visibilityMap[visibilityKey];

            return React.cloneElement(child, {
              className: clsx(
                child.props.className,
                isMedium && isVisible && styles['subdomain-navbar-primary-nav-list-item--visible'],
                isMedium && isVisible === false && styles['subdomain-navbar-primary-nav-list-item--invisible']
              )
            });
          }

          return child;
        })}

        {showOverflow && <AnchoredOverlay visibilityMap={visibilityMap}>{children}</AnchoredOverlay>}
      </ul>
    );
  }
);

type AnchoredOverlayProps = {
  visibilityMap: VisibilityMap;
} & BaseProps<HTMLDivElement>;

/**
 * @brief A React component that renders an overflow menu for navigation items that are not visible within the main navigation container.
 * @param props - The props for the component, including children, visibilityMap, and any additional HTML attributes for the <div> element.
 * @returns A React element that renders an overflow menu with navigation items that are not visible in the main navigation container.
 */
function AnchoredOverlay({ children, className, visibilityMap }: React.PropsWithChildren<AnchoredOverlayProps>) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const ref = React.useRef<HTMLLIElement | null>(null);

  useOnClickOutside(ref, () => handleClose());

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  useKeyboardEscape(handleClose);

  return (
    <li className={clsx(styles['subdomain-navbar-primary-nav-list-item--overflow'], className)} ref={ref}>
      <button
        aria-expanded={open ? 'true' : 'false'}
        aria-controls='more-navigation'
        aria-haspopup='true'
        onClick={handleClick}
        className={clsx(styles['subdomain-navbar-link'], styles['subdomain-navbar-more-link'])}
      >
        More
        <ChevronDownIcon />
      </button>

      <div
        id='more-navigation'
        style={{ display: open ? 'block' : 'none' }}
        className={clsx(styles['subdomain-navbar-overflow-menu'])}
      >
        <ul className={clsx(styles['subdomain-navbar-overflow-menu-list'])}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement<SubdomainNavBarLinkProps>(child)) {
              const navItemChild = child.props['data-navitemid'];

              if (!navItemChild || visibilityMap[navItemChild]) {
                return null;
              }

              return (
                <React.Fragment>
                  {React.cloneElement(child, {
                    onClick: handleClose,
                    className: clsx(styles['subdomain-navbar-overflow-menu-item'], child.props.className)
                  })}
                </React.Fragment>
              );
            }

            return null;
          })}
        </ul>
      </div>
    </li>
  );
}

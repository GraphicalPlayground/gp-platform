// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './nav-dropdown.module.css';

import { TriangleRightIcon } from '@primer/octicons-react';
import { NavGroup } from '../nav-group';
import type { NavGroupProps } from '../nav-group';
import { NavLink } from '../nav-link';
import type { NavLinkProps } from '../nav-link';

import { useDropdownDisclosure, useDropdownPositioning } from '../../hooks';

/**
 * @brief Type definition for the NavDropdown component.
 */
export type NavDropdownType = {
  groups: NavGroupProps[];
  render?: boolean;
  title: string;
  trailingLink?: NavLinkProps;
};

/**
 * @brief Props for the NavDropdown component.
 */
type NavDropdownProps = NavDropdownType & {
  isOpen?: boolean;
  onOpenChange?: (nextOpen: boolean) => void;
};

/**
 * @brief A dropdown component for navigation, supporting groups of links and an optional trailing link.
 */
export const NavDropdown: React.FC<NavDropdownProps> = ({
  groups,
  isOpen = false,
  onOpenChange,
  render = true,
  title,
  trailingLink
}) => {
  const panelId = React.useId();

  const { buttonRef, containerHandlers, containerRef, dropdownRef, onButtonClick } = useDropdownDisclosure({
    isOpen,
    onOpenChange
  });

  useDropdownPositioning(containerRef, dropdownRef, isOpen);

  if (render === false) {
    return null;
  }

  return (
    // Container handlers only add dismissal affordances (Escape, focus-out, mouse-leave); the button
    // is the interactive control, so the wrapper intentionally has no role.
    <div
      ref={containerRef}
      className={clsx(styles.container, {
        // Global `open` class drives the CSS open state, derived from React state.
        open: isOpen
      })}
      {...containerHandlers}
    >
      <button
        ref={buttonRef}
        type='button'
        className={styles.button}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onButtonClick}
      >
        {title}

        <TriangleRightIcon size={16} className={styles.buttonIcon} />
      </button>

      <div ref={dropdownRef} id={panelId} className={styles.dropdown}>
        <ul className={styles.list}>
          {groups.map((group) => (
            <li key={group.title}>
              <NavGroup {...group} />
            </li>
          ))}
        </ul>

        {trailingLink ? (
          <div className={styles.trailingLinkContainer}>
            <NavLink {...trailingLink} withArrow />
          </div>
        ) : null}
      </div>
    </div>
  );
};

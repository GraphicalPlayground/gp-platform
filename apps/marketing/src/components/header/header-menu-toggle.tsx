// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './header-menu-toggle.module.css';

/**
 * @brief HeaderMenuToggleProps defines the properties for the HeaderMenuToggle component.
 */
export interface HeaderMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * @brief HeaderMenuToggle is a button component that toggles the visibility of the header menu.
 * It displays three horizontal bars when the menu is closed and an "X" when the menu is open.
 */
export const HeaderMenuToggle = React.forwardRef<HTMLButtonElement, HeaderMenuToggleProps>(
  ({ isOpen, onToggle }, ref) => {
    return (
      <button
        ref={ref}
        aria-expanded={isOpen}
        aria-label='Toggle navigation'
        className={clsx(styles.toggle, isOpen && styles.toggleClose)}
        type='button'
        onClick={onToggle}
      >
        <span className={styles.toggleBar} />
        <span className={styles.toggleBar} />
        <span className={styles.toggleBar} />
      </button>
    );
  }
);

HeaderMenuToggle.displayName = 'gp.HeaderMenuToggle';

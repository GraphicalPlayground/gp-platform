// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useCallback } from 'react';
import clsx from 'clsx';
import styles from './staff-toggle-bar.module.css';

/**
 * @brief The props for the StaffToggleBar component.
 */
export interface StaffToggleBarProps extends React.HTMLAttributes<HTMLDivElement> {
  showAdminToggle: boolean;
  isAdminModeOn: boolean;
  adminTogglePath?: string;
  showUiOptOut: boolean;
  isUiOptedOut: boolean;
  uiOptOutTogglePath?: string;
}

/**
 * @brief A component that renders a toggle bar for staff members to switch between admin mode and UI service opt-out.
 */
export const StaffToggleBar: React.FC<StaffToggleBarProps> = ({
  showAdminToggle,
  isAdminModeOn,
  adminTogglePath,
  showUiOptOut,
  isUiOptedOut,
  uiOptOutTogglePath,
  className,
  ...rest
}) => {
  const renderAdmin = showAdminToggle && Boolean(adminTogglePath);
  const renderUiOptOut = showUiOptOut && Boolean(uiOptOutTogglePath);

  const handleAdminToggle = useCallback(async () => {
    if (!adminTogglePath) return;
    try {
      // await reactFetch(adminTogglePath, { method: 'PATCH' });
      window.location.reload();
    } catch {
      // eslint-disable-next-line no-console
      console.error('Failed to toggle site admin mode');
    }
  }, [adminTogglePath]);

  const handleUiOptOutToggle = useCallback(async () => {
    if (!uiOptOutTogglePath) return;
    try {
      // await reactFetch(uiOptOutTogglePath, { method: 'PATCH' });
      window.location.reload();
    } catch {
      // eslint-disable-next-line no-console
      console.error('Failed to toggle UI service opt-out');
    }
  }, [uiOptOutTogglePath]);

  if (!renderAdmin && !renderUiOptOut) {
    return null;
  }

  return (
    <div className={clsx(styles['staff-toggle-bar'], className)} {...rest}>
      <div className={styles['staff-toggle-bar--container']}>
        <nav aria-label='Staff toggles'>
          <ul>
            {renderAdmin && (
              <li>
                <button
                  type='button'
                  className={styles['staff-toggle-bar--button']}
                  data-hotkey='`,Shift+S'
                  onClick={handleAdminToggle}
                  aria-pressed={isAdminModeOn}
                  aria-label={
                    isAdminModeOn
                      ? 'Turn off site admin mode (currently on)'
                      : 'Turn on site admin mode (currently off)'
                  }
                >
                  Site admin mode{' '}
                  <span className={styles['staff-toggle-bar--state']}>{isAdminModeOn ? 'on' : 'off'}</span>
                </button>
              </li>
            )}
            {renderUiOptOut && (
              <li>
                <button
                  type='button'
                  className={styles['staff-toggle-bar--button']}
                  onClick={handleUiOptOutToggle}
                  aria-pressed={isUiOptedOut}
                  aria-label={
                    isUiOptedOut
                      ? 'Opt in to UI service (currently opted out)'
                      : 'Opt out of UI service (currently opted in)'
                  }
                >
                  UI service <span className={styles['staff-toggle-bar--state']}>{isUiOptedOut ? 'off' : 'on'}</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

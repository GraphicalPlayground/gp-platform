// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import styles from './auth-cta.module.css';

import { AuthCTALink } from './auth-cta-link';

export interface MobileAuthActionsProps {
  loggedIn: boolean;
  loginPath: string;
  dashboardPath: string;
  isMenuOpen: boolean;
}

/**
 * @brief MobileAuthActions is a component that renders authentication-related actions for mobile devices.
 */
export const MobileAuthActions: React.FC<MobileAuthActionsProps> = ({
  dashboardPath,
  isMenuOpen,
  loggedIn,
  loginPath
}) => {
  const tabIndex = isMenuOpen ? -1 : undefined;

  return (
    <div className={styles.mobileActions}>
      {loggedIn ? (
        <AuthCTALink href={dashboardPath} tabIndex={tabIndex} variant='subtle'>
          Dashboard
        </AuthCTALink>
      ) : (
        <>
          <AuthCTALink href={loginPath} tabIndex={tabIndex} variant='subtle'>
            Sign in
          </AuthCTALink>
        </>
      )}
    </div>
  );
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './auth-cta.module.css';

import { AuthCTALink } from './auth-cta-link';

interface DesktopAuthActionsProps {
  loggedIn: boolean;
  signupEnabled: boolean;
  isSignupController: boolean;
  loginPath: string;
  signupPath: string;
  dashboardPath: string;
}

/**
 * @brief DesktopAuthActions renders the desktop authentication actions for the header.
 */
export const DesktopAuthActions: React.FC<DesktopAuthActionsProps> = ({
  dashboardPath,
  isSignupController,
  loggedIn,
  loginPath,
  signupEnabled,
  signupPath
}) => {
  if (loggedIn) {
    return (
      <AuthCTALink className={clsx(styles.desktopOnly, styles.desktopActionGap)} href={dashboardPath} variant='subtle'>
        Dashboard
      </AuthCTALink>
    );
  }

  const showSignup = signupEnabled && !isSignupController;

  return (
    <>
      <div className={styles.signInWrap}>
        <AuthCTALink
          className={clsx(styles.desktopActionGap, showSignup && styles.hiddenBelowLg)}
          href={loginPath}
          variant='subtle'
        >
          Sign in
        </AuthCTALink>
      </div>

      {showSignup ? (
        <AuthCTALink href={signupPath} variant='secondary'>
          Sign up
        </AuthCTALink>
      ) : null}
    </>
  );
};

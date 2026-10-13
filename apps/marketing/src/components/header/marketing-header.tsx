// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useRef } from 'react';
import clsx from 'clsx';
import styles from './marketing-header.module.css';

import { useHeaderMenu, useHeaderIsTop, useNavPaddingRecalculation } from '@/hooks';
import { useFocusTrap } from '@gp/ui/hooks';
import { BrandIcon } from '@gp/ui/components';

import { HeaderMenuToggle } from './header-menu-toggle';
import { DesktopAuthActions, MobileAuthActions } from './auth';
import { MobileHeaderTitle } from './mobile-header-title';
import type { MarketingHeaderTitle } from './mobile-header-title';

import { MarketingNavigation } from '../navigation';
import { headerNavData } from '@/data/header';
import Link from 'next/link';

import { useAuth } from '@clerk/nextjs';

export interface MarketingHeaderProps {
  overlay?: boolean;
  fixed?: boolean;
  mobileHeaderTitle?: MarketingHeaderTitle;
  showSearchAndNav?: boolean;
  hideSearch?: boolean;
  privateModeEnabled?: boolean;
  signupEnabled?: boolean;
  isSignupController?: boolean;
  loginPath?: string;
  signupPath?: string;
  homePath?: string;
  dashboardPath?: string;
}

/**
 * @brief MarketingHeader is a component that renders the header for the marketing pages of the application.
 * It includes navigation, authentication actions, and a mobile menu toggle.
 */
export const MarketingHeader: React.FC<MarketingHeaderProps> = ({
  dashboardPath = '/',
  fixed = false,
  hideSearch = true,
  homePath = '/',
  isSignupController = false,
  loginPath = '/sign-in',
  mobileHeaderTitle,
  overlay = false,
  privateModeEnabled = false,
  showSearchAndNav = true,
  signupEnabled = false,
  signupPath = '/sign-up'
}) => {
  const searchVisible = !hideSearch && !privateModeEnabled;

  const { close, isOpen, toggle, toggleRef } = useHeaderMenu();
  const headerRef = useRef<HTMLElement | null>(null);
  const headerMenuRef = useRef<HTMLDivElement | null>(null);

  useNavPaddingRecalculation({ headerRef, headerMenuRef, toggleRef, isOpen });
  const { isTop } = useHeaderIsTop(headerRef, fixed);

  useFocusTrap({ containerRef: headerRef, initialFocusRef: toggleRef, disabled: !isOpen });

  const { isSignedIn } = useAuth();

  return (
    <header
      ref={headerRef}
      data-color-mode='light'
      data-dark-theme='dark'
      data-is-top={String(isTop)}
      data-light-theme='light'
      data-marketing-header='true'
      role='banner'
      className={clsx(styles.root, 'HeaderMktg', 'header-logged-out', {
        [styles.overlay]: overlay,
        [styles.fixed]: fixed,
        [styles.open]: isOpen,
        'open': isOpen,
        'details--on': isOpen
      })}
    >
      <h2 className={styles.visuallyHidden}>Navigation Menu</h2>

      <button
        aria-label='Close navigation menu'
        className={styles.backdrop}
        type='button'
        onClick={() => close({ restoreFocus: true })}
      />

      <div className={styles.bar}>
        <div className={styles.topRow}>
          <div className={styles.toggleSlot}>
            <HeaderMenuToggle ref={toggleRef} isOpen={isOpen} onToggle={toggle} />
          </div>

          <Link aria-label='Homepage' className={styles.logo} href={homePath} tabIndex={isOpen ? -1 : undefined}>
            <BrandIcon fill='currentColor' height={32} variant='icon' />
          </Link>

          <MobileAuthActions
            dashboardPath={dashboardPath}
            isMenuOpen={isOpen}
            loggedIn={isSignedIn ?? false}
            loginPath={loginPath}
          />
        </div>

        {mobileHeaderTitle ? <MobileHeaderTitle isMenuOpen={isOpen} title={mobileHeaderTitle} /> : null}

        <div ref={headerMenuRef} className={styles.menu}>
          <div className={styles.menuWrapper}>
            {showSearchAndNav === true && <MarketingNavigation data={headerNavData} />}

            <div className={styles.ctaContainer}>
              {searchVisible === true && /* <HeaderSearch onOpen={close} /> */ <span>Search</span>}

              <DesktopAuthActions
                dashboardPath={dashboardPath}
                isSignupController={isSignupController}
                loggedIn={isSignedIn ?? false}
                loginPath={loginPath}
                signupEnabled={signupEnabled}
                signupPath={signupPath}
              />
            </div>
          </div>
        </div>
      </div>

      {!overlay && <div aria-hidden='true' className={styles.bottomBorder} />}
    </header>
  );
};

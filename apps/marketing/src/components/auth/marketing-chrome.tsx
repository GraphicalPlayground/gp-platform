// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Organization } from '@gp/constants';
import { ArrowLeftIcon } from '@primer/octicons-react';
import { BrandIcon, InlineLink, SmartLink, Text } from '@gp/ui/components';
import styles from './auth.module.css';

export interface MarketingChromeProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

const AUTH_ROUTES = ['/sign-in', '/sign-up', '/waitlist'] as const;

function isAuthPath(pathname: string | null): boolean {
  return Boolean(pathname && AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`)));
}

/**
 * @brief Swaps the full marketing header/footer for a distraction-free auth frame on auth routes.
 */
export const MarketingChrome: React.FC<MarketingChromeProps> = ({ children, footer, header }) => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (!isAuthPath(pathname)) {
    return (
      <>
        {header}
        <main className='w-full'>{children}</main>
        {footer}
      </>
    );
  }

  return (
    <>
      <header className={styles.authHeader}>
        <div className={styles.authHeaderInner}>
          <SmartLink aria-label={`${Organization.displayName} homepage`} className={styles.authHomeLink} href='/'>
            <BrandIcon aria-hidden='true' fill='currentColor' height={24} variant='icon' />
            <Text as='span' size='200' weight='semibold'>
              {Organization.displayName}
            </Text>
          </SmartLink>

          <InlineLink className={styles.authBackLink} href='/'>
            <ArrowLeftIcon aria-hidden='true' size={14} />
            <span>Back to home</span>
          </InlineLink>
        </div>
      </header>

      <main className='w-full flex-1 flex flex-col'>{children}</main>

      <footer className={styles.authFooter}>
        <div className={styles.authFooterInner}>
          <Text as='span' size='100' variant='muted'>
            &copy; {currentYear} {Organization.legalName}
          </Text>
          <nav aria-label='Auth legal links' className={styles.authFooterLinks}>
            <InlineLink href='/legal/terms-of-service'>Terms</InlineLink>
            <InlineLink href='/legal/privacy'>Privacy</InlineLink>
            <InlineLink href='/help'>Help</InlineLink>
          </nav>
        </div>
      </footer>
    </>
  );
};

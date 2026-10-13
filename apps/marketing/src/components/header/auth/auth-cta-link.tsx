// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './auth-cta.module.css';

import { Button } from '@gp/ui/components';

type AuthCTALinkProps = {
  href: string;

  children: React.ReactNode;

  className?: string;

  variant: 'secondary' | 'subtle';

  /** `-1` while the mobile menu is open, to keep the CTA out of the trapped tab order. */
  tabIndex?: number;
};

/**
 * @brief AuthCTALink is a component that renders a call-to-action link for authentication purposes.
 * It is typically used for sign-in or sign-up actions in the header of the application.
 */
export const AuthCTALink: React.FC<AuthCTALinkProps> = ({ children, className, href, tabIndex, variant }) => {
  return (
    <Button
      as='a'
      className={clsx(styles.cta, className)}
      href={href}
      size='small'
      tabIndex={tabIndex}
      variant={variant}
    >
      {children}
    </Button>
  );
};

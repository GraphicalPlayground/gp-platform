// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import clsx from 'clsx';
import { AlertFillIcon, CheckCircleFillIcon, InfoIcon } from '@primer/octicons-react';
import { Text } from '@gp/ui/components';
import styles from './auth.module.css';

export interface AuthAlertProps {
  variant?: 'error' | 'info' | 'success';
  children: React.ReactNode;
  className?: string;
}

/**
 * @brief Inline feedback banner for authentication errors, confirmations, and guidance.
 */
export const AuthAlert: React.FC<AuthAlertProps> = ({ children, className, variant = 'error' }) => {
  const role = variant === 'error' ? 'alert' : 'status';
  const variantClass =
    variant === 'error' ? styles.alertError : variant === 'success' ? styles.alertSuccess : styles.alertInfo;

  const icon =
    variant === 'error' ? (
      <AlertFillIcon size={16} />
    ) : variant === 'success' ? (
      <CheckCircleFillIcon size={16} />
    ) : (
      <InfoIcon size={16} />
    );

  return (
    <div
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={clsx(styles.alert, variantClass, className)}
      role={role}
    >
      <span aria-hidden='true' className={styles.alertIcon}>
        {icon}
      </span>
      <Text as='p' className={styles.alertText} size='100'>
        {children}
      </Text>
    </div>
  );
};

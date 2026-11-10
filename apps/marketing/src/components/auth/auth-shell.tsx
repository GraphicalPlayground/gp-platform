// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { BrandIcon, EyebrowText, Heading, Section, Text } from '@gp/ui/components';
import styles from './auth.module.css';

export interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

/**
 * @brief Shared centered layout shell for sign-in, sign-up, and waitlist views.
 */
export const AuthShell: React.FC<AuthShellProps> = ({ children, description, eyebrow, title }) => {
  return (
    <Section
      fullWidth
      backgroundColor='subtle'
      className={styles.section}
      paddingBlockEnd={{ narrow: 'normal', regular: 'spacious' }}
      paddingBlockStart={{ narrow: 'condensed', regular: 'normal' }}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.brandBadge}>
              <BrandIcon aria-hidden='true' fill='currentColor' height={22} variant='icon' />
              <EyebrowText variant='accent'>{eyebrow}</EyebrowText>
            </div>
            <Heading as='h1' size='5' weight='semibold'>
              {title}
            </Heading>
            <Text as='p' size='200' variant='muted'>
              {description}
            </Text>
          </div>

          {children}
        </div>
      </div>
    </Section>
  );
};

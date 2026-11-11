// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import type { OAuthStrategy } from '@clerk/nextjs/types';
import { Button, Spinner, Text } from '@gp/ui/components';
import { renderOAuthStrategyIcon } from './auth-icons';
import { getOAuthProviderLabel } from './auth.utils';
import styles from './auth.module.css';

export interface OAuthButtonsProps {
  strategies: OAuthStrategy[];
  loadingStrategy: OAuthStrategy | null;
  disabled?: boolean;
  actionPrefix?: string;
  showDivider?: boolean;
  dividerLabel?: string;
  onSelect: (strategy: OAuthStrategy) => void;
}

/**
 * @brief Renders branded OAuth provider buttons with per-provider loading indicators.
 */
export const OAuthButtons: React.FC<OAuthButtonsProps> = ({
  actionPrefix = 'Continue with',
  disabled = false,
  dividerLabel = 'or',
  loadingStrategy,
  onSelect,
  showDivider = true,
  strategies
}) => {
  if (strategies.length === 0) {
    return null;
  }

  return (
    <>
      <div className={styles.oauthGrid}>
        {strategies.map((strategy) => {
          const isLoading = loadingStrategy === strategy;
          const label = getOAuthProviderLabel(strategy);

          return (
            <Button
              key={strategy}
              block
              disabled={disabled || loadingStrategy !== null}
              size='medium'
              type='button'
              variant='secondary'
              leadingVisual={
                isLoading ? <Spinner accessibleLabel={null} size='small' /> : renderOAuthStrategyIcon(strategy)
              }
              onClick={() => onSelect(strategy)}
            >
              {isLoading ? `Connecting ${label}...` : `${actionPrefix} ${label}`}
            </Button>
          );
        })}
      </div>

      {showDivider ? (
        <div aria-hidden='true' className={styles.divider}>
          <Text as='span' font='monospace' size='100' variant='muted'>
            {dividerLabel}
          </Text>
        </div>
      ) : null}
    </>
  );
};

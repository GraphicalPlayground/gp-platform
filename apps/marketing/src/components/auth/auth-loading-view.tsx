// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import { Box, Spinner, Stack, Text } from '@gp/ui/components';
import { AuthShell } from './auth-shell';
import authStyles from './auth.module.css';
import stateStyles from '../route-state/route-state.module.css';

export interface AuthLoadingViewProps {
  eyebrow: string;
  title: string;
  description: string;
  accessibleLabel: string;
  statusText?: string;
}

/**
 * @brief Suspense fallback for authentication routes rendered inside `AuthShell`.
 */
export const AuthLoadingView: React.FC<AuthLoadingViewProps> = ({
  accessibleLabel,
  description,
  eyebrow,
  statusText = 'Loading form...',
  title
}) => {
  return (
    <AuthShell description={description} eyebrow={eyebrow} title={title}>
      <Box aria-busy='true' aria-live='polite' className={authStyles.statusCard} role='status'>
        <Stack alignItems='center' direction='horizontal' gap={12} padding='none'>
          <Spinner accessibleLabel={accessibleLabel} size='medium' />
          <Text as='p' size='200' weight='medium'>
            {statusText}
          </Text>
        </Stack>

        <Stack aria-hidden='true' direction='vertical' gap={12} padding='none'>
          <Box className={clsx(stateStyles.skeletonBar, stateStyles.skeletonBarWide)} />
          <Box className={clsx(stateStyles.skeletonBar, stateStyles.skeletonBarMedium)} />
          <Box className={clsx(stateStyles.skeletonBar, stateStyles.skeletonButton)} />
        </Stack>
      </Box>
    </AuthShell>
  );
};

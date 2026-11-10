// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useState } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';
import { Organization } from '@gp/constants';
import { ArrowRightIcon, CheckCircleFillIcon, SignOutIcon } from '@primer/octicons-react';
import { Button, Label, Spinner, Stack, Text } from '@gp/ui/components';
import { getClerkErrorMessage } from './auth.utils';
import { AuthAlert } from './auth-alert';
import styles from './auth.module.css';

export interface SignedInCardProps {
  destinationUrl?: string;
}

/**
 * @brief Displayed on auth pages when the visitor already holds an active Clerk session.
 */
export const SignedInCard: React.FC<SignedInCardProps> = ({ destinationUrl }) => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const email = user?.primaryEmailAddress?.emailAddress ?? user?.username ?? 'your account';
  const displayName = user?.fullName || user?.firstName || email;
  const targetHref = destinationUrl || Organization.subdomain('app');

  const handleSignOut = async () => {
    setError(null);
    setSigningOut(true);

    try {
      await signOut({ redirectUrl: '/sign-in' });
    } catch (err) {
      setError(getClerkErrorMessage(err));
      setSigningOut(false);
    }
  };

  return (
    <div className={styles.statusCard}>
      <Stack alignItems='center' direction='horizontal' justifyContent='space-between' padding='none'>
        <Label color='green' leadingVisual={<CheckCircleFillIcon />} size='small'>
          Active session
        </Label>
      </Stack>

      <Stack direction='vertical' gap={8} padding='none'>
        <Text as='p' size='200' weight='semibold'>
          Signed in as {displayName}
        </Text>
        <Text as='p' size='100' variant='muted'>
          You are already authenticated with {email}. Continue to your workspace or sign out to switch accounts.
        </Text>
      </Stack>

      {error ? <AuthAlert variant='error'>{error}</AuthAlert> : null}

      <Stack direction='vertical' gap={12} padding='none'>
        <Button block as='a' href={targetHref} size='medium' trailingVisual={<ArrowRightIcon />} variant='primary'>
          Open workspace
        </Button>
        <Button
          block
          disabled={signingOut}
          leadingVisual={signingOut ? <Spinner accessibleLabel={null} size='small' /> : <SignOutIcon />}
          size='medium'
          type='button'
          variant='subtle'
          onClick={handleSignOut}
        >
          {signingOut ? 'Signing out...' : 'Sign out and switch account'}
        </Button>
      </Stack>
    </div>
  );
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useClerk, useSignIn, useSignUp } from '@clerk/nextjs';
import { Button, Spinner, Stack, Text } from '@gp/ui/components';
import { getClerkErrorMessage } from './auth.utils';
import { AuthAlert } from './auth-alert';
import styles from './auth.module.css';

export interface SsoCallbackViewProps {
  redirectUrl: string;
  signInUrl?: string;
  signUpUrl?: string;
}

/**
 * @brief Completes Clerk OAuth/Enterprise SSO redirect callbacks using the Core 3 Signal API.
 */
export const SsoCallbackView: React.FC<SsoCallbackViewProps> = ({
  redirectUrl,
  signInUrl = '/sign-in',
  signUpUrl = '/sign-up'
}) => {
  const router = useRouter();
  const clerk = useClerk();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const hasRunRef = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clerk.loaded || hasRunRef.current) {
      return;
    }

    hasRunRef.current = true;

    const navigateToDestination = (decorateUrl: (url: string) => string) => {
      const destination = decorateUrl(redirectUrl);

      if (/^https?:\/\//i.test(destination)) {
        window.location.assign(destination);
      } else {
        router.push(destination as Route);
      }
    };

    const completeFlow = async () => {
      try {
        if (signIn.status === 'complete') {
          const { error: finalizeErr } = await signIn.finalize({
            navigate: ({ decorateUrl }) => navigateToDestination(decorateUrl)
          });

          if (finalizeErr) {
            setError(getClerkErrorMessage(finalizeErr));
          }

          return;
        }

        if (signUp.isTransferable) {
          const { error: transferErr } = await signIn.create({ transfer: true });

          if (transferErr) {
            setError(getClerkErrorMessage(transferErr));

            return;
          }

          if ((signIn.status as string) === 'complete') {
            const { error: finalizeErr } = await signIn.finalize({
              navigate: ({ decorateUrl }) => navigateToDestination(decorateUrl)
            });

            if (finalizeErr) {
              setError(getClerkErrorMessage(finalizeErr));
            }

            return;
          }

          router.replace(signInUrl as Route);

          return;
        }

        if (
          signIn.status === 'needs_first_factor' &&
          !signIn.supportedFirstFactors?.every((factor) => factor.strategy === 'enterprise_sso')
        ) {
          router.replace(signInUrl as Route);

          return;
        }

        if (signIn.isTransferable) {
          const { error: transferErr } = await signUp.create({ transfer: true });

          if (transferErr) {
            setError(getClerkErrorMessage(transferErr));

            return;
          }

          if ((signUp.status as string) === 'complete') {
            const { error: finalizeErr } = await signUp.finalize({
              navigate: ({ decorateUrl }) => navigateToDestination(decorateUrl)
            });

            if (finalizeErr) {
              setError(getClerkErrorMessage(finalizeErr));
            }

            return;
          }

          router.replace(signUpUrl as Route);

          return;
        }

        if (signUp.status === 'complete') {
          const { error: finalizeErr } = await signUp.finalize({
            navigate: ({ decorateUrl }) => navigateToDestination(decorateUrl)
          });

          if (finalizeErr) {
            setError(getClerkErrorMessage(finalizeErr));
          }

          return;
        }

        if (signIn.status === 'needs_second_factor' || signIn.status === 'needs_new_password') {
          router.replace(signInUrl as Route);

          return;
        }

        if (signUp.status === 'missing_requirements') {
          router.replace(signUpUrl as Route);

          return;
        }

        const existingSessionId = signIn.existingSession?.sessionId || signUp.existingSession?.sessionId;

        if (existingSessionId) {
          await clerk.setActive({
            session: existingSessionId,
            navigate: ({ decorateUrl }) => navigateToDestination(decorateUrl)
          });

          return;
        }

        router.replace(signInUrl as Route);
      } catch (err) {
        setError(getClerkErrorMessage(err));
      }
    };

    void completeFlow();
  }, [clerk, clerk.loaded, redirectUrl, router, signIn, signInUrl, signUp, signUpUrl]);

  return (
    <div className={styles.callbackState}>
      {error ? (
        <Stack direction='vertical' gap={16} padding='none'>
          <AuthAlert variant='error'>{error}</AuthAlert>
          <Button block as='a' href={signInUrl} size='medium' variant='secondary'>
            Return to sign in
          </Button>
        </Stack>
      ) : (
        <Stack alignItems='center' direction='horizontal' gap={12} padding='none'>
          <Spinner accessibleLabel='Completing authentication' size='medium' />
          <Stack direction='vertical' gap={4} padding='none'>
            <Text as='p' size='200' weight='medium'>
              Completing authentication...
            </Text>
            <Text as='p' size='100' variant='muted'>
              Verifying your provider response and preparing your workspace session.
            </Text>
          </Stack>
        </Stack>
      )}
      <div className={styles.captchaSlot} id='clerk-captcha' />
    </div>
  );
};

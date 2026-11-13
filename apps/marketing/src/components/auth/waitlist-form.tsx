// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useId, useState } from 'react';
import { useAuth, useWaitlist } from '@clerk/nextjs';
import { Organization } from '@gp/constants';
import { ArrowRightIcon, CheckCircleFillIcon, MailIcon } from '@primer/octicons-react';
import { Button, FormControl, InlineLink, Label, Spinner, Stack, Text, TextInput } from '@gp/ui/components';
import { AuthAlert } from './auth-alert';
import { AuthShell } from './auth-shell';
import { getClerkErrorMessage, isValidEmailFormat, resolveGlobalErrorMessage } from './auth.utils';
import { SignedInCard } from './signed-in-card';
import styles from './auth.module.css';

/**
 * @brief Custom Early-Access Waitlist flow built with `@gp/ui` FormControl/TextInput and Clerk `useWaitlist`.
 */
export const WaitlistView: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { errors, fetchStatus, waitlist } = useWaitlist();

  const [emailAddress, setEmailAddress] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [showFormOverride, setShowFormOverride] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [emailFieldError, setEmailFieldError] = useState<string | null>(null);

  const emailId = useId();
  const isFetching = fetchStatus === 'fetching';
  const hasJoined = Boolean(waitlist.id) && !showFormOverride;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);
    setEmailFieldError(null);

    const trimmedEmail = emailAddress.trim();

    if (!isValidEmailFormat(trimmedEmail)) {
      setEmailFieldError('Enter a valid email address to join the waitlist.');

      return;
    }

    const { error } = await waitlist.join({ emailAddress: trimmedEmail });

    if (error) {
      if (!errors.fields.emailAddress && !errors.global?.length) {
        setLocalError(getClerkErrorMessage(error));
      }

      return;
    }

    setSubmittedEmail(trimmedEmail);
    setShowFormOverride(false);
  };

  const resolvedEmailError =
    emailFieldError ?? errors.fields.emailAddress?.longMessage ?? errors.fields.emailAddress?.message ?? null;
  const globalErrorMessage = resolveGlobalErrorMessage(errors.global, localError);

  return (
    <AuthShell
      eyebrow='EARLY ACCESS // WAITLIST'
      title={hasJoined ? "You're on the waitlist" : 'Join the waitlist'}
      description={
        hasJoined
          ? 'Your spot on the Graphical Playground waitlist is confirmed.'
          : 'Request early access to our interactive Vulkan & WebGPU rendering curriculum.'
      }
    >
      {isLoaded && isSignedIn ? (
        <SignedInCard />
      ) : hasJoined ? (
        <div className={styles.statusCard}>
          <Stack alignItems='center' direction='horizontal' justifyContent='space-between' padding='none'>
            <Label color='green' leadingVisual={<CheckCircleFillIcon />} size='small'>
              Spot reserved
            </Label>
            <Text as='span' font='monospace' size='100' variant='muted'>
              queued
            </Text>
          </Stack>

          <Stack direction='vertical' gap={8} padding='none'>
            <Text as='p' size='200' weight='semibold'>
              {submittedEmail ? `We've added ${submittedEmail}` : 'Your waitlist request is registered'}
            </Text>
            <Text as='p' size='100' variant='muted'>
              We&apos;ll send your personal invite link as soon as your cohort opens. In the meantime, explore our open
              technical guides and engine breakdowns.
            </Text>
          </Stack>

          {waitlist.id ? (
            <div className={styles.statusMeta}>
              <Text as='span' size='100' variant='muted'>
                Reference ID
              </Text>
              <Text as='span' font='monospace' size='100' weight='medium'>
                {waitlist.id}
              </Text>
            </div>
          ) : null}

          <Stack direction='vertical' gap={12} padding='none'>
            <Button block as='a' href='/curriculum' size='medium' trailingVisual={<ArrowRightIcon />} variant='primary'>
              Explore curriculum
            </Button>
            <Button block as='a' href='/breakdowns' size='medium' variant='secondary'>
              Read engine breakdowns
            </Button>
            <Button
              block
              as='a'
              href={Organization.socials.discord}
              rel='noopener noreferrer'
              size='medium'
              target='_blank'
              variant='subtle'
            >
              Join our Discord community
            </Button>
          </Stack>

          <div className={styles.actionsRow}>
            <button
              className={styles.textActionButton}
              type='button'
              onClick={() => {
                setEmailAddress('');
                setShowFormOverride(true);
              }}
            >
              Register another email
            </button>
            <InlineLink href='/sign-in'>Sign in</InlineLink>
          </div>
        </div>
      ) : (
        <>
          {globalErrorMessage ? <AuthAlert variant='error'>{globalErrorMessage}</AuthAlert> : null}

          <form noValidate className={styles.form} onSubmit={handleSubmit}>
            <FormControl fullWidth required id={emailId} validationStatus={resolvedEmailError ? 'error' : undefined}>
              <FormControl.Label>Email address</FormControl.Label>
              <TextInput
                fullWidth
                autoComplete='email'
                className={styles.authInput}
                disabled={isFetching}
                leadingVisual={<MailIcon />}
                name='emailAddress'
                placeholder='you@studio.dev'
                type='email'
                value={emailAddress}
                onChange={(event) => {
                  setLocalError(null);
                  setEmailFieldError(null);
                  setEmailAddress(event.target.value);
                }}
              />
              <FormControl.Hint>We&apos;ll only email you when your invite is ready—never spam.</FormControl.Hint>
              {resolvedEmailError ? <FormControl.Validation>{resolvedEmailError}</FormControl.Validation> : null}
            </FormControl>

            <div className={styles.captchaSlot} id='clerk-captcha' />

            <Button
              block
              disabled={isFetching}
              size='medium'
              trailingVisual={isFetching ? undefined : <ArrowRightIcon />}
              type='submit'
              variant='primary'
            >
              <span className={styles.submitContent}>
                {isFetching ? <Spinner accessibleLabel={null} size='small' /> : null}
                <span>{isFetching ? 'Submitting request...' : 'Request early access'}</span>
              </span>
            </Button>

            <Text as='p' className={styles.legalNote} size='100' variant='muted'>
              By joining the waitlist, you agree to our <InlineLink href='/legal/privacy'>Privacy Policy</InlineLink>{' '}
              and <InlineLink href='/legal/terms-of-service'>Terms of Service</InlineLink>.
            </Text>
          </form>

          <div className={styles.cardFooter}>
            <Text as='span' size='100' variant='muted'>
              Already received an invitation?
            </Text>
            <InlineLink href='/sign-in'>Sign in</InlineLink>
          </div>
        </>
      )}
    </AuthShell>
  );
};

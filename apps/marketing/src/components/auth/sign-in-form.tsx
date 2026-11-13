// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import type { Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuth, useClerk, useSignIn } from '@clerk/nextjs';
import type { OAuthStrategy } from '@clerk/nextjs/types';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DeviceMobileIcon,
  KeyIcon,
  MailIcon,
  PersonIcon,
  ShieldCheckIcon,
  SyncIcon
} from '@primer/octicons-react';
import { Button, Checkbox, FormControl, InlineLink, Label, Spinner, Stack, Text, TextInput } from '@gp/ui/components';
import { AuthAlert } from './auth-alert';
import { AuthShell } from './auth-shell';
import {
  RESEND_COOLDOWN_SECONDS,
  getClerkErrorMessage,
  isValidEmailFormat,
  readClerkCapabilities,
  resolveGlobalErrorMessage,
  resolveSafeRedirectUrl
} from './auth.utils';
import { OAuthButtons } from './oauth-buttons';
import { PasswordField } from './password-field';
import { SignedInCard } from './signed-in-card';
import { SsoCallbackView } from './sso-callback-view';
import styles from './auth.module.css';

export interface SignInViewProps {
  waitlistMode?: boolean;
}

type SignInMethod = 'password' | 'email_code';
type ResetFlowPhase = 'none' | 'request' | 'verify' | 'new_password';
type MfaStrategy = 'totp' | 'email_code' | 'phone_code' | 'backup_code';

const MFA_LABELS: Record<MfaStrategy, string> = {
  totp: 'Authenticator',
  email_code: 'Email code',
  phone_code: 'SMS code',
  backup_code: 'Backup code'
};

const emptySubscribe = () => () => {};
const getPasskeySupport = () => typeof window !== 'undefined' && 'PublicKeyCredential' in window;
const getServerPasskeySupport = () => false;

/**
 * @brief Full custom Sign-In flow powered by `@gp/ui` form controls and Clerk Core 3 Signals.
 */
export const SignInView: React.FC<SignInViewProps> = ({ waitlistMode = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const clerk = useClerk();
  const { isLoaded, isSignedIn } = useAuth();
  const { errors, fetchStatus, signIn } = useSignIn();

  const capabilities = readClerkCapabilities(clerk, waitlistMode);
  const isWaitlist = waitlistMode || capabilities.waitlistMode;

  const fallbackAfterSignIn = clerk.loaded ? clerk.buildAfterSignInUrl() : '/';
  const destinationUrl = resolveSafeRedirectUrl(searchParams.get('redirect_url'), fallbackAfterSignIn || '/');
  const ticketParam = searchParams.get('__clerk_ticket');
  const isSsoCallback = Boolean(pathname?.endsWith('/sso-callback'));

  const [method, setMethod] = useState<SignInMethod>('password');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const [resetPhase, setResetPhase] = useState<ResetFlowPhase>('none');
  const [resetIdentifier, setResetIdentifier] = useState('');
  const [resetChannel, setResetChannel] = useState<'email' | 'phone'>('email');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signOutOtherSessions, setSignOutOtherSessions] = useState(true);

  const [selectedMfa, setSelectedMfa] = useState<MfaStrategy | null>(null);
  const [mfaCode, setMfaCode] = useState('');
  const [mfaCodeSent, setMfaCodeSent] = useState(false);

  const [loadingStrategy, setLoadingStrategy] = useState<OAuthStrategy | null>(null);
  const [passkeyPending, setPasskeyPending] = useState(false);
  const canUsePasskey = useSyncExternalStore(emptySubscribe, getPasskeySupport, getServerPasskeySupport);
  const [cooldown, setCooldown] = useState(0);
  const [hasActiveAttempt, setHasActiveAttempt] = useState(false);

  const [localError, setLocalError] = useState<string | null>(null);
  const [infoNotice, setInfoNotice] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});

  const isFinalizingRef = useRef(false);
  const ticketHandledRef = useRef(false);
  const identifierId = useId();
  const otpId = useId();
  const resetId = useId();
  const resetCodeId = useId();
  const mfaCodeId = useId();

  const isFetching = fetchStatus === 'fetching' || loadingStrategy !== null || passkeyPending;

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  const navigateAfterAuth = (decorateUrl: (url: string) => string) => {
    const decorated = decorateUrl(destinationUrl);

    if (/^https?:\/\//i.test(decorated)) {
      window.location.assign(decorated);
    } else {
      router.push(decorated as Route);
    }
  };

  useEffect(() => {
    if (
      !clerk.loaded ||
      isSsoCallback ||
      !hasActiveAttempt ||
      signIn.status !== 'complete' ||
      isFinalizingRef.current
    ) {
      return;
    }

    isFinalizingRef.current = true;

    void signIn
      .finalize({
        navigate: ({ decorateUrl }) => navigateAfterAuth(decorateUrl)
      })
      .then(({ error }) => {
        if (error) {
          isFinalizingRef.current = false;
          setLocalError(getClerkErrorMessage(error));
        }
      });
  }, [clerk.loaded, hasActiveAttempt, isSsoCallback, signIn, signIn.status]);

  useEffect(() => {
    if (!clerk.loaded || !ticketParam || ticketHandledRef.current || isSsoCallback || isSignedIn) {
      return;
    }

    ticketHandledRef.current = true;
    setHasActiveAttempt(true);

    void signIn.ticket({ ticket: ticketParam }).then(({ error }) => {
      if (error) {
        setLocalError(getClerkErrorMessage(error));
      }
    });
  }, [clerk.loaded, isSignedIn, isSsoCallback, signIn, ticketParam]);

  const availableMfaStrategies = (signIn.supportedSecondFactors ?? [])
    .map((factor) => factor.strategy as MfaStrategy)
    .filter((strategy): strategy is MfaStrategy => strategy in MFA_LABELS);

  const activeMfaStrategy: MfaStrategy | null =
    selectedMfa && availableMfaStrategies.includes(selectedMfa)
      ? selectedMfa
      : availableMfaStrategies.includes('totp')
        ? 'totp'
        : (availableMfaStrategies[0] ?? null);

  const isMfaStep = signIn.status === 'needs_second_factor' || signIn.status === 'needs_client_trust';
  const effectiveResetPhase: ResetFlowPhase = signIn.status === 'needs_new_password' ? 'new_password' : resetPhase;

  const clearErrors = (field?: string) => {
    setLocalError(null);

    if (field) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
    } else {
      setFieldErrors({});
    }
  };

  const resetSignInFlow = async () => {
    isFinalizingRef.current = false;
    setHasActiveAttempt(false);
    setEmailCodeSent(false);
    setOtpCode('');
    setResetPhase('none');
    setResetCode('');
    setNewPassword('');
    setConfirmPassword('');
    setSelectedMfa(null);
    setMfaCode('');
    setMfaCodeSent(false);
    setInfoNotice(null);
    clearErrors();
    await signIn.reset();
  };

  const handleMethodChange = async (nextMethod: SignInMethod) => {
    if (nextMethod === method) {
      return;
    }

    setMethod(nextMethod);
    setEmailCodeSent(false);
    setOtpCode('');
    setInfoNotice(null);
    clearErrors();
    await signIn.reset();
  };

  const handleOAuth = async (strategy: OAuthStrategy) => {
    clearErrors();
    setInfoNotice(null);
    setLoadingStrategy(strategy);

    try {
      const { error } = await signIn.sso({
        strategy,
        redirectUrl: destinationUrl,
        redirectCallbackUrl: '/sign-in/sso-callback'
      });

      if (error) {
        setLocalError(getClerkErrorMessage(error));
        setLoadingStrategy(null);
      }
    } catch (err) {
      setLocalError(getClerkErrorMessage(err));
      setLoadingStrategy(null);
    }
  };

  const handlePasskeySignIn = async () => {
    clearErrors();
    setInfoNotice(null);
    setPasskeyPending(true);
    setHasActiveAttempt(true);

    try {
      const { error } = await signIn.passkey({ flow: 'discoverable' });

      if (error) {
        setLocalError(getClerkErrorMessage(error));
      }
    } catch (err) {
      setLocalError(getClerkErrorMessage(err));
    } finally {
      setPasskeyPending(false);
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    setInfoNotice(null);

    const trimmedIdentifier = identifier.trim();

    if (!trimmedIdentifier) {
      setFieldErrors({ identifier: 'Enter your email address or username.' });

      return;
    }

    if (!password) {
      setFieldErrors({ password: 'Enter your password.' });

      return;
    }

    setHasActiveAttempt(true);

    const { error } = await signIn.password({
      identifier: trimmedIdentifier,
      password
    });

    if (error) {
      if (!errors.fields.identifier && !errors.fields.password && !errors.global?.length) {
        setLocalError(getClerkErrorMessage(error));
      }

      return;
    }

    if (signIn.status === 'needs_first_factor') {
      const supportsEmailCode = signIn.supportedFirstFactors?.some((factor) => factor.strategy === 'email_code');

      if (supportsEmailCode) {
        setMethod('email_code');
        const sendRes = await signIn.emailCode.sendCode();

        if (!sendRes.error) {
          setEmailCodeSent(true);
          setCooldown(RESEND_COOLDOWN_SECONDS);
          setInfoNotice(`This account uses email code sign-in. We sent a code to ${trimmedIdentifier}.`);
        }
      }
    }
  };

  const handleSendEmailCode = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    clearErrors();
    setInfoNotice(null);

    const trimmedEmail = identifier.trim();

    if (!isValidEmailFormat(trimmedEmail)) {
      setFieldErrors({ identifier: 'Enter a valid email address.' });

      return;
    }

    setHasActiveAttempt(true);

    const { error } = await signIn.emailCode.sendCode({ emailAddress: trimmedEmail });

    if (error) {
      if (!errors.fields.identifier && !errors.global?.length) {
        setLocalError(getClerkErrorMessage(error));
      }

      return;
    }

    setEmailCodeSent(true);
    setCooldown(RESEND_COOLDOWN_SECONDS);
    setInfoNotice(`Verification code sent to ${trimmedEmail}.`);
  };

  const handleVerifyEmailCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();

    const trimmedCode = otpCode.trim();

    if (trimmedCode.length < 6) {
      setFieldErrors({ code: 'Enter the 6-digit verification code.' });

      return;
    }

    setHasActiveAttempt(true);

    const { error } = await signIn.emailCode.verifyCode({ code: trimmedCode });

    if (error && !errors.fields.code && !errors.global?.length) {
      setLocalError(getClerkErrorMessage(error));
    }
  };

  const handleMfaSelect = async (strategy: MfaStrategy) => {
    clearErrors();
    setInfoNotice(null);
    setMfaCode('');
    setSelectedMfa(strategy);

    if (strategy === 'email_code') {
      const { error } = await signIn.mfa.sendEmailCode();

      if (error) {
        setLocalError(getClerkErrorMessage(error));
      } else {
        setMfaCodeSent(true);
        setCooldown(RESEND_COOLDOWN_SECONDS);
        setInfoNotice('We emailed a 6-digit verification code to your account.');
      }
    } else if (strategy === 'phone_code') {
      const { error } = await signIn.mfa.sendPhoneCode();

      if (error) {
        setLocalError(getClerkErrorMessage(error));
      } else {
        setMfaCodeSent(true);
        setCooldown(RESEND_COOLDOWN_SECONDS);
        setInfoNotice('We texted a 6-digit verification code to your phone.');
      }
    } else {
      setMfaCodeSent(false);
    }
  };

  const handleMfaSendCode = async () => {
    if (!activeMfaStrategy) {
      return;
    }

    clearErrors();
    setInfoNotice(null);

    const { error } =
      activeMfaStrategy === 'email_code' ? await signIn.mfa.sendEmailCode() : await signIn.mfa.sendPhoneCode();

    if (error) {
      setLocalError(getClerkErrorMessage(error));

      return;
    }

    setMfaCodeSent(true);
    setCooldown(RESEND_COOLDOWN_SECONDS);
    setInfoNotice(
      activeMfaStrategy === 'email_code'
        ? 'A fresh verification code has been sent to your email.'
        : 'A fresh verification code has been sent to your phone.'
    );
  };

  const handleMfaVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();

    const trimmedCode = mfaCode.trim();

    if (!trimmedCode) {
      setFieldErrors({ code: 'Enter your verification code.' });

      return;
    }

    if (!activeMfaStrategy) {
      return;
    }

    setHasActiveAttempt(true);

    let res: { error: unknown };

    switch (activeMfaStrategy) {
      case 'totp':
        res = await signIn.mfa.verifyTOTP({ code: trimmedCode });
        break;
      case 'email_code':
        res = await signIn.mfa.verifyEmailCode({ code: trimmedCode });
        break;
      case 'phone_code':
        res = await signIn.mfa.verifyPhoneCode({ code: trimmedCode });
        break;
      case 'backup_code':
        res = await signIn.mfa.verifyBackupCode({ code: trimmedCode });
        break;
    }

    if (res.error && !errors.fields.code && !errors.global?.length) {
      setLocalError(getClerkErrorMessage(res.error));
    }
  };

  const openForgotPassword = async () => {
    clearErrors();
    setInfoNotice(null);
    setResetIdentifier(identifier.trim());
    setResetCode('');
    setNewPassword('');
    setConfirmPassword('');
    setResetPhase('request');
    await signIn.reset();
  };

  const handleResetRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    setInfoNotice(null);

    const trimmed = resetIdentifier.trim();

    if (!trimmed) {
      setFieldErrors({ resetIdentifier: 'Enter the email address or username for your account.' });

      return;
    }

    const createRes = await signIn.create({ identifier: trimmed });

    if (createRes.error) {
      if (!errors.fields.identifier && !errors.global?.length) {
        setLocalError(getClerkErrorMessage(createRes.error));
      }

      return;
    }

    const supportsPhoneReset =
      !signIn.supportedFirstFactors?.some((factor) => factor.strategy === 'reset_password_email_code') &&
      signIn.supportedFirstFactors?.some((factor) => factor.strategy === 'reset_password_phone_code');

    if (supportsPhoneReset) {
      setResetChannel('phone');
      const sendRes = await signIn.resetPasswordPhoneCode.sendCode();

      if (sendRes.error) {
        setLocalError(getClerkErrorMessage(sendRes.error));

        return;
      }

      setInfoNotice('We texted a password reset code to your verified phone number.');
    } else {
      setResetChannel('email');
      const sendRes = await signIn.resetPasswordEmailCode.sendCode();

      if (sendRes.error) {
        setLocalError(getClerkErrorMessage(sendRes.error));

        return;
      }

      setInfoNotice(`Password reset code sent to ${trimmed}.`);
    }

    setCooldown(RESEND_COOLDOWN_SECONDS);
    setResetPhase('verify');
  };

  const handleResetResend = async () => {
    clearErrors();

    const res =
      resetChannel === 'phone'
        ? await signIn.resetPasswordPhoneCode.sendCode()
        : await signIn.resetPasswordEmailCode.sendCode();

    if (res.error) {
      setLocalError(getClerkErrorMessage(res.error));

      return;
    }

    setCooldown(RESEND_COOLDOWN_SECONDS);
    setInfoNotice('A new reset code has been sent.');
  };

  const handleResetVerifyCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();

    const trimmedCode = resetCode.trim();

    if (trimmedCode.length < 6) {
      setFieldErrors({ code: 'Enter the 6-digit reset code.' });

      return;
    }

    const res =
      resetChannel === 'phone'
        ? await signIn.resetPasswordPhoneCode.verifyCode({ code: trimmedCode })
        : await signIn.resetPasswordEmailCode.verifyCode({ code: trimmedCode });

    if (res.error) {
      if (!errors.fields.code && !errors.global?.length) {
        setLocalError(getClerkErrorMessage(res.error));
      }

      return;
    }

    setInfoNotice(null);
    setResetPhase('new_password');
  };

  const handleResetSubmitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();

    if (newPassword.length < capabilities.passwordMinLength) {
      setFieldErrors({ newPassword: `Password must be at least ${capabilities.passwordMinLength} characters.` });

      return;
    }

    if (newPassword !== confirmPassword) {
      setFieldErrors({ confirmPassword: 'Passwords do not match.' });

      return;
    }

    setHasActiveAttempt(true);

    const res =
      resetChannel === 'phone'
        ? await signIn.resetPasswordPhoneCode.submitPassword({
            password: newPassword,
            signOutOfOtherSessions: signOutOtherSessions
          })
        : await signIn.resetPasswordEmailCode.submitPassword({
            password: newPassword,
            signOutOfOtherSessions: signOutOtherSessions
          });

    if (res.error && !errors.fields.password && !errors.global?.length) {
      setLocalError(getClerkErrorMessage(res.error));
    }
  };

  const globalErrorMessage = resolveGlobalErrorMessage(errors.global, localError);
  const identifierError =
    fieldErrors['identifier'] ?? errors.fields.identifier?.longMessage ?? errors.fields.identifier?.message ?? null;
  const passwordError =
    fieldErrors['password'] ?? errors.fields.password?.longMessage ?? errors.fields.password?.message ?? null;
  const codeError = fieldErrors['code'] ?? errors.fields.code?.longMessage ?? errors.fields.code?.message ?? null;

  let shellTitle = 'Sign in to Graphical Playground';
  let shellDescription = 'Access your interactive shaders, Vulkan modules, and render pipeline labs.';

  if (isSsoCallback) {
    shellTitle = 'Completing sign-in';
    shellDescription = 'Finishing your external authentication handoff.';
  } else if (isMfaStep) {
    shellTitle = signIn.status === 'needs_client_trust' ? 'Verify this new device' : 'Two-factor verification';
    shellDescription = 'Complete your second verification step to unlock your session.';
  } else if (effectiveResetPhase !== 'none') {
    shellTitle = 'Reset your password';
    shellDescription =
      effectiveResetPhase === 'new_password'
        ? 'Choose a strong new password for your account.'
        : 'Recover access to your workspace via a one-time verification code.';
  } else if (method === 'email_code' && emailCodeSent) {
    shellTitle = 'Check your inbox';
    shellDescription = `Enter the 6-digit verification code sent to ${identifier.trim()}.`;
  }

  return (
    <AuthShell description={shellDescription} eyebrow='ACCESS // SIGN IN' title={shellTitle}>
      {isSsoCallback ? (
        <SsoCallbackView
          redirectUrl={destinationUrl}
          signInUrl='/sign-in'
          signUpUrl={isWaitlist ? '/waitlist' : '/sign-up'}
        />
      ) : isLoaded && isSignedIn ? (
        <SignedInCard destinationUrl={destinationUrl} />
      ) : (
        <>
          {globalErrorMessage ? <AuthAlert variant='error'>{globalErrorMessage}</AuthAlert> : null}
          {infoNotice ? <AuthAlert variant='info'>{infoNotice}</AuthAlert> : null}

          {isMfaStep ? (
            <form noValidate className={styles.form} onSubmit={handleMfaVerify}>
              <Stack direction='vertical' gap={12} padding='none'>
                <Label color='blue' leadingVisual={<ShieldCheckIcon />} size='small'>
                  {signIn.status === 'needs_client_trust' ? 'New device check' : '2FA required'}
                </Label>

                {availableMfaStrategies.length > 1 ? (
                  <div aria-label='Verification method' className={styles.segmentedTabs} role='tablist'>
                    {availableMfaStrategies.map((strategy) => (
                      <button
                        key={strategy}
                        aria-selected={activeMfaStrategy === strategy}
                        className={`${styles.segmentedTab} ${activeMfaStrategy === strategy ? styles.segmentedTabActive : ''}`}
                        role='tab'
                        type='button'
                        onClick={() => handleMfaSelect(strategy)}
                      >
                        {MFA_LABELS[strategy]}
                      </button>
                    ))}
                  </div>
                ) : null}
              </Stack>

              {(activeMfaStrategy === 'email_code' || activeMfaStrategy === 'phone_code') && !mfaCodeSent ? (
                <Button
                  block
                  disabled={isFetching}
                  size='medium'
                  type='button'
                  variant='secondary'
                  onClick={handleMfaSendCode}
                >
                  Send verification code
                </Button>
              ) : null}

              <FormControl fullWidth required id={mfaCodeId} validationStatus={codeError ? 'error' : undefined}>
                <FormControl.Label>
                  {activeMfaStrategy === 'backup_code'
                    ? 'Backup recovery code'
                    : activeMfaStrategy === 'totp'
                      ? 'Authenticator app code'
                      : 'Verification code'}
                </FormControl.Label>
                <TextInput
                  fullWidth
                  monospace
                  autoComplete='one-time-code'
                  className={styles.otpInput}
                  disabled={isFetching}
                  inputMode={activeMfaStrategy === 'backup_code' ? 'text' : 'numeric'}
                  leadingVisual={activeMfaStrategy === 'phone_code' ? <DeviceMobileIcon /> : <KeyIcon />}
                  placeholder={activeMfaStrategy === 'backup_code' ? 'xxxx-xxxx' : '000000'}
                  value={mfaCode}
                  onChange={(event) => {
                    clearErrors('code');
                    setMfaCode(event.target.value);
                  }}
                />
                {codeError ? <FormControl.Validation>{codeError}</FormControl.Validation> : null}
              </FormControl>

              <Button block disabled={isFetching} size='medium' type='submit' variant='primary'>
                <span className={styles.submitContent}>
                  {isFetching ? <Spinner accessibleLabel={null} size='small' /> : null}
                  <span>{isFetching ? 'Verifying...' : 'Verify and sign in'}</span>
                </span>
              </Button>

              <div className={styles.actionsRow}>
                <button className={styles.textActionButton} type='button' onClick={resetSignInFlow}>
                  <ArrowLeftIcon size={14} />
                  <span>Start over</span>
                </button>
                {activeMfaStrategy === 'email_code' || activeMfaStrategy === 'phone_code' ? (
                  <button
                    className={styles.textActionButton}
                    disabled={cooldown > 0 || isFetching}
                    type='button'
                    onClick={handleMfaSendCode}
                  >
                    <SyncIcon size={14} />
                    <span>{cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}</span>
                  </button>
                ) : null}
              </div>
            </form>
          ) : effectiveResetPhase === 'request' ? (
            <form noValidate className={styles.form} onSubmit={handleResetRequest}>
              <FormControl
                fullWidth
                required
                id={resetId}
                validationStatus={(fieldErrors['resetIdentifier'] ?? identifierError) ? 'error' : undefined}
              >
                <FormControl.Label>Email or username</FormControl.Label>
                <TextInput
                  fullWidth
                  autoComplete='username'
                  className={styles.authInput}
                  disabled={isFetching}
                  leadingVisual={<MailIcon />}
                  placeholder='you@studio.dev'
                  value={resetIdentifier}
                  onChange={(event) => {
                    clearErrors('resetIdentifier');
                    setResetIdentifier(event.target.value);
                  }}
                />
                <FormControl.Hint>
                  We&apos;ll send a 6-digit verification code to confirm it&apos;s you.
                </FormControl.Hint>
                {(fieldErrors['resetIdentifier'] ?? identifierError) ? (
                  <FormControl.Validation>
                    {(fieldErrors['resetIdentifier'] ?? identifierError) as string}
                  </FormControl.Validation>
                ) : null}
              </FormControl>

              <Button block disabled={isFetching} size='medium' type='submit' variant='primary'>
                <span className={styles.submitContent}>
                  {isFetching ? <Spinner accessibleLabel={null} size='small' /> : null}
                  <span>{isFetching ? 'Sending reset code...' : 'Send reset code'}</span>
                </span>
              </Button>

              <button className={styles.textActionButton} type='button' onClick={resetSignInFlow}>
                <ArrowLeftIcon size={14} />
                <span>Back to sign in</span>
              </button>
            </form>
          ) : effectiveResetPhase === 'verify' ? (
            <form noValidate className={styles.form} onSubmit={handleResetVerifyCode}>
              <FormControl fullWidth required id={resetCodeId} validationStatus={codeError ? 'error' : undefined}>
                <FormControl.Label>Reset verification code</FormControl.Label>
                <TextInput
                  fullWidth
                  monospace
                  autoComplete='one-time-code'
                  className={styles.otpInput}
                  disabled={isFetching}
                  inputMode='numeric'
                  leadingVisual={<KeyIcon />}
                  maxLength={6}
                  placeholder='000000'
                  value={resetCode}
                  onChange={(event) => {
                    clearErrors('code');
                    setResetCode(event.target.value);
                  }}
                />
                {codeError ? <FormControl.Validation>{codeError}</FormControl.Validation> : null}
              </FormControl>

              <Button block disabled={isFetching} size='medium' type='submit' variant='primary'>
                <span className={styles.submitContent}>
                  {isFetching ? <Spinner accessibleLabel={null} size='small' /> : null}
                  <span>{isFetching ? 'Verifying code...' : 'Verify code'}</span>
                </span>
              </Button>

              <div className={styles.actionsRow}>
                <button className={styles.textActionButton} type='button' onClick={resetSignInFlow}>
                  <ArrowLeftIcon size={14} />
                  <span>Back to sign in</span>
                </button>
                <button
                  className={styles.textActionButton}
                  disabled={cooldown > 0 || isFetching}
                  type='button'
                  onClick={handleResetResend}
                >
                  <SyncIcon size={14} />
                  <span>{cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}</span>
                </button>
              </div>
            </form>
          ) : effectiveResetPhase === 'new_password' ? (
            <form noValidate className={styles.form} onSubmit={handleResetSubmitPassword}>
              <PasswordField
                showStrengthMeter
                autoComplete='new-password'
                disabled={isFetching}
                error={fieldErrors['newPassword'] ?? passwordError}
                label='New password'
                name='newPassword'
                value={newPassword}
                policyOptions={{
                  minLength: capabilities.passwordMinLength,
                  requireUppercase: capabilities.requireUppercase,
                  requireLowercase: capabilities.requireLowercase,
                  requireNumbers: capabilities.requireNumbers,
                  requireSpecialChar: capabilities.requireSpecialChar
                }}
                onChange={(val) => {
                  clearErrors('newPassword');
                  setNewPassword(val);
                }}
              />

              <PasswordField
                autoComplete='new-password'
                disabled={isFetching}
                error={fieldErrors['confirmPassword']}
                label='Confirm new password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={(val) => {
                  clearErrors('confirmPassword');
                  setConfirmPassword(val);
                }}
              />

              <FormControl>
                <FormControl.Label className={styles.checkboxLabel}>Sign out of all other devices</FormControl.Label>
                <Checkbox
                  checked={signOutOtherSessions}
                  disabled={isFetching}
                  name='signOutOfOtherSessions'
                  onChange={(event) => setSignOutOtherSessions(event.target.checked)}
                />
              </FormControl>

              <Button block disabled={isFetching} size='medium' type='submit' variant='primary'>
                <span className={styles.submitContent}>
                  {isFetching ? <Spinner accessibleLabel={null} size='small' /> : null}
                  <span>{isFetching ? 'Updating password...' : 'Update password & sign in'}</span>
                </span>
              </Button>
            </form>
          ) : method === 'email_code' && emailCodeSent ? (
            <form noValidate className={styles.form} onSubmit={handleVerifyEmailCode}>
              <FormControl fullWidth required id={otpId} validationStatus={codeError ? 'error' : undefined}>
                <FormControl.Label>Email verification code</FormControl.Label>
                <TextInput
                  fullWidth
                  monospace
                  autoComplete='one-time-code'
                  className={styles.otpInput}
                  disabled={isFetching}
                  inputMode='numeric'
                  leadingVisual={<KeyIcon />}
                  maxLength={6}
                  placeholder='000000'
                  value={otpCode}
                  onChange={(event) => {
                    clearErrors('code');
                    setOtpCode(event.target.value);
                  }}
                />
                {codeError ? <FormControl.Validation>{codeError}</FormControl.Validation> : null}
              </FormControl>

              <Button block disabled={isFetching} size='medium' type='submit' variant='primary'>
                <span className={styles.submitContent}>
                  {isFetching ? <Spinner accessibleLabel={null} size='small' /> : null}
                  <span>{isFetching ? 'Verifying...' : 'Verify & sign in'}</span>
                </span>
              </Button>

              <div className={styles.actionsRow}>
                <button className={styles.textActionButton} type='button' onClick={resetSignInFlow}>
                  <ArrowLeftIcon size={14} />
                  <span>Use another method</span>
                </button>
                <button
                  className={styles.textActionButton}
                  disabled={cooldown > 0 || isFetching}
                  type='button'
                  onClick={() => handleSendEmailCode()}
                >
                  <SyncIcon size={14} />
                  <span>{cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}</span>
                </button>
              </div>
            </form>
          ) : (
            <>
              <OAuthButtons
                disabled={isFetching}
                loadingStrategy={loadingStrategy}
                strategies={capabilities.socialStrategies}
                onSelect={handleOAuth}
              />

              <div aria-label='Sign-in method' className={styles.segmentedTabs} role='tablist'>
                <button
                  aria-selected={method === 'password'}
                  className={`${styles.segmentedTab} ${method === 'password' ? styles.segmentedTabActive : ''}`}
                  role='tab'
                  type='button'
                  onClick={() => handleMethodChange('password')}
                >
                  Password
                </button>
                <button
                  aria-selected={method === 'email_code'}
                  className={`${styles.segmentedTab} ${method === 'email_code' ? styles.segmentedTabActive : ''}`}
                  role='tab'
                  type='button'
                  onClick={() => handleMethodChange('email_code')}
                >
                  Email code
                </button>
              </div>

              {method === 'password' ? (
                <form noValidate className={styles.form} onSubmit={handlePasswordSubmit}>
                  <FormControl
                    fullWidth
                    required
                    id={identifierId}
                    validationStatus={identifierError ? 'error' : undefined}
                  >
                    <FormControl.Label>Email or username</FormControl.Label>
                    <TextInput
                      fullWidth
                      autoComplete='username'
                      className={styles.authInput}
                      disabled={isFetching}
                      leadingVisual={<PersonIcon />}
                      name='identifier'
                      placeholder='you@studio.dev'
                      value={identifier}
                      onChange={(event) => {
                        clearErrors('identifier');
                        setIdentifier(event.target.value);
                      }}
                    />
                    {identifierError ? <FormControl.Validation>{identifierError}</FormControl.Validation> : null}
                  </FormControl>

                  <PasswordField
                    autoComplete='current-password'
                    disabled={isFetching}
                    error={passwordError}
                    value={password}
                    onChange={(val) => {
                      clearErrors('password');
                      setPassword(val);
                    }}
                  />

                  <div className={styles.actionsRow}>
                    <button
                      className={styles.textActionButton}
                      disabled={isFetching}
                      type='button'
                      onClick={openForgotPassword}
                    >
                      Forgot password?
                    </button>
                  </div>

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
                      <span>{isFetching ? 'Signing in...' : 'Sign in'}</span>
                    </span>
                  </Button>
                </form>
              ) : (
                <form noValidate className={styles.form} onSubmit={handleSendEmailCode}>
                  <FormControl
                    fullWidth
                    required
                    id={identifierId}
                    validationStatus={identifierError ? 'error' : undefined}
                  >
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
                      value={identifier}
                      onChange={(event) => {
                        clearErrors('identifier');
                        setIdentifier(event.target.value);
                      }}
                    />
                    <FormControl.Hint>We&apos;ll email a one-time 6-digit code—no password required.</FormControl.Hint>
                    {identifierError ? <FormControl.Validation>{identifierError}</FormControl.Validation> : null}
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
                      <span>{isFetching ? 'Sending code...' : 'Send sign-in code'}</span>
                    </span>
                  </Button>
                </form>
              )}

              {canUsePasskey && capabilities.supportsPasskey ? (
                <Button
                  block
                  disabled={isFetching}
                  leadingVisual={passkeyPending ? <Spinner accessibleLabel={null} size='small' /> : <KeyIcon />}
                  size='medium'
                  type='button'
                  variant='subtle'
                  onClick={handlePasskeySignIn}
                >
                  {passkeyPending ? 'Waiting for passkey...' : 'Sign in with a passkey'}
                </Button>
              ) : null}
            </>
          )}

          <div className={styles.cardFooter}>
            <Text as='span' size='100' variant='muted'>
              {isWaitlist ? 'Need early access to Graphical Playground?' : 'New to Graphical Playground?'}
            </Text>
            <InlineLink href={isWaitlist ? '/waitlist' : '/sign-up'}>
              {isWaitlist ? 'Join the waitlist' : 'Create an account'}
            </InlineLink>
          </div>
        </>
      )}
    </AuthShell>
  );
};

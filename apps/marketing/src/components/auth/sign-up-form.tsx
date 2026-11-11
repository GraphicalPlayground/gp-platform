// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import type { Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuth, useClerk, useSignUp } from '@clerk/nextjs';
import type { OAuthStrategy } from '@clerk/nextjs/types';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DeviceMobileIcon,
  KeyIcon,
  MailIcon,
  PersonIcon,
  SparklesFillIcon,
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

export interface SignUpViewProps {
  waitlistMode?: boolean;
}

/**
 * @brief Full custom Sign-Up flow powered by `@gp/ui` form controls and Clerk Core 3 Signals.
 */
export const SignUpView: React.FC<SignUpViewProps> = ({ waitlistMode = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const clerk = useClerk();
  const { isLoaded, isSignedIn } = useAuth();
  const { errors, fetchStatus, signUp } = useSignUp();

  const capabilities = readClerkCapabilities(clerk, waitlistMode);
  const ticketParam = searchParams.get('__clerk_ticket');
  const isWaitlistBlocked = (waitlistMode || capabilities.waitlistMode) && !ticketParam && !signUp.id;
  const isSsoCallback = Boolean(pathname?.endsWith('/sso-callback'));

  const fallbackAfterSignUp = clerk.loaded ? clerk.buildAfterSignUpUrl() : '/';
  const destinationUrl = resolveSafeRedirectUrl(searchParams.get('redirect_url'), fallbackAfterSignUp || '/');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [legalAccepted, setLegalAccepted] = useState(false);

  const [verificationChannel, setVerificationChannel] = useState<'email' | 'phone' | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [loadingStrategy, setLoadingStrategy] = useState<OAuthStrategy | null>(null);
  const [hasActiveAttempt, setHasActiveAttempt] = useState(false);

  const [localError, setLocalError] = useState<string | null>(null);
  const [infoNotice, setInfoNotice] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});

  const isFinalizingRef = useRef(false);
  const ticketHandledRef = useRef(false);

  const firstNameId = useId();
  const lastNameId = useId();
  const usernameId = useId();
  const emailId = useId();
  const codeId = useId();

  const isFetching = fetchStatus === 'fetching' || loadingStrategy !== null;

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
      signUp.status !== 'complete' ||
      isFinalizingRef.current
    ) {
      return;
    }

    isFinalizingRef.current = true;

    void signUp
      .finalize({
        navigate: ({ decorateUrl }) => navigateAfterAuth(decorateUrl)
      })
      .then(({ error }) => {
        if (error) {
          isFinalizingRef.current = false;
          setLocalError(getClerkErrorMessage(error));
        }
      });
  }, [clerk.loaded, hasActiveAttempt, isSsoCallback, signUp, signUp.status]);

  useEffect(() => {
    if (!clerk.loaded || !ticketParam || ticketHandledRef.current || isSsoCallback || isSignedIn) {
      return;
    }

    ticketHandledRef.current = true;
    setHasActiveAttempt(true);

    void signUp.ticket({ ticket: ticketParam }).then(async ({ error }) => {
      if (error) {
        setLocalError(getClerkErrorMessage(error));

        return;
      }

      if (signUp.unverifiedFields.includes('email_address')) {
        const sendRes = await signUp.verifications.sendEmailCode();

        if (!sendRes.error) {
          setVerificationChannel('email');
          setCooldown(RESEND_COOLDOWN_SECONDS);
        }
      }
    });
  }, [clerk.loaded, isSignedIn, isSsoCallback, signUp, ticketParam]);

  const clearErrors = (field?: string) => {
    setLocalError(null);

    if (field) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
    } else {
      setFieldErrors({});
    }
  };

  const resetSignUpFlow = async () => {
    isFinalizingRef.current = false;
    setHasActiveAttempt(false);
    setVerificationChannel(null);
    setVerificationCode('');
    setInfoNotice(null);
    clearErrors();
    await signUp.reset();
  };

  const advanceSignUpLifecycle = async () => {
    if (signUp.status === 'complete') {
      return;
    }

    const nonVerifiableMissing = signUp.missingFields.filter(
      (field) => field !== 'email_address' && field !== 'phone_number'
    );

    if (nonVerifiableMissing.length > 0) {
      setVerificationChannel(null);

      return;
    }

    if (signUp.unverifiedFields.includes('email_address')) {
      const { error } = await signUp.verifications.sendEmailCode();

      if (error) {
        setLocalError(getClerkErrorMessage(error));

        return;
      }

      setVerificationChannel('email');
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setInfoNotice(`Verification code sent to ${signUp.emailAddress || emailAddress.trim()}.`);

      return;
    }

    if (signUp.unverifiedFields.includes('phone_number')) {
      const { error } = await signUp.verifications.sendPhoneCode();

      if (error) {
        setLocalError(getClerkErrorMessage(error));

        return;
      }

      setVerificationChannel('phone');
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setInfoNotice('Verification code sent to your phone number.');
    }
  };

  const handleOAuth = async (strategy: OAuthStrategy) => {
    clearErrors();
    setInfoNotice(null);
    setLoadingStrategy(strategy);

    try {
      const { error } = await signUp.sso({
        strategy,
        redirectUrl: destinationUrl,
        redirectCallbackUrl: '/sign-up/sso-callback'
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

  const handleCreateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    setInfoNotice(null);

    const nextFieldErrors: Record<string, string | null> = {};
    const trimmedEmail = emailAddress.trim();
    const trimmedUsername = username.trim();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (capabilities.firstNameRequired && !trimmedFirstName) {
      nextFieldErrors['firstName'] = 'First name is required.';
    }

    if (capabilities.lastNameRequired && !trimmedLastName) {
      nextFieldErrors['lastName'] = 'Last name is required.';
    }

    if (capabilities.usernameRequired && !trimmedUsername) {
      nextFieldErrors['username'] = 'Choose a username.';
    }

    if (!isValidEmailFormat(trimmedEmail)) {
      nextFieldErrors['emailAddress'] = 'Enter a valid email address.';
    }

    if (password.length < capabilities.passwordMinLength) {
      nextFieldErrors['password'] = `Password must be at least ${capabilities.passwordMinLength} characters.`;
    }

    if (capabilities.legalConsentEnabled && !legalAccepted) {
      nextFieldErrors['legalAccepted'] = 'Please accept the Terms of Service and Privacy Policy.';
    }

    if (Object.values(nextFieldErrors).some(Boolean)) {
      setFieldErrors(nextFieldErrors);

      return;
    }

    setHasActiveAttempt(true);

    const { error } = await signUp.password({
      emailAddress: trimmedEmail,
      password,
      ...(capabilities.firstNameEnabled && trimmedFirstName ? { firstName: trimmedFirstName } : {}),
      ...(capabilities.lastNameEnabled && trimmedLastName ? { lastName: trimmedLastName } : {}),
      ...(capabilities.usernameEnabled && trimmedUsername ? { username: trimmedUsername } : {}),
      ...(capabilities.legalConsentEnabled ? { legalAccepted } : {})
    });

    if (error) {
      const hasFieldErrors = Boolean(
        errors.fields.emailAddress ||
        errors.fields.password ||
        errors.fields.firstName ||
        errors.fields.lastName ||
        errors.fields.username ||
        errors.fields.legalAccepted ||
        errors.global?.length
      );

      if (!hasFieldErrors) {
        setLocalError(getClerkErrorMessage(error));
      }

      return;
    }

    await advanceSignUpLifecycle();
  };

  const handleMissingRequirementsSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();

    const missing = signUp.missingFields;
    const nextFieldErrors: Record<string, string | null> = {};

    if (missing.includes('first_name') && !firstName.trim()) {
      nextFieldErrors['firstName'] = 'First name is required.';
    }

    if (missing.includes('last_name') && !lastName.trim()) {
      nextFieldErrors['lastName'] = 'Last name is required.';
    }

    if (missing.includes('username') && !username.trim()) {
      nextFieldErrors['username'] = 'Choose a username.';
    }

    if (missing.includes('email_address') && !isValidEmailFormat(emailAddress)) {
      nextFieldErrors['emailAddress'] = 'Enter a valid email address.';
    }

    if (missing.includes('legal_accepted') && !legalAccepted) {
      nextFieldErrors['legalAccepted'] = 'Please accept the Terms of Service and Privacy Policy.';
    }

    if (Object.values(nextFieldErrors).some(Boolean)) {
      setFieldErrors(nextFieldErrors);

      return;
    }

    setHasActiveAttempt(true);

    const { error } = await signUp.update({
      ...(missing.includes('first_name') && firstName.trim() ? { firstName: firstName.trim() } : {}),
      ...(missing.includes('last_name') && lastName.trim() ? { lastName: lastName.trim() } : {}),
      ...(missing.includes('username') && username.trim() ? { username: username.trim() } : {}),
      ...(missing.includes('email_address') && emailAddress.trim() ? { emailAddress: emailAddress.trim() } : {}),
      ...(missing.includes('legal_accepted') ? { legalAccepted } : {})
    });

    if (error) {
      setLocalError(getClerkErrorMessage(error));

      return;
    }

    await advanceSignUpLifecycle();
  };

  const handleVerifyCodeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();

    const trimmedCode = verificationCode.trim();

    if (trimmedCode.length < 6) {
      setFieldErrors({ code: 'Enter the 6-digit verification code.' });

      return;
    }

    setHasActiveAttempt(true);

    const { error } =
      verificationChannel === 'phone'
        ? await signUp.verifications.verifyPhoneCode({ code: trimmedCode })
        : await signUp.verifications.verifyEmailCode({ code: trimmedCode });

    if (error) {
      if (!errors.fields.code && !errors.global?.length) {
        setLocalError(getClerkErrorMessage(error));
      }

      return;
    }

    await advanceSignUpLifecycle();
  };

  const handleResendVerification = async () => {
    clearErrors();

    const { error } =
      verificationChannel === 'phone'
        ? await signUp.verifications.sendPhoneCode()
        : await signUp.verifications.sendEmailCode();

    if (error) {
      setLocalError(getClerkErrorMessage(error));

      return;
    }

    setCooldown(RESEND_COOLDOWN_SECONDS);
    setInfoNotice('A new verification code has been sent.');
  };

  const needsMissingRequirementsStep =
    Boolean(signUp.id) &&
    signUp.status === 'missing_requirements' &&
    signUp.missingFields.some((field) => field !== 'email_address' && field !== 'phone_number');

  const isVerificationStep =
    Boolean(signUp.id) &&
    !needsMissingRequirementsStep &&
    (verificationChannel !== null ||
      signUp.unverifiedFields.includes('email_address') ||
      signUp.unverifiedFields.includes('phone_number'));

  const firstNameError =
    fieldErrors['firstName'] ?? errors.fields.firstName?.longMessage ?? errors.fields.firstName?.message ?? null;
  const lastNameError =
    fieldErrors['lastName'] ?? errors.fields.lastName?.longMessage ?? errors.fields.lastName?.message ?? null;
  const usernameError =
    fieldErrors['username'] ?? errors.fields.username?.longMessage ?? errors.fields.username?.message ?? null;
  const emailError =
    fieldErrors['emailAddress'] ??
    errors.fields.emailAddress?.longMessage ??
    errors.fields.emailAddress?.message ??
    null;
  const passwordError =
    fieldErrors['password'] ?? errors.fields.password?.longMessage ?? errors.fields.password?.message ?? null;
  const legalError =
    fieldErrors['legalAccepted'] ??
    errors.fields.legalAccepted?.longMessage ??
    errors.fields.legalAccepted?.message ??
    null;
  const codeError = fieldErrors['code'] ?? errors.fields.code?.longMessage ?? errors.fields.code?.message ?? null;
  const globalErrorMessage = resolveGlobalErrorMessage(errors.global, localError);

  let shellTitle = 'Create your account';
  let shellDescription = 'Start building interactive graphics pipelines and WebGPU labs in minutes.';

  if (isSsoCallback) {
    shellTitle = 'Completing sign-up';
    shellDescription = 'Finalizing your account creation.';
  } else if (isWaitlistBlocked) {
    shellTitle = 'Early access onboarding';
    shellDescription = 'New registrations are currently rolling out in batches through our waitlist.';
  } else if (isVerificationStep) {
    shellTitle = verificationChannel === 'phone' ? 'Verify your phone' : 'Verify your email';
    shellDescription = `Enter the 6-digit code sent to ${signUp.emailAddress || emailAddress.trim() || 'your account'}.`;
  } else if (needsMissingRequirementsStep) {
    shellTitle = 'Complete your profile';
    shellDescription = 'Just a few remaining details to activate your Graphical Playground workspace.';
  }

  return (
    <AuthShell description={shellDescription} eyebrow='ONBOARDING // SIGN UP' title={shellTitle}>
      {isSsoCallback ? (
        <SsoCallbackView redirectUrl={destinationUrl} signInUrl='/sign-in' signUpUrl='/sign-up' />
      ) : isLoaded && isSignedIn ? (
        <SignedInCard destinationUrl={destinationUrl} />
      ) : isWaitlistBlocked ? (
        <div className={styles.statusCard}>
          <Stack direction='vertical' gap={12} padding='none'>
            <Label color='green' leadingVisual={<SparklesFillIcon />} size='small'>
              Waitlist active
            </Label>
            <Text as='p' size='200' weight='semibold'>
              Public sign-ups are currently invite-only
            </Text>
            <Text as='p' size='100' variant='muted'>
              Reserve your spot on the waitlist to receive your personal registration invite as new cohorts open.
            </Text>
          </Stack>

          <Stack direction='vertical' gap={12} padding='none'>
            <Button block as='a' href='/waitlist' size='medium' trailingVisual={<ArrowRightIcon />} variant='primary'>
              Join the waitlist
            </Button>
            <Button block as='a' href='/sign-in' size='medium' variant='secondary'>
              Already have an account? Sign in
            </Button>
          </Stack>
        </div>
      ) : (
        <>
          {globalErrorMessage ? <AuthAlert variant='error'>{globalErrorMessage}</AuthAlert> : null}
          {infoNotice ? <AuthAlert variant='info'>{infoNotice}</AuthAlert> : null}

          {isVerificationStep ? (
            <form noValidate className={styles.form} onSubmit={handleVerifyCodeSubmit}>
              <FormControl fullWidth required id={codeId} validationStatus={codeError ? 'error' : undefined}>
                <FormControl.Label>Verification code</FormControl.Label>
                <TextInput
                  fullWidth
                  monospace
                  autoComplete='one-time-code'
                  className={styles.otpInput}
                  disabled={isFetching}
                  inputMode='numeric'
                  leadingVisual={verificationChannel === 'phone' ? <DeviceMobileIcon /> : <KeyIcon />}
                  maxLength={6}
                  placeholder='000000'
                  value={verificationCode}
                  onChange={(event) => {
                    clearErrors('code');
                    setVerificationCode(event.target.value);
                  }}
                />
                {codeError ? <FormControl.Validation>{codeError}</FormControl.Validation> : null}
              </FormControl>

              <Button block disabled={isFetching} size='medium' type='submit' variant='primary'>
                <span className={styles.submitContent}>
                  {isFetching ? <Spinner accessibleLabel={null} size='small' /> : null}
                  <span>{isFetching ? 'Verifying...' : 'Verify & complete sign up'}</span>
                </span>
              </Button>

              <div className={styles.actionsRow}>
                <button className={styles.textActionButton} type='button' onClick={resetSignUpFlow}>
                  <ArrowLeftIcon size={14} />
                  <span>Start over</span>
                </button>
                <button
                  className={styles.textActionButton}
                  disabled={cooldown > 0 || isFetching}
                  type='button'
                  onClick={handleResendVerification}
                >
                  <SyncIcon size={14} />
                  <span>{cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}</span>
                </button>
              </div>
            </form>
          ) : needsMissingRequirementsStep ? (
            <form noValidate className={styles.form} onSubmit={handleMissingRequirementsSubmit}>
              {signUp.missingFields.includes('first_name') || signUp.missingFields.includes('last_name') ? (
                <div className={styles.nameRow}>
                  {signUp.missingFields.includes('first_name') ? (
                    <FormControl
                      fullWidth
                      required
                      id={firstNameId}
                      validationStatus={firstNameError ? 'error' : undefined}
                    >
                      <FormControl.Label>First name</FormControl.Label>
                      <TextInput
                        fullWidth
                        autoComplete='given-name'
                        className={styles.authInput}
                        disabled={isFetching}
                        placeholder='Ada'
                        value={firstName}
                        onChange={(event) => {
                          clearErrors('firstName');
                          setFirstName(event.target.value);
                        }}
                      />
                      {firstNameError ? <FormControl.Validation>{firstNameError}</FormControl.Validation> : null}
                    </FormControl>
                  ) : null}

                  {signUp.missingFields.includes('last_name') ? (
                    <FormControl
                      fullWidth
                      required
                      id={lastNameId}
                      validationStatus={lastNameError ? 'error' : undefined}
                    >
                      <FormControl.Label>Last name</FormControl.Label>
                      <TextInput
                        fullWidth
                        autoComplete='family-name'
                        className={styles.authInput}
                        disabled={isFetching}
                        placeholder='Lovelace'
                        value={lastName}
                        onChange={(event) => {
                          clearErrors('lastName');
                          setLastName(event.target.value);
                        }}
                      />
                      {lastNameError ? <FormControl.Validation>{lastNameError}</FormControl.Validation> : null}
                    </FormControl>
                  ) : null}
                </div>
              ) : null}

              {signUp.missingFields.includes('username') ? (
                <FormControl fullWidth required id={usernameId} validationStatus={usernameError ? 'error' : undefined}>
                  <FormControl.Label>Username</FormControl.Label>
                  <TextInput
                    fullWidth
                    autoComplete='username'
                    className={styles.authInput}
                    disabled={isFetching}
                    leadingVisual={<PersonIcon />}
                    placeholder='shader_builder'
                    value={username}
                    onChange={(event) => {
                      clearErrors('username');
                      setUsername(event.target.value);
                    }}
                  />
                  {usernameError ? <FormControl.Validation>{usernameError}</FormControl.Validation> : null}
                </FormControl>
              ) : null}

              {signUp.missingFields.includes('email_address') ? (
                <FormControl fullWidth required id={emailId} validationStatus={emailError ? 'error' : undefined}>
                  <FormControl.Label>Email address</FormControl.Label>
                  <TextInput
                    fullWidth
                    autoComplete='email'
                    className={styles.authInput}
                    disabled={isFetching}
                    leadingVisual={<MailIcon />}
                    placeholder='you@studio.dev'
                    type='email'
                    value={emailAddress}
                    onChange={(event) => {
                      clearErrors('emailAddress');
                      setEmailAddress(event.target.value);
                    }}
                  />
                  {emailError ? <FormControl.Validation>{emailError}</FormControl.Validation> : null}
                </FormControl>
              ) : null}

              {signUp.missingFields.includes('legal_accepted') ? (
                <FormControl required validationStatus={legalError ? 'error' : undefined}>
                  <FormControl.Label className={styles.checkboxLabel}>
                    I agree to the <InlineLink href='/legal/terms-of-service'>Terms of Service</InlineLink> and{' '}
                    <InlineLink href='/legal/privacy'>Privacy Policy</InlineLink>
                  </FormControl.Label>
                  <Checkbox
                    checked={legalAccepted}
                    disabled={isFetching}
                    name='legalAccepted'
                    onChange={(event) => {
                      clearErrors('legalAccepted');
                      setLegalAccepted(event.target.checked);
                    }}
                  />
                  {legalError ? <FormControl.Validation>{legalError}</FormControl.Validation> : null}
                </FormControl>
              ) : null}

              <div className={styles.captchaSlot} id='clerk-captcha' />

              <Button block disabled={isFetching} size='medium' type='submit' variant='primary'>
                <span className={styles.submitContent}>
                  {isFetching ? <Spinner accessibleLabel={null} size='small' /> : null}
                  <span>{isFetching ? 'Saving...' : 'Continue'}</span>
                </span>
              </Button>

              <button className={styles.textActionButton} type='button' onClick={resetSignUpFlow}>
                <ArrowLeftIcon size={14} />
                <span>Start over</span>
              </button>
            </form>
          ) : (
            <>
              <OAuthButtons
                actionPrefix='Sign up with'
                disabled={isFetching}
                loadingStrategy={loadingStrategy}
                strategies={capabilities.socialStrategies}
                onSelect={handleOAuth}
              />

              <form noValidate className={styles.form} onSubmit={handleCreateSubmit}>
                {capabilities.firstNameEnabled || capabilities.lastNameEnabled ? (
                  <div className={styles.nameRow}>
                    {capabilities.firstNameEnabled ? (
                      <FormControl
                        fullWidth
                        id={firstNameId}
                        required={capabilities.firstNameRequired}
                        validationStatus={firstNameError ? 'error' : undefined}
                      >
                        <FormControl.Label>First name</FormControl.Label>
                        <TextInput
                          fullWidth
                          autoComplete='given-name'
                          className={styles.authInput}
                          disabled={isFetching}
                          name='firstName'
                          placeholder='Ada'
                          value={firstName}
                          onChange={(event) => {
                            clearErrors('firstName');
                            setFirstName(event.target.value);
                          }}
                        />
                        {firstNameError ? <FormControl.Validation>{firstNameError}</FormControl.Validation> : null}
                      </FormControl>
                    ) : null}

                    {capabilities.lastNameEnabled ? (
                      <FormControl
                        fullWidth
                        id={lastNameId}
                        required={capabilities.lastNameRequired}
                        validationStatus={lastNameError ? 'error' : undefined}
                      >
                        <FormControl.Label>Last name</FormControl.Label>
                        <TextInput
                          fullWidth
                          autoComplete='family-name'
                          className={styles.authInput}
                          disabled={isFetching}
                          name='lastName'
                          placeholder='Lovelace'
                          value={lastName}
                          onChange={(event) => {
                            clearErrors('lastName');
                            setLastName(event.target.value);
                          }}
                        />
                        {lastNameError ? <FormControl.Validation>{lastNameError}</FormControl.Validation> : null}
                      </FormControl>
                    ) : null}
                  </div>
                ) : null}

                {capabilities.usernameEnabled ? (
                  <FormControl
                    fullWidth
                    id={usernameId}
                    required={capabilities.usernameRequired}
                    validationStatus={usernameError ? 'error' : undefined}
                  >
                    <FormControl.Label>Username</FormControl.Label>
                    <TextInput
                      fullWidth
                      autoComplete='username'
                      className={styles.authInput}
                      disabled={isFetching}
                      leadingVisual={<PersonIcon />}
                      name='username'
                      placeholder='shader_builder'
                      value={username}
                      onChange={(event) => {
                        clearErrors('username');
                        setUsername(event.target.value);
                      }}
                    />
                    {usernameError ? <FormControl.Validation>{usernameError}</FormControl.Validation> : null}
                  </FormControl>
                ) : null}

                <FormControl fullWidth required id={emailId} validationStatus={emailError ? 'error' : undefined}>
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
                      clearErrors('emailAddress');
                      setEmailAddress(event.target.value);
                    }}
                  />
                  {emailError ? <FormControl.Validation>{emailError}</FormControl.Validation> : null}
                </FormControl>

                <PasswordField
                  showStrengthMeter
                  autoComplete='new-password'
                  disabled={isFetching}
                  error={passwordError}
                  value={password}
                  policyOptions={{
                    minLength: capabilities.passwordMinLength,
                    requireUppercase: capabilities.requireUppercase,
                    requireLowercase: capabilities.requireLowercase,
                    requireNumbers: capabilities.requireNumbers,
                    requireSpecialChar: capabilities.requireSpecialChar
                  }}
                  onChange={(val) => {
                    clearErrors('password');
                    setPassword(val);
                  }}
                />

                {capabilities.legalConsentEnabled ? (
                  <FormControl required validationStatus={legalError ? 'error' : undefined}>
                    <FormControl.Label className={styles.checkboxLabel}>
                      I agree to the <InlineLink href='/legal/terms-of-service'>Terms of Service</InlineLink> and{' '}
                      <InlineLink href='/legal/privacy'>Privacy Policy</InlineLink>
                    </FormControl.Label>
                    <Checkbox
                      checked={legalAccepted}
                      disabled={isFetching}
                      name='legalAccepted'
                      onChange={(event) => {
                        clearErrors('legalAccepted');
                        setLegalAccepted(event.target.checked);
                      }}
                    />
                    {legalError ? <FormControl.Validation>{legalError}</FormControl.Validation> : null}
                  </FormControl>
                ) : (
                  <Text as='p' className={styles.legalNote} size='100' variant='muted'>
                    By creating an account, you agree to our{' '}
                    <InlineLink href='/legal/terms-of-service'>Terms of Service</InlineLink> and{' '}
                    <InlineLink href='/legal/privacy'>Privacy Policy</InlineLink>.
                  </Text>
                )}

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
                    <span>{isFetching ? 'Creating account...' : 'Create account'}</span>
                  </span>
                </Button>
              </form>
            </>
          )}

          <div className={styles.cardFooter}>
            <Text as='span' size='100' variant='muted'>
              Already have an account?
            </Text>
            <InlineLink href='/sign-in'>Sign in</InlineLink>
          </div>
        </>
      )}
    </AuthShell>
  );
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { Organization } from '@gp/constants';
import type { ClerkAPIError, EnvironmentResource, OAuthStrategy } from '@clerk/nextjs/types';
import { isClerkAPIResponseError, isKnownError } from '@clerk/nextjs/errors';

export const RESEND_COOLDOWN_SECONDS = 30;

export interface ClerkAuthCapabilities {
  hasEnvironment: boolean;
  socialStrategies: OAuthStrategy[];
  supportsPasskey: boolean;
  firstNameEnabled: boolean;
  firstNameRequired: boolean;
  lastNameEnabled: boolean;
  lastNameRequired: boolean;
  usernameEnabled: boolean;
  usernameRequired: boolean;
  legalConsentEnabled: boolean;
  waitlistMode: boolean;
  passwordMinLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChar: boolean;
}

const DEFAULT_SOCIAL_STRATEGIES: OAuthStrategy[] = ['oauth_github', 'oauth_google'];

/**
 * @brief Safely inspects Clerk's loaded runtime environment for enabled auth capabilities,
 * falling back to sensible defaults when the environment metadata is unavailable.
 */
export function readClerkCapabilities(clerk: unknown, envWaitlistMode: boolean): ClerkAuthCapabilities {
  const internalEnv = (clerk as { __internal_environment?: EnvironmentResource } | null | undefined)
    ?.__internal_environment;
  const userSettings = internalEnv?.userSettings;

  if (!userSettings) {
    return {
      hasEnvironment: false,
      socialStrategies: DEFAULT_SOCIAL_STRATEGIES,
      supportsPasskey: true,
      firstNameEnabled: false,
      firstNameRequired: false,
      lastNameEnabled: false,
      lastNameRequired: false,
      usernameEnabled: false,
      usernameRequired: false,
      legalConsentEnabled: false,
      waitlistMode: envWaitlistMode,
      passwordMinLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChar: false
    };
  }

  const attributes = userSettings.attributes;
  const passwordSettings = userSettings.passwordSettings;
  const socialStrategies = userSettings.authenticatableSocialStrategies?.length
    ? userSettings.authenticatableSocialStrategies
    : (userSettings.socialProviderStrategies ?? []);

  return {
    hasEnvironment: true,
    socialStrategies,
    supportsPasskey: Boolean(
      attributes?.passkey?.enabled && userSettings.passkeySettings?.show_sign_in_button !== false
    ),
    firstNameEnabled: Boolean(attributes?.first_name?.enabled),
    firstNameRequired: Boolean(attributes?.first_name?.enabled && attributes?.first_name?.required),
    lastNameEnabled: Boolean(attributes?.last_name?.enabled),
    lastNameRequired: Boolean(attributes?.last_name?.enabled && attributes?.last_name?.required),
    usernameEnabled: Boolean(attributes?.username?.enabled),
    usernameRequired: Boolean(attributes?.username?.enabled && attributes?.username?.required),
    legalConsentEnabled: Boolean(userSettings.signUp?.legal_consent_enabled),
    waitlistMode: envWaitlistMode || userSettings.signUp?.mode === 'waitlist',
    passwordMinLength: passwordSettings?.min_length || 8,
    requireUppercase: Boolean(passwordSettings?.require_uppercase),
    requireLowercase: Boolean(passwordSettings?.require_lowercase),
    requireNumbers: Boolean(passwordSettings?.require_numbers),
    requireSpecialChar: Boolean(passwordSettings?.require_special_char)
  };
}

/**
 * @brief Validates and normalizes post-auth redirect URLs to prevent open redirects.
 */
export function resolveSafeRedirectUrl(rawUrl: string | null | undefined, fallback = '/'): string {
  if (!rawUrl) {
    return fallback;
  }

  const trimmed = rawUrl.trim();

  if (trimmed.startsWith('/') && !trimmed.startsWith('//') && !trimmed.startsWith('/\\')) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();
    const isProductionDomain = hostname === Organization.domain || hostname.endsWith(`.${Organization.domain}`);
    const isLocalDev = process.env.NODE_ENV === 'development' && (hostname === 'localhost' || hostname === '127.0.0.1');

    if (parsed.protocol === 'https:' && isProductionDomain) {
      return parsed.toString();
    }

    if ((parsed.protocol === 'http:' || parsed.protocol === 'https:') && isLocalDev) {
      return parsed.toString();
    }
  } catch {
    return fallback;
  }

  return fallback;
}

/**
 * @brief Formats an arbitrary Clerk error object or API response error into a user-safe message.
 */
export function getClerkErrorMessage(error: unknown): string | null {
  if (!error) {
    return null;
  }

  if (isClerkAPIResponseError(error)) {
    const first: ClerkAPIError | undefined = error.errors[0];

    return first?.longMessage || first?.message || error.message || 'Authentication request failed.';
  }

  if (isKnownError(error)) {
    const clerkErr = error as { longMessage?: string; message?: string };

    return clerkErr.longMessage || clerkErr.message || 'Authentication request failed.';
  }

  if (typeof error === 'object' && error !== null) {
    const maybeErr = error as {
      longMessage?: string;
      message?: string;
      errors?: Array<{ longMessage?: string; message?: string }>;
    };

    if (maybeErr.errors?.[0]) {
      return maybeErr.errors[0].longMessage || maybeErr.errors[0].message || null;
    }

    if (maybeErr.longMessage || maybeErr.message) {
      return maybeErr.longMessage || maybeErr.message || null;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}

/**
 * @brief Resolves a global error banner message from Clerk signal `errors.global` and fallback state.
 */
export function resolveGlobalErrorMessage(
  globalErrors: Array<{ longMessage?: string; message: string }> | null | undefined,
  fallbackError: string | null
): string | null {
  if (globalErrors && globalErrors.length > 0) {
    const first = globalErrors[0];

    return first?.longMessage || first?.message || fallbackError;
  }

  return fallbackError;
}

export interface PasswordCriterion {
  id: string;
  label: string;
  met: boolean;
}

export interface PasswordEvaluation {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  criteria: PasswordCriterion[];
}

/**
 * @brief Evaluates password complexity against active policy settings for live UI feedback.
 */
export function evaluatePassword(
  password: string,
  options?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChar?: boolean;
  }
): PasswordEvaluation {
  const minLength = options?.minLength ?? 8;
  const criteria: PasswordCriterion[] = [
    {
      id: 'length',
      label: `${minLength}+ characters`,
      met: password.length >= minLength
    },
    {
      id: 'lowercase',
      label: 'Lowercase letter',
      met: /[a-z]/.test(password)
    },
    {
      id: 'uppercase',
      label: 'Uppercase letter',
      met: /[A-Z]/.test(password)
    },
    {
      id: 'numberOrSymbol',
      label: options?.requireSpecialChar ? 'Number & symbol' : 'Number or symbol',
      met: options?.requireSpecialChar ? /\d/.test(password) && /[^A-Za-z0-9]/.test(password) : /[\d\W_]/.test(password)
    }
  ];

  const metCount = criteria.filter((item) => item.met).length;
  const score = (password.length === 0 ? 0 : Math.min(4, Math.max(1, metCount))) as 0 | 1 | 2 | 3 | 4;

  const labels: Record<0 | 1 | 2 | 3 | 4, string> = {
    0: 'Enter a password',
    1: 'Weak',
    2: 'Fair',
    3: 'Good',
    4: 'Strong'
  };

  return {
    score,
    label: labels[score],
    criteria
  };
}

/**
 * @brief Basic client-side email format check before calling Clerk endpoints.
 */
export function isValidEmailFormat(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * @brief Formats a Clerk OAuth strategy identifier into a human-readable provider label.
 */
export function getOAuthProviderLabel(strategy: OAuthStrategy): string {
  const knownLabels: Record<string, string> = {
    oauth_github: 'GitHub',
    oauth_google: 'Google',
    oauth_discord: 'Discord',
    oauth_microsoft: 'Microsoft',
    oauth_apple: 'Apple',
    oauth_gitlab: 'GitLab'
  };

  if (strategy in knownLabels) {
    return knownLabels[strategy] as string;
  }

  const rawName = strategy.replace(/^oauth_(?:custom_)?/, '').replace(/_/g, ' ');

  return rawName.charAt(0).toUpperCase() + rawName.slice(1);
}

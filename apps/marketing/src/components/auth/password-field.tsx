// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useId, useState } from 'react';
import clsx from 'clsx';
import { CheckCircleFillIcon, EyeClosedIcon, EyeIcon, LockIcon } from '@primer/octicons-react';
import { FormControl, Text, TextInput } from '@gp/ui/components';
import { evaluatePassword } from './auth.utils';
import styles from './auth.module.css';

export interface PasswordFieldProps {
  id?: string;
  label?: string;
  name?: string;
  value: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string | null;
  hint?: string;
  showStrengthMeter?: boolean;
  policyOptions?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChar?: boolean;
  };
  onChange: (value: string) => void;
}

/**
 * @brief Accessible password input built on `@gp/ui` FormControl and TextInput with visibility toggle
 * and optional live complexity feedback.
 */
export const PasswordField: React.FC<PasswordFieldProps> = ({
  autoComplete = 'current-password',
  disabled = false,
  error,
  hint,
  id,
  label = 'Password',
  name = 'password',
  onChange,
  placeholder = '••••••••••••',
  policyOptions,
  required = true,
  showStrengthMeter = false,
  value
}) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const [visible, setVisible] = useState(false);

  const validationStatus = error ? 'error' : undefined;
  const describedBy =
    [hint ? `${fieldId}-hint` : null, error ? `${fieldId}-validation` : null].filter(Boolean).join(' ') || undefined;
  const strength = showStrengthMeter ? evaluatePassword(value, policyOptions) : null;

  const barActiveClass =
    strength?.score === 1
      ? styles.strengthBarScore1
      : strength?.score === 2
        ? styles.strengthBarScore2
        : strength?.score === 3
          ? styles.strengthBarScore3
          : strength?.score === 4
            ? styles.strengthBarScore4
            : undefined;

  return (
    <div className={styles.passwordFieldGroup}>
      <FormControl fullWidth id={fieldId} required={required} validationStatus={validationStatus}>
        <FormControl.Label>{label}</FormControl.Label>

        <div className={styles.passwordInputWrap}>
          <TextInput
            fullWidth
            aria-describedby={describedBy}
            autoComplete={autoComplete}
            className={styles.passwordInput}
            disabled={disabled}
            id={fieldId}
            leadingVisual={<LockIcon />}
            name={name}
            placeholder={placeholder}
            required={required}
            type={visible ? 'text' : 'password'}
            validationStatus={validationStatus}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
          <button
            aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
            aria-pressed={visible}
            className={styles.passwordToggle}
            disabled={disabled}
            type='button'
            onClick={() => setVisible((prev) => !prev)}
          >
            {visible ? <EyeClosedIcon size={16} /> : <EyeIcon size={16} />}
          </button>
        </div>

        {hint ? <FormControl.Hint>{hint}</FormControl.Hint> : null}
        {error ? <FormControl.Validation>{error}</FormControl.Validation> : null}
      </FormControl>

      {strength && value.length > 0 ? (
        <div aria-live='polite' className={styles.strengthWrap}>
          <div className={styles.strengthHeader}>
            <Text as='span' size='100' variant='muted'>
              Password strength
            </Text>
            <Text as='span' font='monospace' size='100' weight='medium'>
              {strength.label}
            </Text>
          </div>
          <div aria-hidden='true' className={styles.strengthBars}>
            {[1, 2, 3, 4].map((step) => (
              <span key={step} className={clsx(styles.strengthBar, strength.score >= step && barActiveClass)} />
            ))}
          </div>
          <ul className={styles.strengthCriteria}>
            {strength.criteria.map((criterion) => (
              <li
                key={criterion.id}
                className={clsx(styles.strengthCriterion, criterion.met && styles.strengthCriterionMet)}
              >
                <CheckCircleFillIcon aria-hidden='true' size={12} />
                <Text as='span' className={styles.alertText} size='100'>
                  {criterion.label}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

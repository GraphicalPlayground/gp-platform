// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './contact-floating-mail.module.css';

const ENVELOPE_BODY_PATH =
  'M3.5 6.2h17a1.8 1.8 0 0 1 1.8 1.8v8a1.8 1.8 0 0 1-1.8 1.8h-17A1.8 1.8 0 0 1 1.7 16V8a1.8 1.8 0 0 1 1.8-1.8z';
const ENVELOPE_FLAP_PATH = 'M2.3 7.3 12 13.4l9.7-6.1';
const ENVELOPE_CREASE_LEFT = 'M2.4 16.8 8.3 12';
const ENVELOPE_CREASE_RIGHT = 'M21.6 16.8 15.7 12';

/**
 * @brief Decorative floating blue and warm yellow mail envelopes flanking the Contact hero without cursor tracking.
 */
export const ContactFloatingMail: React.FC = () => {
  return (
    <div aria-hidden='true' className={styles.mailField}>
      <div className={clsx(styles.mailItem, styles.mailLeftLarge)}>
        <svg className={styles.mailSvg} fill='none' viewBox='0 0 24 24'>
          <defs>
            <linearGradient id='gpContactMailBlue' x1='0%' x2='100%' y1='0%' y2='100%'>
              <stop offset='0%' stopColor='#60a5fa' stopOpacity='0.9' />
              <stop offset='100%' stopColor='#2563eb' stopOpacity='0.82' />
            </linearGradient>
          </defs>
          <path d={ENVELOPE_BODY_PATH} fill='url(#gpContactMailBlue)' />
          <path
            d={ENVELOPE_FLAP_PATH}
            stroke='#eff6ff'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeOpacity='0.88'
            strokeWidth='1.35'
          />
          <path d={ENVELOPE_CREASE_LEFT} stroke='#bfdbfe' strokeLinecap='round' strokeOpacity='0.55' strokeWidth='1' />
          <path d={ENVELOPE_CREASE_RIGHT} stroke='#bfdbfe' strokeLinecap='round' strokeOpacity='0.55' strokeWidth='1' />
        </svg>
      </div>

      <div className={clsx(styles.mailItem, styles.mailLeftSmall)}>
        <svg className={styles.mailSvg} fill='none' viewBox='0 0 24 24'>
          <defs>
            <linearGradient id='gpContactMailYellowSmall' x1='0%' x2='100%' y1='0%' y2='100%'>
              <stop offset='0%' stopColor='#fde047' stopOpacity='0.92' />
              <stop offset='100%' stopColor='#f59e0b' stopOpacity='0.84' />
            </linearGradient>
          </defs>
          <path d={ENVELOPE_BODY_PATH} fill='url(#gpContactMailYellowSmall)' />
          <path
            d={ENVELOPE_FLAP_PATH}
            stroke='#fffbeb'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeOpacity='0.9'
            strokeWidth='1.35'
          />
        </svg>
      </div>

      <div className={clsx(styles.mailItem, styles.mailLeftOutline)}>
        <svg className={styles.mailSvg} fill='none' viewBox='0 0 24 24'>
          <path d={ENVELOPE_BODY_PATH} fill='#3b82f6' fillOpacity='0.14' stroke='#60a5fa' strokeWidth='1.25' />
          <path
            d={ENVELOPE_FLAP_PATH}
            stroke='#60a5fa'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.2'
          />
        </svg>
      </div>

      <div className={clsx(styles.mailItem, styles.mailRightLarge)}>
        <svg className={styles.mailSvg} fill='none' viewBox='0 0 24 24'>
          <defs>
            <linearGradient id='gpContactMailYellow' x1='0%' x2='100%' y1='0%' y2='100%'>
              <stop offset='0%' stopColor='#facc15' stopOpacity='0.9' />
              <stop offset='100%' stopColor='#eab308' stopOpacity='0.82' />
            </linearGradient>
          </defs>
          <path d={ENVELOPE_BODY_PATH} fill='url(#gpContactMailYellow)' />
          <path
            d={ENVELOPE_FLAP_PATH}
            stroke='#fefce8'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeOpacity='0.9'
            strokeWidth='1.35'
          />
          <path d={ENVELOPE_CREASE_LEFT} stroke='#fef08a' strokeLinecap='round' strokeOpacity='0.6' strokeWidth='1' />
          <path d={ENVELOPE_CREASE_RIGHT} stroke='#fef08a' strokeLinecap='round' strokeOpacity='0.6' strokeWidth='1' />
        </svg>
      </div>

      <div className={clsx(styles.mailItem, styles.mailRightOutline)}>
        <svg className={styles.mailSvg} fill='none' viewBox='0 0 24 24'>
          <path d={ENVELOPE_BODY_PATH} fill='#eab308' fillOpacity='0.14' stroke='#facc15' strokeWidth='1.25' />
          <path
            d={ENVELOPE_FLAP_PATH}
            stroke='#facc15'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.2'
          />
        </svg>
      </div>

      <div className={clsx(styles.mailItem, styles.mailRightSmall)}>
        <svg className={styles.mailSvg} fill='none' viewBox='0 0 24 24'>
          <path d={ENVELOPE_BODY_PATH} fill='#38bdf8' fillOpacity='0.78' />
          <path
            d={ENVELOPE_FLAP_PATH}
            stroke='#f0f9ff'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeOpacity='0.88'
            strokeWidth='1.35'
          />
        </svg>
      </div>
    </div>
  );
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './sponsors-floating-hearts.module.css';

const HEART_PATH =
  'M12 20.6C6.9 16 3.2 12.7 3.2 8.7 3.2 5.9 5.4 3.8 8.1 3.8c1.6 0 3.1.8 3.9 2.1.8-1.3 2.3-2.1 3.9-2.1 2.7 0 4.9 2.1 4.9 4.9 0 4-3.7 7.3-8.8 11.9z';

/**
 * @brief Decorative floating purple and pink hearts flanking the Sponsors hero without cursor tracking.
 */
export const SponsorsFloatingHearts: React.FC = () => {
  return (
    <div aria-hidden='true' className={styles.heartsField}>
      <div className={clsx(styles.heartItem, styles.heartLeftLarge)}>
        <svg className={styles.heartSvg} fill='none' viewBox='0 0 24 24'>
          <defs>
            <linearGradient id='gpSponsorHeartPink' x1='0%' x2='100%' y1='0%' y2='100%'>
              <stop offset='0%' stopColor='#ff8cd2' stopOpacity='0.88' />
              <stop offset='100%' stopColor='#b86bff' stopOpacity='0.78' />
            </linearGradient>
          </defs>
          <path d={HEART_PATH} fill='url(#gpSponsorHeartPink)' />
          <path d={HEART_PATH} stroke='#f5b8ea' strokeOpacity='0.55' strokeWidth='0.7' />
        </svg>
      </div>

      <div className={clsx(styles.heartItem, styles.heartLeftSmall)}>
        <svg className={styles.heartSvg} fill='none' viewBox='0 0 24 24'>
          <defs>
            <linearGradient id='gpSponsorHeartLavender' x1='0%' x2='100%' y1='0%' y2='100%'>
              <stop offset='0%' stopColor='#d9b8ff' stopOpacity='0.9' />
              <stop offset='100%' stopColor='#f583c9' stopOpacity='0.82' />
            </linearGradient>
          </defs>
          <path d={HEART_PATH} fill='url(#gpSponsorHeartLavender)' />
        </svg>
      </div>

      <div className={clsx(styles.heartItem, styles.heartLeftOutline)}>
        <svg className={styles.heartSvg} fill='none' viewBox='0 0 24 24'>
          <path d={HEART_PATH} fill='#c563db' fillOpacity='0.14' stroke='#d484f2' strokeWidth='1.1' />
        </svg>
      </div>

      <div className={clsx(styles.heartItem, styles.heartRightLarge)}>
        <svg className={styles.heartSvg} fill='none' viewBox='0 0 24 24'>
          <defs>
            <linearGradient id='gpSponsorHeartPurple' x1='0%' x2='100%' y1='0%' y2='100%'>
              <stop offset='0%' stopColor='#c084fc' stopOpacity='0.85' />
              <stop offset='100%' stopColor='#ec4899' stopOpacity='0.78' />
            </linearGradient>
          </defs>
          <path d={HEART_PATH} fill='url(#gpSponsorHeartPurple)' />
          <path d={HEART_PATH} stroke='#e9d5ff' strokeOpacity='0.5' strokeWidth='0.7' />
        </svg>
      </div>

      <div className={clsx(styles.heartItem, styles.heartRightOutline)}>
        <svg className={styles.heartSvg} fill='none' viewBox='0 0 24 24'>
          <path d={HEART_PATH} fill='#ec4899' fillOpacity='0.12' stroke='#f472b6' strokeWidth='1.1' />
        </svg>
      </div>

      <div className={clsx(styles.heartItem, styles.heartRightSmall)}>
        <svg className={styles.heartSvg} fill='none' viewBox='0 0 24 24'>
          <path d={HEART_PATH} fill='#ad8afc' fillOpacity='0.72' />
        </svg>
      </div>
    </div>
  );
};

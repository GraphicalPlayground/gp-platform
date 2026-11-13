// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './certifications-floating-seals.module.css';

const MEDAL_RIBBONS_LEFT = 'M8.5 14.5 7 21.5l5-2.5 5 2.5-1.5-7';
const MEDAL_CHECK = 'm9.2 9.8 2 2 3.8-4';

/**
 * @brief Decorative floating verification seals and medallions flanking the Certifications hero without cursor tracking.
 */
export const CertificationsFloatingSeals: React.FC = () => {
  return (
    <div aria-hidden='true' className={styles.sealsField}>
      <div className={clsx(styles.sealItem, styles.sealLeftLarge)}>
        <svg className={styles.sealSvg} fill='none' viewBox='0 0 24 24'>
          <defs>
            <linearGradient id='gpCertSealAmber' x1='0%' x2='100%' y1='0%' y2='100%'>
              <stop offset='0%' stopColor='#fcd34d' stopOpacity='0.9' />
              <stop offset='100%' stopColor='#f59e0b' stopOpacity='0.82' />
            </linearGradient>
          </defs>
          <path
            d={MEDAL_RIBBONS_LEFT}
            fill='#f59e0b'
            fillOpacity='0.35'
            stroke='#fbbf24'
            strokeLinejoin='round'
            strokeWidth='1.1'
          />
          <circle cx='12' cy='9.5' fill='url(#gpCertSealAmber)' r='6.2' />
          <circle cx='12' cy='9.5' r='4.6' stroke='#fef3c7' strokeOpacity='0.65' strokeWidth='0.8' />
          <path d={MEDAL_CHECK} stroke='#fffbeb' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.6' />
        </svg>
      </div>

      <div className={clsx(styles.sealItem, styles.sealLeftSmall)}>
        <svg className={styles.sealSvg} fill='none' viewBox='0 0 24 24'>
          <defs>
            <linearGradient id='gpCertSealPink' x1='0%' x2='100%' y1='0%' y2='100%'>
              <stop offset='0%' stopColor='#f9a8d4' stopOpacity='0.9' />
              <stop offset='100%' stopColor='#ec4899' stopOpacity='0.8' />
            </linearGradient>
          </defs>
          <circle cx='12' cy='12' fill='url(#gpCertSealPink)' r='7.2' />
          <path
            d='m9 12.2 2.1 2.1 4-4.3'
            stroke='#fdf2f8'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.6'
          />
        </svg>
      </div>

      <div className={clsx(styles.sealItem, styles.sealLeftOutline)}>
        <svg className={styles.sealSvg} fill='none' viewBox='0 0 24 24'>
          <path
            d='M12 3.2 19 6.4v5.1c0 4.5-2.9 8.2-7 9.5-4.1-1.3-7-5-7-9.5V6.4l7-3.2z'
            fill='#10b981'
            fillOpacity='0.14'
            stroke='#34d399'
            strokeWidth='1.25'
          />
          <path d='m9.2 12 2 2 3.8-4' stroke='#34d399' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.4' />
        </svg>
      </div>

      <div className={clsx(styles.sealItem, styles.sealRightLarge)}>
        <svg className={styles.sealSvg} fill='none' viewBox='0 0 24 24'>
          <defs>
            <linearGradient id='gpCertSealEmerald' x1='0%' x2='100%' y1='0%' y2='100%'>
              <stop offset='0%' stopColor='#34d399' stopOpacity='0.88' />
              <stop offset='100%' stopColor='#059669' stopOpacity='0.8' />
            </linearGradient>
          </defs>
          <path
            d={MEDAL_RIBBONS_LEFT}
            fill='#10b981'
            fillOpacity='0.34'
            stroke='#34d399'
            strokeLinejoin='round'
            strokeWidth='1.1'
          />
          <circle cx='12' cy='9.5' fill='url(#gpCertSealEmerald)' r='6.2' />
          <circle cx='12' cy='9.5' r='4.6' stroke='#d1fae5' strokeOpacity='0.65' strokeWidth='0.8' />
          <path d={MEDAL_CHECK} stroke='#ecfdf5' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.6' />
        </svg>
      </div>

      <div className={clsx(styles.sealItem, styles.sealRightOutline)}>
        <svg className={styles.sealSvg} fill='none' viewBox='0 0 24 24'>
          <circle cx='12' cy='10' fill='#f59e0b' fillOpacity='0.12' r='6' stroke='#fbbf24' strokeWidth='1.2' />
          <path
            d='M9 15 7.8 20.5 12 18.4l4.2 2.1L15 15'
            stroke='#fbbf24'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.2'
          />
          <path
            d='m9.6 10.2 1.8 1.8 3.2-3.4'
            stroke='#fbbf24'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.3'
          />
        </svg>
      </div>

      <div className={clsx(styles.sealItem, styles.sealRightSmall)}>
        <svg className={styles.sealSvg} fill='none' viewBox='0 0 24 24'>
          <path
            d='M12 3.5 18.5 6.4v4.8c0 4.2-2.7 7.6-6.5 8.8-3.8-1.2-6.5-4.6-6.5-8.8V6.4L12 3.5z'
            fill='#60a5fa'
            fillOpacity='0.78'
          />
          <path
            d='m9.5 11.7 1.9 1.9 3.4-3.6'
            stroke='#eff6ff'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
          />
        </svg>
      </div>
    </div>
  );
};

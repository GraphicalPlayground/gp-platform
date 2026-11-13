// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './careers-floating-briefcases.module.css';

const CASE_BODY_PATH = 'M5 8.5h14a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7.5a2 2 0 0 1 2-2z';
const CASE_HANDLE_PATH = 'M8.5 8.5V6.6A1.6 1.6 0 0 1 10.1 5h3.8a1.6 1.6 0 0 1 1.6 1.6v1.9';
const CASE_FLAP_PATH = 'M3 13c2.8 1.2 5.9 1.8 9 1.8s6.2-.6 9-1.8';

/**
 * @brief Decorative floating emerald and teal briefcases flanking the Careers hero without cursor tracking.
 */
export const CareersFloatingBriefcases: React.FC = () => {
  return (
    <div aria-hidden='true' className={styles.briefcasesField}>
      <div className={clsx(styles.caseItem, styles.caseLeftLarge)}>
        <svg className={styles.caseSvg} fill='none' viewBox='0 0 24 24'>
          <defs>
            <linearGradient id='gpCareerCaseEmerald' x1='0%' x2='100%' y1='0%' y2='100%'>
              <stop offset='0%' stopColor='#34d399' stopOpacity='0.86' />
              <stop offset='100%' stopColor='#059669' stopOpacity='0.78' />
            </linearGradient>
          </defs>
          <path d={CASE_HANDLE_PATH} stroke='#34d399' strokeLinecap='round' strokeWidth='1.6' />
          <path d={CASE_BODY_PATH} fill='url(#gpCareerCaseEmerald)' />
          <path d={CASE_FLAP_PATH} stroke='#d1fae5' strokeOpacity='0.72' strokeWidth='1.1' />
          <rect fill='#ecfdf5' fillOpacity='0.88' height='2.2' rx='0.6' width='3.2' x='10.4' y='13.6' />
        </svg>
      </div>

      <div className={clsx(styles.caseItem, styles.caseLeftSmall)}>
        <svg className={styles.caseSvg} fill='none' viewBox='0 0 24 24'>
          <defs>
            <linearGradient id='gpCareerCaseMint' x1='0%' x2='100%' y1='0%' y2='100%'>
              <stop offset='0%' stopColor='#6ee7b7' stopOpacity='0.9' />
              <stop offset='100%' stopColor='#14b8a6' stopOpacity='0.8' />
            </linearGradient>
          </defs>
          <path d={CASE_HANDLE_PATH} stroke='#6ee7b7' strokeLinecap='round' strokeWidth='1.6' />
          <path d={CASE_BODY_PATH} fill='url(#gpCareerCaseMint)' />
          <rect fill='#ffffff' fillOpacity='0.82' height='2' rx='0.5' width='2.8' x='10.6' y='13.6' />
        </svg>
      </div>

      <div className={clsx(styles.caseItem, styles.caseLeftOutline)}>
        <svg className={styles.caseSvg} fill='none' viewBox='0 0 24 24'>
          <path d={CASE_HANDLE_PATH} stroke='#10b981' strokeLinecap='round' strokeWidth='1.3' />
          <path d={CASE_BODY_PATH} fill='#10b981' fillOpacity='0.14' stroke='#34d399' strokeWidth='1.2' />
          <path d={CASE_FLAP_PATH} stroke='#34d399' strokeOpacity='0.7' strokeWidth='1' />
        </svg>
      </div>

      <div className={clsx(styles.caseItem, styles.caseRightLarge)}>
        <svg className={styles.caseSvg} fill='none' viewBox='0 0 24 24'>
          <defs>
            <linearGradient id='gpCareerCaseTeal' x1='0%' x2='100%' y1='0%' y2='100%'>
              <stop offset='0%' stopColor='#2dd4bf' stopOpacity='0.84' />
              <stop offset='100%' stopColor='#0d9488' stopOpacity='0.78' />
            </linearGradient>
          </defs>
          <path d={CASE_HANDLE_PATH} stroke='#2dd4bf' strokeLinecap='round' strokeWidth='1.6' />
          <path d={CASE_BODY_PATH} fill='url(#gpCareerCaseTeal)' />
          <path d={CASE_FLAP_PATH} stroke='#ccfbf1' strokeOpacity='0.72' strokeWidth='1.1' />
          <rect fill='#f0fdfa' fillOpacity='0.88' height='2.2' rx='0.6' width='3.2' x='10.4' y='13.6' />
        </svg>
      </div>

      <div className={clsx(styles.caseItem, styles.caseRightOutline)}>
        <svg className={styles.caseSvg} fill='none' viewBox='0 0 24 24'>
          <path d={CASE_HANDLE_PATH} stroke='#14b8a6' strokeLinecap='round' strokeWidth='1.3' />
          <path d={CASE_BODY_PATH} fill='#14b8a6' fillOpacity='0.14' stroke='#2dd4bf' strokeWidth='1.2' />
          <path d={CASE_FLAP_PATH} stroke='#2dd4bf' strokeOpacity='0.7' strokeWidth='1' />
        </svg>
      </div>

      <div className={clsx(styles.caseItem, styles.caseRightSmall)}>
        <svg className={styles.caseSvg} fill='none' viewBox='0 0 24 24'>
          <path d={CASE_HANDLE_PATH} stroke='#34d399' strokeLinecap='round' strokeWidth='1.5' />
          <path d={CASE_BODY_PATH} fill='#10b981' fillOpacity='0.74' />
          <rect fill='#ecfdf5' fillOpacity='0.86' height='2' rx='0.5' width='2.8' x='10.6' y='13.6' />
        </svg>
      </div>
    </div>
  );
};

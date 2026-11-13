// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useRef } from 'react';
import clsx from 'clsx';
import styles from './text-cursor-animation.module.css';

import { useCursorAnimation } from '../../hooks';
import { EyebrowText } from '../eyebrow-text';
import type { TextProps } from '../text';

export type TextCursorAnimationProps = {
  /**
   * Whether to animate the text with a typing effect.
   */
  animate?: boolean;
  /**
   * Optional text to type before transitioning to the final text
   */
  initialText?: string;
  delay?: number;
  waitForPageLoad?: boolean;
  animationTrigger?: 'immediate' | 'on-visible';
} & React.HTMLAttributes<HTMLSpanElement> &
  Omit<TextProps, 'animate' | 'as'>;

export function TextCursorAnimation({
  children,
  className,
  animate,
  initialText,
  delay,
  waitForPageLoad = true,
  animationTrigger = 'immediate',
  variant = 'muted'
}: React.PropsWithChildren<TextCursorAnimationProps>) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const text = typeof children === 'string' ? children : '';
  const { showCursor, visibleText, cursorPhase } = useCursorAnimation({
    text,
    initialText,
    animate,
    delay,
    waitForPageLoad,
    startOnIntersection: animationTrigger === 'on-visible',
    intersectionRef: rootRef
  });

  const hasAnimation = animate === true && text.length > 0;
  const content = text || children;
  const cursorPhaseClassName = {
    initial: styles['text-cursor-animation__cursor--initial'],
    correction: styles['text-cursor-animation__cursor--correction'],
    final: styles['text-cursor-animation__cursor--final'],
    complete: styles['text-cursor-animation__cursor--complete']
  }[hasAnimation ? cursorPhase : 'complete'];

  const cursor = showCursor ? (
    <span
      className={clsx(
        styles['text-cursor-animation__cursor'],
        hasAnimation && styles['text-cursor-animation__cursor--animated'],
        cursorPhaseClassName
      )}
      aria-hidden='true'
    />
  ) : null;

  return (
    <span ref={rootRef} className={clsx(styles['text-cursor-animation'], className)}>
      <span className={styles['text-cursor-animation__inner']}>
        {hasAnimation && (
          <span className={styles['text-cursor-animation__sizingContainer']}>
            <EyebrowText
              size='100'
              variant={variant}
              font='monospace'
              weight='medium'
              className={clsx(styles['text-cursor-animation__text'], styles['text-cursor-animation__sizingText'])}
            >
              {text}
            </EyebrowText>
            {initialText && initialText !== text && (
              <EyebrowText
                size='100'
                variant={variant}
                font='monospace'
                weight='medium'
                className={clsx(styles['text-cursor-animation__text'], styles['text-cursor-animation__sizingText'])}
                aria-hidden='true'
              >
                {initialText}
              </EyebrowText>
            )}
          </span>
        )}
        <span
          className={clsx(
            styles['text-cursor-animation__content'],
            hasAnimation && styles['text-cursor-animation__content--animated']
          )}
          aria-hidden={hasAnimation ? 'true' : undefined}
        >
          <EyebrowText
            size='100'
            variant={variant}
            font='monospace'
            weight='medium'
            className={styles['text-cursor-animation__text']}
          >
            {hasAnimation ? visibleText : content}
          </EyebrowText>
          {cursor}
        </span>
      </span>
    </span>
  );
}

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { clsx } from 'clsx';
import styles from './prose.module.css';

/**
 * @brief Prose component props.
 * @see Prose
 */
export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @brief Valid children include string encapsulated HTML elements such as `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<p>`, `<strong>`, `<em>`, `<a>`, `<ul>`, `<ol>`, `<li>`, `<img>`, and `<div>`.
   */
  html?: string;

  /**
   * @brief The presentational variant of the prose.
   */
  variant?: 'default' | 'editorial';

  /**
   * @brief Whether to enable full width prose or not.
   */
  enableFullWidth?: boolean;
}

/**
 * @brief Prose component for rendering rich text content.
 */
export const Prose = React.forwardRef<HTMLDivElement, ProseProps>(
  ({ children, className, enableFullWidth = false, html, variant = 'default', ...rest }, ref) => {
    if (!html && !children) {
      return null;
    }

    if (html && children) {
      // eslint-disable-next-line no-console
      console.warn('Prose component received both `html` and `children`. `html` will take precedence over `children`.');
    }

    if (html) {
      return (
        <div
          ref={ref}
          className={clsx(
            styles.prose,
            !enableFullWidth && styles['prose--line-length'],
            styles[`prose--${variant}`],
            className
          )}
          {...rest}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={clsx(
          styles.prose,
          !enableFullWidth && styles['prose--line-length'],
          styles[`prose--${variant}`],
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

/** Set the display name for the Prose component. */
Prose.displayName = 'gp.Prose';

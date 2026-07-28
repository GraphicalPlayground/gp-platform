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
export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * @brief Prose component for rendering rich text content.
 */
export const Prose: React.FC<ProseProps> = ({ children, className, ...rest }) => {
  return (
    <div className={clsx(styles.prose, className)} {...rest}>
      {children}
    </div>
  );
};

/** Set the display name for the Prose component. */
Prose.displayName = 'gp.Prose';

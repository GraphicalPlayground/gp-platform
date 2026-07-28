// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './link.module.css';

/**
 * @brief Link component props interface.
 * @see Link
 */
export interface LinkProps extends React.HTMLAttributes<HTMLElement> {}

/**
 * @brief Link component.
 * @details
 */
export const Link: React.FC<LinkProps> = ({className, ...rest}) => {
  return <div className={clsx(styles['link'], className)} {...rest} />;
};

/** Set the display name for the Link component. */
Link.displayName = 'gp.Link';

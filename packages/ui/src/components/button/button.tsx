// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './button.module.css';

/**
 * @brief Button component props interface.
 * @see Button
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * @brief Button component.
 * @details A customizable button component.
 */
export const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return <button className={clsx(styles.button, className)} {...props} />;
};

/** Set the display name for the Button component. */
Button.displayName = 'gp.Button';

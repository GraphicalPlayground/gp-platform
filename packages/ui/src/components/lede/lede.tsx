// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './lede.module.css';

import { Text } from '../text';

/**
 * @brief Props for the Lede component.
 */
export interface LedeProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * @brief A Lede component that renders a paragraph of text with specific styling.
 */
export const Lede: React.FC<LedeProps> = ({ children, className }) => {
  return (
    <Text as='p' size='500' font='hubot-sans' weight='medium' className={clsx(styles.lede, className)}>
      {children}
    </Text>
  );
};

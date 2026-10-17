// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from '../hero.module.css';

import { useHeroContext } from '../hero-context';

import { Heading } from '../../heading';
import type { HeadingProps } from '../../heading';

export type HeroHeadingProps = Omit<HeadingProps, 'as'> & {
  fullWidth?: boolean;
};

/**
 * @brief HeroHeading is a component that renders a heading for the hero section of a page.
 * It is designed to be used within the Hero component and can be customized with various props.
 */
export const HeroHeading = React.forwardRef<HTMLHeadingElement, HeroHeadingProps>(
  ({ children, fullWidth = false, size = '1', ...rest }: React.PropsWithChildren<HeroHeadingProps>, ref) => {
    const { hasInlineMedia } = useHeroContext();

    return (
      <Heading
        id='hero-section-brand-heading'
        className={clsx(styles['hero-heading'], fullWidth && styles['hero-heading--fullWidth'])}
        as='h1'
        size={hasInlineMedia ? '2' : size}
        ref={ref}
        {...rest}
      >
        {children}
      </Heading>
    );
  }
);

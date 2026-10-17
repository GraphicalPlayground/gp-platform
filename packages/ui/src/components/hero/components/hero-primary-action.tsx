// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { forwardRef } from 'react';
import { Button } from '../../button';
import type { ButtonBaseProps } from '../../button';
import type { BaseProps } from '../../helper';
import { useHeroContext } from '../hero-context';
import { Box } from '../../box';

type RestrictedPolymorphism =
  (BaseProps<HTMLAnchorElement> & { as?: 'a' }) | (BaseProps<HTMLButtonElement> & { as?: 'button' });

export type HeroPrimaryActionProps = {
  as?: 'a' | 'button';
  href: string;
} & ButtonBaseProps &
  RestrictedPolymorphism;

/**
 * @brief HeroPrimaryAction is a component that renders a primary action button within the Hero component.
 */
export const HeroPrimaryAction = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  React.PropsWithChildren<HeroPrimaryActionProps>
>(({ as = 'a', children, href, ...rest }, ref) => {
  const { variant: heroVariant } = useHeroContext();
  const isGridline = heroVariant === 'gridline' || heroVariant === 'gridline-expressive';
  const Tag = isGridline ? Box : React.Fragment;

  return (
    <Tag>
      <Button ref={ref as React.Ref<HTMLButtonElement>} as={as} variant='primary' size='medium' href={href} {...rest}>
        {children}
      </Button>
    </Tag>
  );
});

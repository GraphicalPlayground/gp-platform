// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { BaseProps } from '../helper';
import { Button } from '../button';
import type { ButtonProps } from '../button';
import { IconButton } from '../icon-button';
import type { IconButtonProps } from '../icon-button';
import { ActionMenu } from '../action-menu';
import type { ActionMenuProps } from '../action-menu';
import styles from './button-group.module.css';

export type PrimerBrandButtonType = React.ReactElement<ButtonProps<React.ElementType<'button' | 'a'>>>;
export type PrimerBrandIconButtonType = React.ReactElement<IconButtonProps<React.ElementType<'button' | 'a'>>>;
export type PrimerBrandActionMenuType = React.ReactElement<ActionMenuProps>;
export const ButtonGroupVariants = ['default', 'joined'] as const;
export const defaultButtonGroupVariant = ButtonGroupVariants[0];

export type ButtonGroupVariant = (typeof ButtonGroupVariants)[number];
export type ButtonGroupChild =
  PrimerBrandButtonType | PrimerBrandIconButtonType | PrimerBrandActionMenuType | false | null | undefined;

export type ButtonGroupProps = BaseProps<HTMLDivElement> & {
  children: ButtonGroupChild | ButtonGroupChild[];
  buttonSize?: ButtonProps<'button' | 'a'>['size'];
  buttonsAs?: 'button' | 'a';
  variant?: ButtonGroupVariant;
};

export const ButtonGroup = forwardRef(
  (
    {
      buttonSize = 'medium',
      buttonsAs,
      className,
      children,
      variant = defaultButtonGroupVariant,
      ...props
    }: ButtonGroupProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const supportedChildren = React.Children.toArray(children).filter(
      (child): child is React.ReactElement =>
        React.isValidElement(child) && (child.type === Button || child.type === IconButton || child.type === ActionMenu)
    );
    const supportsJoinedVariant =
      supportedChildren.length > 0 &&
      supportedChildren.every((child) => child.type === Button || child.type === IconButton);

    const isJoinedGroup = variant === 'joined' && supportsJoinedVariant;

    const childrenToRender = isJoinedGroup ? supportedChildren : supportedChildren.slice(0, 2);

    if (process.env.NODE_ENV !== 'production' && variant === 'joined' && !supportsJoinedVariant) {
      // eslint-disable-next-line no-console
      console.warn('ButtonGroup variant="joined" supports only Button and IconButton children.');
    }

    const buttonsToRender = childrenToRender.map((child, index) => {
      const childVariant = isJoinedGroup ? 'secondary' : index === 0 ? 'primary' : 'secondary';

      if (React.isValidElement<ButtonProps<'button' | 'a'>>(child) && child.type === Button) {
        const button = React.cloneElement(child, {
          size: child.props.size ?? buttonSize,
          as: child.props.as ?? buttonsAs,
          variant: child.props.variant ?? childVariant,
          className: clsx(child.props.className, isJoinedGroup && styles['button-group__joinedButton'])
        });

        if (isJoinedGroup) {
          return (
            <span className={styles['button-group__item']} key={child.key ?? index}>
              {button}
            </span>
          );
        }

        return button;
      }

      if (React.isValidElement<IconButtonProps<'button' | 'a'>>(child) && child.type === IconButton) {
        const iconButton = React.cloneElement(child, {
          size: child.props.size ?? buttonSize,
          as: child.props.as ?? buttonsAs,
          variant: child.props.variant ?? childVariant,
          className: clsx(child.props.className, isJoinedGroup && styles['button-group__joinedButton'])
        });

        if (isJoinedGroup) {
          return (
            <span className={styles['button-group__item']} key={child.key ?? index}>
              {iconButton}
            </span>
          );
        }

        return iconButton;
      }

      const actionMenu = child as PrimerBrandActionMenuType;
      const actionMenuSize = buttonSize === 'large' ? 'medium' : buttonSize;
      const actionMenuChildren = React.Children.map(actionMenu.props.children, (actionMenuChild) => {
        if (
          React.isValidElement<React.ComponentProps<typeof ActionMenu.Button>>(actionMenuChild) &&
          actionMenuChild.type === ActionMenu.Button
        ) {
          return React.cloneElement(actionMenuChild, {
            variant: actionMenuChild.props.variant ?? childVariant
          });
        }

        return actionMenuChild;
      });

      return React.cloneElement(actionMenu, {
        children: actionMenuChildren,
        size: actionMenu.props.size ?? actionMenuSize
      });
    });

    return (
      <section
        ref={ref}
        {...props}
        className={clsx(styles['button-group'], isJoinedGroup && styles['button-group--variant-joined'], className)}
      >
        {buttonsToRender}
      </section>
    );
  }
);

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { forwardRef, useMemo, useCallback } from 'react';
import type { PropsWithChildren, Ref } from 'react';
import { clsx } from 'clsx';
import { Grid } from '../grid';
import { Link } from '../link';
import type { LinkProps } from '../link';
import { Heading, defaultHeadingTag } from '../heading';
import type { HeadingProps } from '../heading';
import { Text } from '../text';
import type { TextProps } from '../text';
import { Icon } from '../icon';
import type { IconProps } from '../icon';

import styles from './section-intro-stacked.module.css';
import gridlineStyles from '../shared.module.css';

import type { BaseProps } from '../helper';

export const SectionIntroStackedVariants = ['default', 'gridline'] as const;
export type SectionIntroStackedVariant = (typeof SectionIntroStackedVariants)[number];

export type SectionIntroStackedProps = React.HTMLAttributes<HTMLElement> &
  BaseProps<HTMLElement> &
  PropsWithChildren & {
    variant?: SectionIntroStackedVariant;
  };

const Root = forwardRef<HTMLElement, PropsWithChildren<SectionIntroStackedProps>>(
  ({ className, children, variant = 'default', ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);

    // extract Items and everything else into two separate arrays
    const items = childrenArray.filter((child) => React.isValidElement(child) && child.type === ItemsBase);

    const otherChildren = childrenArray.filter((child) => !items.includes(child));

    return (
      <header
        ref={ref}
        className={clsx(
          styles.SectionIntroStacked,
          variant === 'gridline' && styles['SectionIntroStacked--variant-gridline'],
          variant === 'gridline' && gridlineStyles.gridline,
          className
        )}
        {...props}
      >
        <Grid fullWidth enableGutters={variant !== 'gridline'} columnGap='none'>
          <Grid.Column span={{ large: 6 }} className={styles['SectionIntroStacked-content']}>
            {otherChildren}
          </Grid.Column>
          <Grid.Column span={{ large: 6 }} start={{ large: 7 }}>
            {items}
          </Grid.Column>
        </Grid>
      </header>
    );
  }
);

type SectionIntroStackedHeadingProps = BaseProps<HTMLHeadingElement> & HeadingProps;

const defaultHeadingSize = '3';

const _Heading = forwardRef(
  (
    {
      as = defaultHeadingTag,
      size = defaultHeadingSize,
      className,
      children,
      ...props
    }: PropsWithChildren<SectionIntroStackedHeadingProps>,
    ref: Ref<HTMLHeadingElement>
  ) => {
    const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

    const getConditionalVariant = useCallback(() => {
      if (childrenArray.some((child) => React.isValidElement(child) && (child.type === 'b' || child.type === 'em'))) {
        return 'muted';
      }

      return 'default';
    }, [childrenArray]);

    const defaultColor = childrenArray.length === 1 ? 'default' : getConditionalVariant();

    return (
      <Heading
        ref={ref}
        className={clsx(
          styles[`SectionIntroStacked-heading`],
          defaultColor === 'muted' && styles[`SectionIntroStacked-heading--muted`],
          className
        )}
        size={size}
        as={as}
        {...props}
      >
        {children}
      </Heading>
    );
  }
);

type SectionIntroStackedDescriptionProps = Omit<TextProps, 'as' | 'variant'> &
  BaseProps<HTMLParagraphElement> & {
    as?: 'p';
    children: React.ReactNode | React.ReactNode[];
  };

const _Description = forwardRef(
  ({ className, children, ...props }: SectionIntroStackedDescriptionProps, ref: Ref<HTMLParagraphElement>) => {
    return (
      <Text
        as='p'
        className={clsx(styles['SectionIntroStacked-description'], className)}
        ref={ref}
        variant='muted'
        {...props}
      >
        {children}
      </Text>
    );
  }
);

type SectionIntroStackedLinkProps = LinkProps & BaseProps<HTMLAnchorElement>;

const _Link = forwardRef(
  (
    { className, children, variant = 'accent', size = 'medium', ...props }: SectionIntroStackedLinkProps,
    ref: Ref<HTMLAnchorElement>
  ) => {
    return (
      <Link
        ref={ref}
        className={clsx(styles['SectionIntroStacked-link'], className)}
        size={size}
        variant={variant}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

type SectionIntroStackedItemsProps = BaseProps<HTMLUListElement>;

const ItemsBase = ({ className, children, ...rest }: PropsWithChildren<SectionIntroStackedItemsProps>) => {
  const timelineClassName = clsx(styles['SectionIntroStacked-items'], className);

  return (
    <ul className={timelineClassName} {...rest}>
      {children}
    </ul>
  );
};

type SectionIntroStackedItemIconProps = IconProps;

const ItemIcon = ({ className, color = 'green', ...props }: SectionIntroStackedItemIconProps) => {
  return (
    <Icon
      className={clsx(styles['SectionIntroStackedItem__icon'], className)}
      hasBackground
      size='small'
      color={color}
      {...props}
    />
  );
};

type SectionIntroStackedItemHeadingProps = HeadingProps;

const ItemHeading = forwardRef(
  (
    {
      as = 'h3',
      size = 'subhead-large',
      className,
      children,
      ...props
    }: PropsWithChildren<SectionIntroStackedItemHeadingProps>,
    ref: Ref<HTMLHeadingElement>
  ) => {
    return (
      <Heading
        ref={ref}
        as={as}
        size={size}
        className={clsx(styles['SectionIntroStackedItem__heading' as keyof typeof styles], className)}
        {...props}
      >
        {children}
      </Heading>
    );
  }
);

type SectionIntroStackedItemDescriptionProps = Omit<TextProps, 'as' | 'variant' | 'size'> &
  BaseProps<HTMLParagraphElement> & {
    as?: 'p';
    children: React.ReactNode | React.ReactNode[];
  };

const ItemDescription = forwardRef(
  ({ className, children, ...props }: SectionIntroStackedItemDescriptionProps, ref: Ref<HTMLParagraphElement>) => {
    return (
      <Text
        as='p'
        variant='muted'
        size='200'
        className={clsx(styles['SectionIntroStackedItem__description' as keyof typeof styles], className)}
        ref={ref}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

export type SectionIntroStackedItemProps = BaseProps<HTMLLIElement>;

const ItemBase = ({ className, children, ...rest }: PropsWithChildren<SectionIntroStackedItemProps>) => {
  const itemClassName = clsx(styles['SectionIntroStackedItem-item'], className);
  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  const hasSubComponents = childrenArray.some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === ItemIcon || child.type === ItemHeading || child.type === ItemDescription)
  );

  if (hasSubComponents) {
    const iconChild = childrenArray.find((child) => React.isValidElement(child) && child.type === ItemIcon);

    const contentChildren = childrenArray.filter((child) => !(React.isValidElement(child) && child.type === ItemIcon));

    return (
      <li className={clsx(itemClassName, !!iconChild && styles['SectionIntroStackedItem-item--with-icon'])} {...rest}>
        {iconChild}
        <div className={styles['SectionIntroStackedItem__content']}>{contentChildren}</div>
      </li>
    );
  }

  const getConditionalVariant = () => {
    if (childrenArray.some((child) => React.isValidElement(child) && (child.type === 'b' || child.type === 'em'))) {
      return 'muted';
    }

    return 'default';
  };

  const defaultColor = childrenArray.length === 1 ? 'default' : getConditionalVariant();

  return (
    <li className={itemClassName} {...rest}>
      <Text
        as='span'
        className={clsx(
          styles['SectionIntroStackedItem__item-text'],
          defaultColor === 'muted' && styles[`SectionIntroStackedItem__item-text--muted`]
        )}
        size='350'
      >
        {children}
      </Text>
    </li>
  );
};

export const SectionIntroStacked = Object.assign(Root, {
  Heading: _Heading,
  Description: _Description,
  Link: _Link,
  Items: ItemsBase,
  Item: ItemBase,
  ItemIcon,
  ItemHeading,
  ItemDescription
});

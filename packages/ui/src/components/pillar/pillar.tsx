// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './pillar.module.css';
import type { BaseProps } from '../helper';
import { Heading, Text, Image, Link, Icon } from '..';
import type { HeadingProps, ImageProps, LinkProps, IconProps } from '..';

export const defaultPillarIconColor = 'green';
export const defaultPillarIconSize = 32;

/**
 * @brief Pillar Props interface extending standard HTML div attributes.
 * @see PillarRoot
 */
export type PillarProps<C extends keyof React.JSX.IntrinsicElements = 'div'> = React.HTMLAttributes<C> & {
  /**
   * @brief The HTML element used to render the Pillar.
   */
  as?: C | 'div' | 'article';

  /**
   * @brief Aligns the pillar content
   */
  align?: 'start' | 'center';

  /**
   * @brief Enables optional border around the pillar content
   */
  hasBorder?: boolean;

  /**
   * @brief Allows the pillar to fill the width of its parent container.
   */
  fullWidth?: boolean;
} & (C extends 'article'
    ? React.PropsWithChildren<BaseProps<HTMLElement>>
    : React.PropsWithChildren<BaseProps<HTMLDivElement>>);

/**
 * @brief Pillar component that serves as a visual separator or container for content.
 */
export const PillarRoot = React.forwardRef<HTMLDivElement, React.PropsWithChildren<PillarProps>>(
  ({ align = 'start', as = 'div', children, className, fullWidth = false, hasBorder = false, ...rest }, ref) => {
    const filteredChildren = React.Children.toArray(children).filter((child) => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (
          child.type === PillarImage ||
          child.type === PillarIcon ||
          child.type === PillarHeading ||
          child.type === PillarDescription ||
          child.type === PillarLink
        ) {
          return true;
        }
      }

      return false;
    });

    const validElements = ['div', 'article'];
    const UnderlyingType = validElements.includes(as) ? as : 'div';

    return (
      <UnderlyingType
        className={clsx(
          styles.pillar,
          styles[`pillar--align-${align}` as keyof typeof styles],
          hasBorder && styles['pillar--has-border'],
          !fullWidth && styles['pillar--has-max-width'],
          className
        )}
        ref={ref}
        {...(rest as React.HTMLAttributes<HTMLElement>)}
      >
        {filteredChildren}
      </UnderlyingType>
    );
  }
);

/** Set the display name for the Pillar component. */
PillarRoot.displayName = 'gp.Pillar.Root';

type PillarImageProps = ImageProps;

/**
 * @brief PillarImage component that wraps the Image component with additional styling for use within a Pillar.
 */
function PillarImage({ className, ...rest }: PillarImageProps) {
  return (
    <div className={styles.pillar__image}>
      <Image className={className} {...rest} />
    </div>
  );
}

type IconComponentProps = React.SVGAttributes<SVGElement> & { size?: number };
type IconComponent = React.ComponentType<IconComponentProps> | React.ExoticComponent<IconComponentProps>;
type IconElement = React.ReactElement<IconComponentProps>;

export type PillarIconProps = Omit<IconProps, 'icon' | 'color'> & {
  icon: IconElement | IconComponent;
};

/**
 * @brief PillarIcon component that wraps the Icon component with additional styling for use within a Pillar.
 */
function PillarIcon({ className, hasBackground = true, icon, size, ...props }: PillarIconProps) {
  if (!hasBackground) {
    const iconWrapperProps = {
      ...(props as React.HTMLAttributes<HTMLSpanElement>),
      className: clsx(styles.pillar__icon, className)
    };

    let iconWithoutBackground: React.ReactNode;

    if (React.isValidElement<IconComponentProps>(icon)) {
      iconWithoutBackground = icon;
    } else {
      const IconWithoutBackground = icon;

      iconWithoutBackground = <IconWithoutBackground />;
    }

    return <span {...iconWrapperProps}>{iconWithoutBackground}</span>;
  }

  return (
    <Icon
      className={clsx(styles.pillar__icon, styles['pillar__icon--with-background'], className)}
      color={defaultPillarIconColor}
      hasBackground
      icon={icon as IconProps['icon']}
      size={size ?? defaultPillarIconSize}
      {...props}
    />
  );
}

type PillarHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[];
  as?: Exclude<HeadingProps['as'], 'h1'>;
} & HeadingProps;

/**
 * @brief PillarHeading component that wraps the Heading component with additional styling for use within a Pillar.
 */
const PillarHeading = React.forwardRef<HTMLHeadingElement, PillarHeadingProps>(
  ({ as = 'h3', children, className, size = '6', ...rest }, ref) => {
    return (
      <Heading
        size={size}
        className={clsx(
          styles.pillar__heading,
          styles[`pillar__heading--size-${size}` as keyof typeof styles],
          className
        )}
        ref={ref}
        as={as}
        {...rest}
      >
        {children}
      </Heading>
    );
  }
);

type PillarDescriptionProps = React.PropsWithChildren<BaseProps<HTMLParagraphElement>>;

/**
 * @brief PillarDescription component that wraps the Text component with additional styling for use within a Pillar.
 */
const PillarDescription = React.forwardRef<HTMLParagraphElement, PillarDescriptionProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <Text
        variant='muted'
        ref={ref}
        size='200'
        as='p'
        className={clsx(styles.pillar__description, className)}
        {...rest}
      >
        {children}
      </Text>
    );
  }
);

type PillarLinkProps = {
  href: string;
} & Omit<LinkProps, 'size' | 'direction'> &
  BaseProps<HTMLAnchorElement>;

/**
 * @brief PillarLink component that wraps the Link component with additional styling for use within a Pillar.
 */
const PillarLink = React.forwardRef<HTMLAnchorElement, PillarLinkProps>(
  ({ children, className, href, ...props }, ref) => {
    return (
      <Link variant='accent' href={href} ref={ref} className={clsx(styles.pillar__link, className)} {...props}>
        {children}
      </Link>
    );
  }
);

/**
 * @brief Pillar component that serves as a visual separator or container for content, with subcomponents for icon, image, heading, description, and link.
 */
export const Pillar = Object.assign(PillarRoot, {
  Icon: PillarIcon,
  Image: PillarImage,
  Heading: PillarHeading,
  Description: PillarDescription,
  Link: PillarLink
});

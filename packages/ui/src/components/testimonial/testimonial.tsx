// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { forwardRef } from 'react';
import type { HTMLAttributes, SVGProps, CSSProperties, ComponentPropsWithRef } from 'react';
import { clsx } from 'clsx';
import type { BaseProps } from '../helper';
import { Text } from '../text';
import { Avatar } from '../avatar';
import type { AvatarProps } from '../';
import { Link } from '../link';
import type { LinkProps } from '../link';
import { TextCursorAnimation } from '../text-cursor-animation';
import { colors } from '../constants';

/** * Main Stylesheet (as a CSS Module) */
import styles from './testimonial.module.css';

type TestimonialSize = 'small' | 'large';

export const TestimonialQuoteMarkColors = [...colors] as const;
export const defaultQuoteMarkColor = 'green';

export const TestimonialVariants = ['subtle', 'default', 'minimal', 'expressive'] as const;
type TestimonialVariant = (typeof TestimonialVariants)[number];
export const defaultTestimonialVariant: TestimonialVariant = 'minimal';

export type TestimonialProps = {
  /**
   * @brief Sets alternative visual appearance
   */
  variant?: TestimonialVariant;
  /**
   * @brief Applies an optional border where a variant supports it
   */
  hasBorder?: boolean;
  /**
   * @brief Valid children
   */
  children: React.ReactNode;
  /**
   * @brief Sets the testimonial text size
   */
  size?: TestimonialSize;
  /**
   * @brief Sets the color of the quote mark
   */
  quoteMarkColor?: (typeof TestimonialQuoteMarkColors)[number];
  /** @brief Class applied to the quote mark.
   *
   */
  quoteMarkClassName?: string;
  /** @brief Class applied to the attribution wrapper.
   *
   */
  mediaClassName?: string;
} & BaseProps<HTMLElement> &
  React.HTMLAttributes<HTMLElement>;

/**
 * Testimonial parent element
 * <Testimonial>
 */
function TestimonialRootBase(
  {
    quoteMarkColor = defaultQuoteMarkColor,
    quoteMarkClassName,
    mediaClassName,
    className,
    children,
    variant = defaultTestimonialVariant,
    hasBorder = true,
    size,
    ...rest
  }: TestimonialProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  const resolvedQuoteMarkColor = TestimonialQuoteMarkColors.includes(quoteMarkColor)
    ? quoteMarkColor
    : defaultQuoteMarkColor;

  const quoteMark = (
    <div
      aria-hidden='true'
      className={clsx(
        styles['Testimonial__quoteMark'],
        styles[`Testimonial__quoteMark--${resolvedQuoteMarkColor}`],
        quoteMarkClassName
      )}
    >
      <span className={styles.Testimonial__quoteMarkGlyph}>&ldquo;</span>
    </div>
  );

  const childrenArray = React.Children.toArray(children);
  const findChild = <Props,>(type: React.ElementType): React.ReactElement<Props> | undefined =>
    childrenArray.find(
      (child): child is React.ReactElement<Props> => React.isValidElement<Props>(child) && child.type === type
    );

  const quoteChild = findChild<TestimonialQuoteProps>(TestimonialQuote);
  const actionChild = findChild<LinkProps>(TestimonialLink);
  const avatarChild = findChild<AvatarProps>(TestimonialAvatar);
  const logoChild = findChild<TestimonialLogoProps>(TestimonialLogo);
  const nameChild = findChild<TestimonialNameProps>(TestimonialName);

  const name =
    nameChild && variant === 'expressive' && typeof nameChild.props.children === 'string'
      ? React.cloneElement(nameChild, {
          children: (
            <TextCursorAnimation animate animationTrigger='on-visible' variant='default'>
              {nameChild.props.children}
            </TextCursorAnimation>
          )
        })
      : nameChild;

  return (
    <figure
      ref={ref}
      className={clsx(
        styles['Testimonial'],
        styles[`Testimonial--variant-${variant}`],
        size && styles[`Testimonial--size-${size}` as keyof typeof styles],
        hasBorder && styles['Testimonial--border'],
        variant === 'expressive' && actionChild && styles['Testimonial--hasLink'],
        className
      )}
      style={{
        ['--testimonial-accent-color' as keyof CSSProperties]: resolvedQuoteMarkColor
      }}
      {...rest}
    >
      <div className={styles['Testimonial__quoteWrapper']}>
        {quoteMark}
        {quoteChild}
        {variant !== 'expressive' && actionChild}
      </div>
      <div className={clsx(styles['Testimonial__media'], mediaClassName)}>
        {avatarChild}
        {logoChild}
        {name}
      </div>
      {variant === 'expressive' && actionChild}
    </figure>
  );
}

const TestimonialRoot = forwardRef(TestimonialRootBase);

/**
 * Testimonial quote child element
 * <Testimonial.Quote>
 */
type TestimonialQuoteProps = React.HTMLAttributes<HTMLElement> & BaseProps<HTMLElement>;
function TestimonialQuoteBase(
  { children, className, ...rest }: TestimonialQuoteProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <blockquote {...rest} ref={ref as React.Ref<HTMLQuoteElement>}>
      <Text className={clsx(styles['Testimonial-quote'], className)}>{children}</Text>
    </blockquote>
  );
}
const TestimonialQuote = forwardRef(TestimonialQuoteBase);

/**
 * Testimonial name child element
 * <Testimonial.Name>
 */
type TestimonialNameProps = {
  position?: string;
} & React.HTMLAttributes<HTMLElement> &
  BaseProps<HTMLElement>;

function TestimonialNameBase(
  { children, className, position, ...rest }: TestimonialNameProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <figcaption {...rest} ref={ref} className={clsx(styles['Testimonial-caption'], className)}>
      <Text size='200' className={styles['Testimonial-from']} font='monospace'>
        {children}
      </Text>
      {position && (
        <Text size='200' className={clsx(styles['Testimonial-position'])} variant='muted'>
          {position}
        </Text>
      )}
    </figcaption>
  );
}
const TestimonialName = forwardRef(TestimonialNameBase);

/**
 * Testimonial logo child element
 * <Testimonial.Logo>
 */
type TestimonialLogoProps = {
  children: React.ReactElement<SVGProps<SVGSVGElement>> | React.ReactElement<HTMLAttributes<HTMLImageElement>>;
} & React.HTMLAttributes<HTMLImageElement> &
  BaseProps<HTMLImageElement>;

function TestimonialLogoBase({ children, ...rest }: TestimonialLogoProps, ref: React.ForwardedRef<unknown>) {
  return (
    <div className={styles['Testimonial-logo' as keyof typeof styles]} {...rest}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ComponentPropsWithRef<'img'>>(child) && child.type === 'img') {
          return React.cloneElement(child, {
            className: clsx(styles['Testimonial-logo-image'], child.props.className),
            ...(ref ? { ref: ref as ComponentPropsWithRef<'img'>['ref'] } : {})
          });
        }

        if (React.isValidElement<SVGProps<SVGSVGElement>>(child)) {
          return React.cloneElement(child, {
            className: clsx(styles['Testimonial-logo-image'], child.props.className),
            ...(ref ? { ref: ref as React.Ref<SVGSVGElement> } : {})
          });
        }
      })}
    </div>
  );
}
const TestimonialLogo = forwardRef(TestimonialLogoBase);

/**
 * Testimonial avatar child element
 * <Testimonial.Avatar>
 */

function TestimonialAvatarBase(
  { size: _, className, ...rest }: AvatarProps,
  ref: React.ForwardedRef<HTMLImageElement>
) {
  return <Avatar ref={ref} className={clsx(styles['Testimonial-avatar'], className)} size={48} {...rest} />;
}
const TestimonialAvatar = forwardRef(TestimonialAvatarBase);

/**
 * Testimonial link child element
 * <Testimonial.Link>
 */
function TestimonialLinkBase({ className, ...rest }: LinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) {
  return (
    <Link ref={ref} className={clsx(styles['Testimonial-link'], className)} {...rest} size='medium' variant='accent' />
  );
}
const TestimonialLink = forwardRef(TestimonialLinkBase);

/**
 * Use Testimonial to display a quote from a customer or user.
 */
export const Testimonial = Object.assign(TestimonialRoot, {
  Quote: TestimonialQuote,
  Name: TestimonialName,
  Avatar: TestimonialAvatar,
  Logo: TestimonialLogo,
  Link: TestimonialLink
});

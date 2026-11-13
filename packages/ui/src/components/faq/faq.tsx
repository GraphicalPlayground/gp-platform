// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './faq.module.css';

import { AccordionHeading, AccordionContent, AccordionRoot } from '../accordion';
import { Heading } from '../heading';
import type { HeadingProps } from '../heading';
import type { BaseProps } from '../helper';
import { isFragmentElement } from '../helper';

export type FAQRootProps = {
  variant?: 'default' | 'gridline';
} & React.PropsWithChildren<BaseProps<HTMLElement>> &
  React.HTMLAttributes<HTMLElement>;

const FAQRoot = React.forwardRef<HTMLElement, FAQRootProps>(
  ({ children, className, variant = 'default', ...rest }, ref) => {
    const filteredChildren = React.Children.toArray(children).filter((child) => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (
          isFragmentElement(child) ||
          (child as React.ReactElement).type === FAQHeading ||
          (child as React.ReactElement).type === FAQSubheading ||
          (child as React.ReactElement).type === AccordionRoot
        ) {
          return true;
        }
      }

      return false;
    });

    const hasSubheading = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && typeof child.type !== 'string' && child.type === FAQSubheading
    );

    return (
      <section
        ref={ref}
        className={clsx(styles.faq, styles[`faq--variant-${variant}` as keyof typeof styles], className)}
        {...rest}
      >
        {React.Children.toArray(filteredChildren).map((child, index) => {
          if (React.isValidElement<FAQHeadingProps>(child) && child.type === FAQHeading) {
            const clonedChild = React.cloneElement(child, {
              align: hasSubheading ? 'start' : child.props.align,
              size: hasSubheading ? '3' : child.props.size,
              weight: hasSubheading ? 'medium' : child.props.weight
            });

            if (variant === 'gridline') {
              return (
                <div key={child.key ?? index} className={styles[`faq__heading-wrapper--${variant}`]}>
                  {clonedChild}
                </div>
              );
            }

            return clonedChild;
          }

          const otherChild = child;

          return variant === 'gridline' ? (
            <div key={index} className={styles[`faq__content-wrapper--${variant}`]}>
              {otherChild}
            </div>
          ) : (
            otherChild
          );
        })}
      </section>
    );
  }
);

type FAQHeadingProps = BaseProps<HTMLHeadingElement> & {
  align?: 'start' | 'center';
  children: React.ReactNode | React.ReactNode[];
  as?: HeadingProps['as'];
} & HeadingProps;

const FAQHeading = React.forwardRef<HTMLHeadingElement, FAQHeadingProps>(
  ({ align = 'center', as, children, className, size = '3', ...rest }, ref) => {
    const headingLevel = size === '3' ? 'h3' : 'h2';

    return (
      <Heading
        as={as || headingLevel}
        size={size}
        className={clsx(styles.faq__heading, styles[`faq__heading--${align}`], className)}
        ref={ref}
        {...rest}
      >
        {children}
      </Heading>
    );
  }
);

export type FAQSubheadingProps = BaseProps<HTMLHeadingElement> & {
  align?: 'start' | 'center';
  children: React.ReactNode | React.ReactNode[];
  as?: Exclude<HeadingProps['as'], 'h1'>;
} & HeadingProps;

const FAQSubheading: React.FC<FAQSubheadingProps> = ({
  as = 'h3',
  children,
  className,
  font = 'monospace',
  size = 'subhead-medium',
  weight = 'medium',
  ...rest
}) => {
  return (
    <Heading
      as={as}
      className={clsx(styles.faq__subheading, className)}
      weight={weight}
      size={size}
      font={font}
      {...rest}
    >
      {children}
    </Heading>
  );
};

/**
 * @brief FAQ component:
 */
export const FAQ = Object.assign(FAQRoot, {
  Subheading: FAQSubheading,
  Heading: FAQHeading,
  Item: AccordionRoot,
  Question: AccordionHeading,
  Answer: AccordionContent
});

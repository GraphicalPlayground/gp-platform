// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './newsletter.module.css';
import { Text, Heading, BrandIcon, Link } from '..';
import NextLink from 'next/link';

/**
 * @brief Newsletter component props interface.
 * @see Newsletter
 */
export interface NewsletterProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  logoAriaLabel: string;
  logoHref: string;
}

/**
 * @brief Newsletter component.
 * @details The Newsletter component is a React functional component that renders a newsletter subscription section. It includes a heading, description, call-to-action button, and a logo link. The component accepts various props to customize its content and behavior.
 */
export const Newsletter: React.FC<NewsletterProps> = ({
  className,
  ctaHref,
  ctaLabel,
  description,
  heading,
  logoAriaLabel,
  logoHref,
  ...rest
}) => {
  return (
    <section className={clsx(styles['newsletter'], className)} {...rest} aria-labelledby='subscribe-to-newsletter'>
      <NextLink href={logoHref} className={styles['logo-link']} aria-label={logoAriaLabel}>
        <BrandIcon variant='short' style={{ height: 'var(--gp-size-32)' }} className={styles.logo} />
      </NextLink>

      <Heading as='h3' size='6' font='monospace' className={styles.heading} id='subscribe-to-newsletter'>
        <span className={styles['heading-dot']} aria-hidden='true' />
        {heading}
      </Heading>

      <Text as='p' size='200' variant='muted' className={styles.description}>
        {description}
      </Text>

      <Link as='a' href={ctaHref} variant='accent' size='large' arrowDirection='end' className={styles.cta}>
        {ctaLabel}
      </Link>

      {/* <Button as='a' href={ctaHref} variant='primary' size='small' className={styles.cta}>
        {ctaLabel}
      </Button> */}
    </section>
  );
};

/** Set the display name for the Newsletter component. */
Newsletter.displayName = 'gp.Newsletter';

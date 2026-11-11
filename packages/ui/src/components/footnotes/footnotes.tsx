// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './footnotes.module.css';

import { Heading } from '../heading';
import { Text } from '../text';
import { InlineLink } from '../inline-link';
import type { BaseProps } from '../helper';
import { getTextContent } from '../helper';
import { ReplyIcon } from '@primer/octicons-react';

export const FootnotesTags = ['div', 'ol'] as const;

type FootnotesRestrictedPolymorphism =
  | (React.HTMLAttributes<HTMLDivElement> & BaseProps<HTMLDivElement> & { as?: 'div' })
  | (React.HTMLAttributes<HTMLParagraphElement> & BaseProps<HTMLOListElement> & { as?: 'ol' });

/**
 * @brief Footnotes component props interface.
 * @see FootnotesRoot
 */
export type FootnotesProps = {
  as?: (typeof FootnotesTags)[number];
  visuallyHiddenHeading?: string;
} & FootnotesRestrictedPolymorphism;

/**
 * @brief Footnotes component.
 * @details
 */
const FootnotesRoot: React.FC<FootnotesProps> = ({
  as = 'ol',
  children,
  className,
  visuallyHiddenHeading = 'Footnotes',
  ...rest
}) => {
  const memoizedChildren = React.useMemo(() => React.Children.toArray(children), [children]);

  if (as === 'div') {
    const filteredChildren = memoizedChildren.map((child) => {
      if (React.isValidElement<FootnotesItemProps>(child) && child.type === FootnotesItem) {
        return React.cloneElement(child, {
          _variant: 'disclaimer',
          ...child.props
        });
      }

      return null;
    });

    return (
      <>
        <Heading className='visually-hidden' as='h2' id='footnote-label'>
          {visuallyHiddenHeading}
        </Heading>
        <div
          className={clsx(styles.footnotes, styles['footnotes--variant-disclaimer'], className)}
          {...(rest as BaseProps<HTMLDivElement>)}
        >
          {filteredChildren}
        </div>
      </>
    );
  }

  return (
    <>
      <Heading className='visually-hidden' as='h2' id='footnote-label'>
        {visuallyHiddenHeading}
      </Heading>
      <ol
        className={clsx(styles.footnotes, styles['footnotes--variant-citations'], className)}
        {...(rest as BaseProps<HTMLOListElement>)}
      >
        {children}
      </ol>
    </>
  );
};

/** Set the display name for the FootnotesRoot component. */
FootnotesRoot.displayName = 'gp.Footnotes';

export const FootnotesItemTags = ['a', 'p'] as const;

type DefaultFootnotesItemProps = {
  _variant?: 'disclaimer';
};

type CitationFootnotesItemProps = {
  _variant?: 'citation';
  href?: string;
};

export type FootnotesItemProps = (DefaultFootnotesItemProps | CitationFootnotesItemProps) &
  React.HTMLAttributes<HTMLParagraphElement> &
  BaseProps<HTMLParagraphElement>;

const FootnotesItem: React.FC<FootnotesItemProps> = ({ _variant = 'citation', children, className, ...rest }) => {
  if (_variant === 'disclaimer') {
    return (
      <Text as='p' variant='muted' size='100' className={clsx(styles['footnotes-item'], className)}>
        {children}
      </Text>
    );
  }

  const { href, ...restWithoutHref } = rest as CitationFootnotesItemProps;

  return (
    <li className={clsx(styles['footnotes-item'], className)} {...(restWithoutHref as CitationFootnotesItemProps)}>
      <Text as='p' variant='muted' size='100' className={clsx(styles['footnotes-item__citation-text'])}>
        {children}
        {href && (
          <InlineLink href={href} aria-label={`Back to content ${getTextContent(children)}`}>
            <ReplyIcon className={styles['footnotes-item__citation-icon']} />
          </InlineLink>
        )}
      </Text>
    </li>
  );
};

/** Set the display name for the FootnotesItem component. */
FootnotesItem.displayName = 'gp.FootnotesItem';

/**
 * @brief Footnotes component.
 */
export const Footnotes = Object.assign(FootnotesRoot, {
  Root: FootnotesRoot,
  Item: FootnotesItem
});

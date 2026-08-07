// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './accordion.module.css';

import { Heading } from '../heading';
import type { HeadingProps } from '../heading';
import { TriangleDownIcon } from '@primer/octicons-react';
import { colors, biColorGradients as gradients } from '../constants';
import { useProvidedRefOrCreate } from '@gp/ui/hooks';

/**
 * @brief Accordion component props interface.
 * @see Accordion
 */
export interface AccordionProps extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
  children: React.ReactElement<AccordionHeadingProps | AccordionContentProps>[];
  variant?: 'default' | 'emphasis';
  disableAnimation?: boolean;
  handleOpen?: (isOpen: boolean) => void;
}

type AccordionContextType = {
  variant: 'default' | 'emphasis';
};

const AccordionContext = React.createContext<AccordionContextType | null>(null);

const useAccordionContext = (): AccordionContextType => {
  const context = React.useContext(AccordionContext);

  if (context === null) {
    throw new Error('Unable to find Accordion provider. Did you forget to wrap your component in an Accordion?');
  }

  return context;
};

/**
 * @brief Accordion component.
 * @details
 */
export const AccordionRoot = React.forwardRef<HTMLDetailsElement, AccordionProps>(
  (
    {
      children,
      className,
      disableAnimation = false,
      handleOpen,
      onClick,
      onKeyDown,
      onToggle,
      open,
      variant = 'default',
      ...rest
    },
    forwardedRef
  ) => {
    const ref = useProvidedRefOrCreate(forwardedRef as React.RefObject<HTMLDetailsElement | null>);
    const closeAnimationTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const isClosingRef = React.useRef(false);
    const accordionContextValue = React.useMemo(() => ({ variant }), [variant]);

    const setContentHeight = React.useCallback((details: HTMLDetailsElement) => {
      const content = details.querySelector<HTMLElement>(`:scope > .${styles.accordion__content}`);
      const contentInner = content?.querySelector<HTMLElement>(`.${styles['accordion__content-inner']}`);

      if (!content || !contentInner) {
        return null;
      }

      const contentOffset = parseFloat(getComputedStyle(content).getPropertyValue('--gp-accordion-content-offset'));
      const contentHeight = Math.max(0, contentInner.scrollHeight - (Number.isNaN(contentOffset) ? 0 : contentOffset));

      details.style.setProperty('--gp-accordion-content-height', `${contentHeight}px`);

      return content;
    }, []);

    const clearCloseAnimation = React.useCallback(() => {
      if (closeAnimationTimeout.current) {
        clearTimeout(closeAnimationTimeout.current);
        closeAnimationTimeout.current = null;
      }
    }, []);

    const closeWithAnimation = React.useCallback(
      (details: HTMLDetailsElement) => {
        clearCloseAnimation();
        const reducedMotionQuery =
          typeof window !== 'undefined' && typeof window.matchMedia === 'function'
            ? window.matchMedia('(prefers-reduced-motion: reduce)')
            : null;
        const prefersReducedMotion = reducedMotionQuery !== null && reducedMotionQuery.matches;

        if (prefersReducedMotion) {
          details.open = false;
          isClosingRef.current = false;
          details.classList.remove(styles['accordion--closing']);

          return;
        }

        const content = setContentHeight(details);

        if (content) {
          content.getBoundingClientRect();
        }

        isClosingRef.current = true;
        details.classList.add(styles['accordion--closing']);

        closeAnimationTimeout.current = setTimeout(() => {
          details.open = false;
          isClosingRef.current = false;
          details.classList.remove(styles['accordion--closing']);
          closeAnimationTimeout.current = null;
        }, 300);
      },
      [clearCloseAnimation, setContentHeight]
    );

    const handleToggle = React.useCallback<(event: Event) => void>(
      (event) => {
        const toggleEvent = event as unknown as React.ToggleEvent<HTMLDetailsElement>;

        if (toggleEvent.currentTarget.open) {
          clearCloseAnimation();
          isClosingRef.current = false;
          toggleEvent.currentTarget.classList.remove(styles['accordion--closing']);
          setContentHeight(toggleEvent.currentTarget);
        }
        onToggle?.(toggleEvent);
        handleOpen?.(toggleEvent.currentTarget.open);
      },
      [clearCloseAnimation, onToggle, handleOpen, setContentHeight]
    );

    const handleClick = React.useCallback<React.MouseEventHandler<HTMLDetailsElement>>(
      (event) => {
        onClick?.(event);

        if (event.defaultPrevented || disableAnimation) {
          return;
        }

        const details = event.currentTarget;
        const target = event.target;

        if (!(target instanceof Element) || !details.open) {
          return;
        }

        const summary = target.closest('summary');

        if (summary?.parentElement === details) {
          event.preventDefault();

          if (!isClosingRef.current) {
            closeWithAnimation(details);
          }
        }
      },
      [closeWithAnimation, disableAnimation, onClick]
    );

    const handleKeyDown = React.useCallback<EventListener>(
      (event) => {
        const keyboardEvent = event as unknown as React.KeyboardEvent<HTMLDetailsElement>;

        onKeyDown?.(keyboardEvent);

        const details = ref.current;

        if (keyboardEvent.key === 'Escape' && details?.open) {
          clearCloseAnimation();
          details.open = false;
          isClosingRef.current = false;
          details.classList.remove(styles['accordion--closing']);
          details.querySelector('summary')?.focus();
        }
      },
      [clearCloseAnimation, onKeyDown, ref]
    );

    React.useEffect(() => {
      const detailsElement = ref.current;

      if (detailsElement) {
        const contentInner = detailsElement.querySelector<HTMLElement>(`.${styles['accordion__content-inner']}`);
        let resizeObserver: ResizeObserver | undefined;

        if (detailsElement.open) {
          setContentHeight(detailsElement);
        }

        if (typeof ResizeObserver !== 'undefined' && contentInner) {
          resizeObserver = new ResizeObserver(() => {
            if (detailsElement.open) {
              setContentHeight(detailsElement);
            }
          });
          resizeObserver.observe(contentInner);
        }

        detailsElement.addEventListener('toggle', handleToggle);
        detailsElement.addEventListener('keydown', handleKeyDown);

        return () => {
          clearCloseAnimation();
          resizeObserver?.disconnect();
          detailsElement.removeEventListener('toggle', handleToggle);
          detailsElement.removeEventListener('keydown', handleKeyDown);
        };
      }
    }, [clearCloseAnimation, handleToggle, handleKeyDown, ref, setContentHeight]);

    return (
      <AccordionContext.Provider value={accordionContextValue}>
        <details
          className={clsx(
            styles.accordion,
            styles[`accordion--${variant}`],
            disableAnimation && styles['accordion--disable-animation'],
            className
          )}
          ref={ref}
          open={open}
          {...rest}
          onClick={handleClick}
        >
          {children}
        </details>
      </AccordionContext.Provider>
    );
  }
);

/** Set the display name for the Accordion component. */
AccordionRoot.displayName = 'gp.Accordion';

export const AccordionToggleColors = [...colors, ...gradients] as const;

export interface AccordionHeadingProps extends React.HTMLAttributes<HTMLElement> {
  as?: HeadingProps['as'];
  reversedToggles?: boolean;
  toggleColor?: (typeof AccordionToggleColors)[number];
  weight?: HeadingProps['weight'];
}

export const AccordionHeading = React.forwardRef<HTMLHeadingElement, AccordionHeadingProps>(
  ({ as = 'h4', children, className, reversedToggles, toggleColor, weight = 'normal', ...rest }, ref) => {
    const { variant } = useAccordionContext();

    return (
      <summary
        className={clsx(
          styles.accordion__summary,
          reversedToggles && styles['accordion__summary--reversed-toggles'],
          styles[`accordion__summary--${variant}`],
          toggleColor && styles[`accordion__summary--toggle-color-${toggleColor}`],
          className
        )}
        ref={ref}
        {...rest}
      >
        <span aria-hidden='true' className={styles['accordion__summary-toggle']}>
          <TriangleDownIcon className={styles['accordion__summary-toggle-icon']} size={22} />
        </span>
        <Heading as={as} size={variant === 'emphasis' ? '6' : 'subhead-large'} weight={weight}>
          {children}
        </Heading>
      </summary>
    );
  }
);

AccordionHeading.displayName = 'gp.Accordion.Heading';

export type AccordionContentProps = React.HTMLAttributes<HTMLElement>;

export const AccordionContent: React.FC<AccordionContentProps> = ({ children, className, ...rest }) => (
  <section className={clsx(styles.accordion__content, className)} {...rest}>
    <div className={styles['accordion__content-inner']}>{children}</div>
  </section>
);

AccordionContent.displayName = 'gp.Accordion.Content';

/**
 * @brief Accordion component.
 */
export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Content: AccordionContent,
  Heading: AccordionHeading
});

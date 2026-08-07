// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './logo-suite.module.css';

import { PauseIcon, PlayIcon } from '@primer/octicons-react';
import type { BaseProps } from '../helper';
import { Heading, defaultHeadingTag } from '../heading';
import { Text } from '../text';
import { Grid } from '../grid';
import { Button } from '../button';
import type { HeadingProps } from '../heading';
import type { TextProps } from '../text';
import { useReducedMotion } from '@gp/ui/hooks';

/**
 * @brief LogoSuite component props interface.
 * @see LogoSuite
 */
export type LogoSuiteProps = {
  /**
   * @brief The horizontal alignment of the LogoSuite.
   */
  align?: 'start' | 'center' | 'justify';

  /**
   * @brief Whether to render a divider immediately after the LogoSuite.
   */
  hasDivider?: boolean;

  /**
   * @brief Alternative presentation
   */
  variant?: 'default' | 'gridline-expressive';
} & BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>;

/**
 * @brief LogoSuite component.
 * @details
 */
export const LogoSuiteRoot: React.FC<React.PropsWithChildren<LogoSuiteProps>> = ({
  align = 'center',
  children,
  className,
  hasDivider = true,
  variant = 'default',
  ...rest
}) => {
  const childrenArray = React.useMemo(() => React.Children.toArray(children), [children]);

  const HeadingChild = childrenArray.find((child) => {
    return React.isValidElement(child) && child.type === LogoSuiteHeading;
  });

  const DescriptionChild = childrenArray.find((child) => {
    return React.isValidElement(child) && child.type === LogoSuiteDescription;
  });

  const LogobarChild = childrenArray.find((child) => {
    return React.isValidElement(child) && child.type === LogoSuiteLogobar;
  });

  if (!HeadingChild) {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      // eslint-disable-next-line no-console
      console.warn('LogoSuite: Heading child is required. You may use `visuallyHidden` to hide it from view.');
    }
  }

  const isHeadingVisuallyHidden =
    React.isValidElement<LogoSuiteHeadingProps>(HeadingChild) && HeadingChild.props.visuallyHidden;
  const isGridlineExpressive = variant === 'gridline-expressive';
  const hasVisibleTextContent =
    isGridlineExpressive && ((HeadingChild && !isHeadingVisuallyHidden) || DescriptionChild);

  return (
    <div
      className={clsx(
        styles['logo-suite'],
        styles[`logo-suite--${align}`],
        hasDivider && styles['logo-suite--has-divider'],
        styles[`logo-suite--${variant}`],
        className
      )}
      {...rest}
    >
      {isGridlineExpressive ? (
        <Grid className={styles['logo-suite__content']}>
          {hasVisibleTextContent && (
            <Grid.Column span={{ large: 3 }} className={styles['logo-suite__text-container']}>
              {HeadingChild}
              {DescriptionChild}
            </Grid.Column>
          )}
          <Grid.Column
            span={{ large: hasVisibleTextContent ? 9 : 12 }}
            className={styles['logo-suite__logobar-container']}
          >
            {!hasVisibleTextContent && isHeadingVisuallyHidden && HeadingChild}
            {LogobarChild}
          </Grid.Column>
        </Grid>
      ) : (
        <>
          {HeadingChild}
          {DescriptionChild}
          {LogobarChild}
        </>
      )}
    </div>
  );
};

/** Set the display name for the LogoSuite component. */
LogoSuiteRoot.displayName = 'gp.LogoSuite';

export type LogoSuiteHeadingProps = BaseProps<HTMLHeadingElement> &
  HeadingProps & {
    /**
     * Whether to visually hide the heading.
     */
    visuallyHidden?: boolean;
  };

const LogoSuiteHeading = React.forwardRef<HTMLHeadingElement, React.PropsWithChildren<LogoSuiteHeadingProps>>(
  ({ as = defaultHeadingTag, children, className, size = 'subhead-large', visuallyHidden, ...props }, ref) => {
    return (
      <Heading
        ref={ref}
        className={clsx(
          styles['logo-suite__heading'],
          visuallyHidden && styles['logo-suite__heading--visually-hidden'],
          visuallyHidden && 'visually-hidden',
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

export type LogoSuiteDescriptionProps = BaseProps<HTMLParagraphElement> &
  TextProps & {
    children: React.ReactNode | React.ReactNode[];
  };

const LogoSuiteDescription = React.forwardRef<HTMLParagraphElement, LogoSuiteDescriptionProps>(
  ({ children, className, size = '200', variant = 'muted', ...props }, ref) => {
    return (
      <Text
        as='p'
        ref={ref}
        size={size}
        variant={variant}
        className={clsx(styles['logo-suite__description'], className)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

type PlayPauseButtonProps = {
  isPlaying?: boolean;
  onPlayPause?: (isPlaying: boolean) => void;
};

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ isPlaying = true, onPlayPause }) => {
  const onClick = React.useCallback(() => {
    onPlayPause?.(!isPlaying);
  }, [onPlayPause, isPlaying]);

  /**
   * aria-pressed is intentionally not used here to prevent potentially confusing screen reader announcements
   * eg "Play animation on" or "Pause animation off"
   */
  return (
    <button
      className={styles['logo-suite__logobar-play-pause-button']}
      type='button'
      onClick={onClick}
      aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
};

export type LogoSuiteLogoBarProps = BaseProps<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
  /**
   * @brief The gap between logos
   */
  gap?: 'default' | 'condensed';

  /**
   * @brief Enables an optional marquee effect
   */
  marquee?: boolean;

  /**
   * @brief The speed of the marquee effect
   */
  marqueeSpeed?: 'slow' | 'normal' | 'idle';

  /**
   * @brief The stylistic variant of the LogoBar.
   */
  variant?: 'muted' | 'emphasis';

  /**
   * @brief Displays an optional takeover button (as an anchor) on hover/focus.
   */
  takeoverButton?: {
    label: string;
  } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> &
    BaseProps<HTMLAnchorElement>;
};

const LogoSuiteLogobar = React.forwardRef<HTMLDivElement, LogoSuiteLogoBarProps>(
  (
    {
      children,
      className,
      gap = 'default',
      marquee = false,
      marqueeSpeed = 'normal',
      takeoverButton,
      variant = 'muted',
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const [isPlaying, setIsPlaying] = React.useState(() => marquee && !prefersReducedMotion && marqueeSpeed !== 'idle');

    React.useEffect(() => {
      setIsPlaying(marquee && !prefersReducedMotion && marqueeSpeed !== 'idle');
    }, [marquee, prefersReducedMotion, marqueeSpeed]);

    if (marquee && takeoverButton) {
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        // eslint-disable-next-line no-console
        console.warn(
          'LogoSuite.Logobar: `takeoverButton` cant be used with `marquee` prop due to accessibility risks. Set `marquee={false}` to use the takeover feature.'
        );
      }
    }

    const defaultProps = {
      ref,
      className: clsx(
        styles['logo-suite__logobar'],
        styles[`logo-suite__logobar--variant-${variant}`],
        styles[`logo-suite__logobar--gap-${gap}`],
        className
      ),
      ...props
    };

    const [isFocusWithin, setIsFocusWithin] = React.useState(false);

    const handleFocus = React.useCallback(() => {
      setIsFocusWithin(true);
    }, []);

    const handleBlur = React.useCallback((event: React.FocusEvent) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
        setIsFocusWithin(false);
      }
    }, []);

    const renderTakeoverButton = () => {
      if (!takeoverButton) return null;
      const { className: takeoverButtonClassName, label, ref: _ref, ...takeoverButtonProps } = takeoverButton;

      return (
        <div className={styles['logo-suite__logobar-takeover-button-container']}>
          <Button
            as='a'
            variant='primary'
            className={clsx(
              styles['logo-suite__logobar-takeover-button' as keyof typeof styles],
              takeoverButtonClassName
            )}
            {...takeoverButtonProps}
          >
            {label}
          </Button>
        </div>
      );
    };

    if (marquee) {
      const { className: marqueeDefaultClassName, ...restProps } = defaultProps;
      const shouldPause = !isPlaying || prefersReducedMotion;

      return (
        <div
          {...restProps}
          className={clsx(
            styles['logo-suite__logobar--has-marquee'],
            marqueeDefaultClassName,
            shouldPause && styles['logo-suite__logobar--paused']
          )}
        >
          <div
            className={clsx(
              styles['logo-suite__logobar-marquee'],
              isFocusWithin && styles['logo-suite__logobar-marquee--focused']
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <div
              className={clsx(
                styles['logo-suite__logobar-marquee-group'],
                styles[`logo-suite__logobar-marquee-group--speed-${marqueeSpeed}` as keyof typeof styles]
              )}
            >
              {children}
            </div>
            <div
              inert
              aria-hidden='true'
              className={clsx(
                styles['logo-suite__logobar-marquee-group'],
                styles[`logo-suite__logobar-marquee-group--speed-${marqueeSpeed}` as keyof typeof styles]
              )}
            >
              {children}
            </div>
          </div>
          <PlayPauseButton onPlayPause={setIsPlaying} isPlaying={isPlaying} />
        </div>
      );
    }

    if (takeoverButton) {
      const { className: defaultClassName, ...restProps } = defaultProps;

      return (
        <div {...restProps} className={clsx(defaultClassName, styles['logo-suite__logobar--has-takeover'])}>
          {children}
          {renderTakeoverButton()}
        </div>
      );
    }

    return <div {...defaultProps}>{children}</div>;
  }
);

/**
 * Use LogoSuite to present a list of logos, such as sponsors or vendors.
 */
export const LogoSuite = Object.assign(LogoSuiteRoot, {
  Heading: LogoSuiteHeading,
  Description: LogoSuiteDescription,
  Logobar: LogoSuiteLogobar,
  Root: LogoSuiteRoot
});

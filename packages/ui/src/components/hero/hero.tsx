// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { forwardRef, Fragment, useMemo } from 'react';
import clsx from 'clsx';
import { Grid } from '../grid';
import { Stack } from '../stack';
import { Box } from '../box';
import type { BaseProps } from '../helper';

import { HeroContext, HeroMediaInlinePositionOptions } from './hero-context';
import type { HeroMediaInlinePosition, HeroAlign, HeroVariant } from './hero-context';
import {
  HeroLabel,
  HeroHeading,
  HeroDescription,
  HeroButtonGroup,
  HeroImage,
  HeroVideo,
  HeroEyebrow,
  HeroPrimaryAction,
  HeroSecondaryAction
} from './components';
import type { HeroImageProps, HeroVideoProps } from './components';

import styles from './hero.module.css';

const testIds = {
  root: 'Hero',
  get video() {
    return `${this.root}-video`;
  },
  get grid() {
    return `${this.root}-grid`;
  },
  get imageWrapper() {
    return `${this.root}-imageWrapper`;
  }
};

export type HeroProps = BaseProps<HTMLElement> & {
  'align'?: HeroAlign;
  'imageContainerClassName'?: string;
  'imageContainerStyle'?: React.CSSProperties;
  'imageContainerRef'?: React.RefObject<HTMLDivElement | null>;
  'imageBackgroundColor'?: 'default' | 'subtle';
  'variant'?: HeroVariant;
  'enableAnimation'?: boolean;
  /**
   * Escape-hatch for inserting custom React components.
   * Warning:
   *   This prop isn't advertised in our docs but remains part of the public API for edge-cases.
   *   Need to use this prop? Please check in with #primer-brand first to confirm correct usage.
   */
  'trailingComponent'?: React.FunctionComponent;
  'data-testid'?: string;
};

const Root = forwardRef<HTMLElement, React.PropsWithChildren<HeroProps>>(
  (
    {
      className,
      'align': alignProp = 'start',
      children,
      imageContainerClassName,
      imageContainerStyle,
      imageContainerRef,
      imageBackgroundColor,
      variant = 'default',
      'trailingComponent': TrailingComponent,
      enableAnimation = false,
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    const {
      HeroActions,
      HeroButtonGroupChild,
      HeroChildren,
      HeroImageChild,
      HeroVideoChild,
      HeroHeaderChildren,
      HeroDescriptionChild
    } = useMemo(() => {
      const result = React.Children.toArray(children).reduce<{
        HeroActions: React.ReactElement[];
        HeroButtonGroupChild?: React.ReactElement;
        HeroImageChild?: React.ReactElement<HeroImageProps>;
        HeroVideoChild?: React.ReactElement<HeroVideoProps>;
        HeroChildren: React.ReactElement[];
        HeroHeaderChildren: React.ReactElement[];
        HeroDescriptionChild?: React.ReactElement;
      }>(
        (acc, child) => {
          if (React.isValidElement(child)) {
            if (child.type === HeroPrimaryAction || child.type === HeroSecondaryAction) {
              acc.HeroActions.push(child);
            } else if (child.type === HeroButtonGroup) {
              acc.HeroButtonGroupChild = child;
            } else if (child.type === HeroImage) {
              acc.HeroImageChild = child as React.ReactElement<HeroImageProps>;
            } else if (child.type === HeroVideo) {
              acc.HeroVideoChild = child as React.ReactElement<HeroVideoProps>;
            } else {
              acc.HeroChildren.push(child);
              if (child.type === HeroLabel || child.type === HeroEyebrow || child.type === HeroHeading) {
                acc.HeroHeaderChildren.push(child);
              } else if (child.type === HeroDescription) {
                acc.HeroDescriptionChild = child;
              }
            }
          }

          return acc;
        },
        {
          HeroActions: [],
          HeroButtonGroupChild: undefined,
          HeroChildren: [],
          HeroImageChild: undefined,
          HeroVideoChild: undefined,
          HeroHeaderChildren: [],
          HeroDescriptionChild: undefined
        }
      );

      // Prefer Hero.Image - don't show both
      if (result.HeroImageChild && result.HeroVideoChild) {
        result.HeroVideoChild = undefined;
      }

      return result;
    }, [children]);

    const mediaPositionProp = HeroImageChild?.props.position || HeroVideoChild?.props.position;

    const mediaPosition = (() => {
      if (variant === 'gridline-expressive' && mediaPositionProp?.startsWith('inline-')) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.warn(
            `Hero: "gridline-expressive" variant does not support "${mediaPositionProp}" position. Defaulting to "block-end".`
          );
        }

        return 'block-end';
      }

      return mediaPositionProp || 'block-end';
    })();
    const mediaWrapperHasBorder = HeroImageChild?.props.enableBorder ?? HeroVideoChild?.props.enableBorder ?? true;
    const mediaPadding = HeroImageChild?.props.padding ?? HeroVideoChild?.props.padding ?? 'default';
    const hasInlineMedia = HeroMediaInlinePositionOptions.includes(mediaPosition as HeroMediaInlinePosition);
    const mediaChild = HeroImageChild || HeroVideoChild;
    const isGridline = variant === 'gridline';
    const isGridlineExpressive = variant === 'gridline-expressive';
    const isBlockEndPosition = mediaPosition === 'block-end';

    if (
      variant === 'default' &&
      mediaPadding !== 'default' &&
      (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        `Hero: media padding is only supported by the "gridline" and "gridline-expressive" variants; ignoring padding="${mediaPadding}".`
      );
    }

    const isInvalidGridlineAlignment = isGridlineExpressive && alignProp === 'center';
    const align: HeroAlign = isInvalidGridlineAlignment ? 'start' : alignProp;

    if (isInvalidGridlineAlignment && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
      // eslint-disable-next-line no-console
      console.warn('Hero: the "gridline-expressive" variant does not support align="center"; using "start" instead.');
    }

    const Tag = /* (isGridline || isGridlineExpressive) && enableAnimation ? AnimationProvider : */ Fragment;
    const tagProps =
      (isGridline || isGridlineExpressive) && enableAnimation
        ? {
            autoStaggerChildren: false,
            animationTrigger: 'immediate' as const
          }
        : {};

    const useContainedLayout = (isGridline || isGridlineExpressive) && isBlockEndPosition;
    const useInlineGridline = isGridline && hasInlineMedia;

    const heroLayoutClass = HeroImageChild
      ? styles['hero--layout-image' as keyof typeof styles]
      : styles['hero--layout-default' as keyof typeof styles];
    const isInlineStart = mediaPosition === 'inline-start';

    const renderTrailingComponent = (/* shouldAnimate: boolean */) =>
      TrailingComponent && (
        <Box /* animate={shouldAnimate ? { variant: 'slide-in-up' as const, delay: 1000, duration: 1000 } : undefined} */
        >
          <div className={styles['hero-trailing']}>
            <TrailingComponent />
          </div>
        </Box>
      );

    const renderActions = () => (
      <>
        {HeroButtonGroupChild}
        {HeroActions.length > 0 && <div className={styles['hero-actions']}>{HeroActions}</div>}
      </>
    );

    return (
      <Tag {...tagProps}>
        <HeroContext.Provider value={{ imagePosition: mediaPosition, variant, align, hasInlineMedia, enableAnimation }}>
          <section
            className={clsx(
              styles.hero,
              styles[`hero--variant-${variant}`],
              !hasInlineMedia && styles[`hero--align-${align}`],
              heroLayoutClass,
              (HeroImageChild || HeroVideoChild) && styles[`hero--image-pos-${mediaPosition}` as keyof typeof styles],
              (HeroImageChild || HeroVideoChild) && hasInlineMedia && styles['hero--image-pos-inline'],
              useInlineGridline && styles['hero--variant-inline-gridline'],
              className
            )}
            ref={ref}
            aria-labelledby='hero-section-brand-heading'
            data-testid={testId || testIds.root}
            {...rest}
          >
            <Grid
              fullWidth={!useContainedLayout && !useInlineGridline}
              data-testid={testIds.grid}
              className={clsx(
                styles['hero-grid'],
                styles[`hero-grid--${mediaPosition}` as keyof typeof styles],
                useContainedLayout && !isGridlineExpressive && styles['hero-grid--contained'],
                useInlineGridline && styles['hero-grid--bordered-inline'],
                isGridlineExpressive && styles['hero-grid--expressive']
              )}
            >
              {isGridlineExpressive ? (
                <>
                  {/* Expressive variant: header column (left) */}
                  <Grid.Column
                    span={{ medium: 12, large: HeroDescriptionChild ? 7 : 6 }}
                    className={styles['hero-expressive-header-column']}
                  >
                    <Stack direction='vertical' gap='none' padding='none' alignItems='flex-start'>
                      {HeroHeaderChildren}
                    </Stack>
                  </Grid.Column>
                  {/* Expressive variant: body column (right) */}
                  <Grid.Column
                    span={{ medium: 12, large: HeroDescriptionChild ? 5 : 6 }}
                    className={styles['hero-expressive-body-column']}
                  >
                    <Stack direction='vertical' gap='none' padding='none' alignItems='flex-start'>
                      {HeroDescriptionChild}
                      {renderActions()}
                      {renderTrailingComponent(/* enableAnimation */)}
                    </Stack>
                  </Grid.Column>
                </>
              ) : (
                <>
                  {/* Standard GridLine variant: text column */}
                  {isInlineStart && mediaChild && !useContainedLayout && (
                    <Grid.Column
                      ref={imageContainerRef}
                      span={{ large: 6 }}
                      className={clsx(
                        imageBackgroundColor &&
                          mediaPadding !== 'none' &&
                          styles[`hero-image-container--bg-${imageBackgroundColor}` as keyof typeof styles],
                        useInlineGridline &&
                          mediaPadding === 'all' &&
                          styles['hero-image-container--inline-padding-all'],
                        useInlineGridline &&
                          mediaPadding === 'none' &&
                          styles['hero-image-container--inline-padding-none'],
                        useInlineGridline && styles['hero-image-container--inline-bordered']
                      )}
                    >
                      <div
                        className={clsx(styles['hero-media-container'], imageContainerClassName)}
                        style={imageContainerStyle}
                      >
                        {mediaChild}
                      </div>
                    </Grid.Column>
                  )}
                  <Grid.Column span={{ large: mediaChild && hasInlineMedia ? 6 : 12 }}>
                    <Stack
                      className={clsx(
                        useInlineGridline && styles['hero-text-column--inline-gridline'],
                        useInlineGridline && styles['hero-content-column--bordered-inline']
                      )}
                      direction='vertical'
                      gap='none'
                      padding='none'
                      alignItems={hasInlineMedia ? 'flex-start' : align === 'start' ? 'flex-start' : 'center'}
                      justifyContent={hasInlineMedia ? undefined : align === 'start' ? 'flex-start' : 'center'}
                    >
                      {HeroChildren}
                      {renderActions()}
                      {renderTrailingComponent(/* isGridline && enableAnimation */)}
                    </Stack>
                  </Grid.Column>
                  {!isInlineStart && mediaChild && !useContainedLayout && (
                    <Grid.Column
                      ref={imageContainerRef}
                      span={{ large: hasInlineMedia ? 6 : 12 }}
                      className={clsx(
                        imageBackgroundColor &&
                          mediaPadding !== 'none' &&
                          styles[`hero-image-container--bg-${imageBackgroundColor}` as keyof typeof styles],
                        useInlineGridline &&
                          mediaPadding === 'all' &&
                          styles['hero-image-container--inline-padding-all'],
                        useInlineGridline &&
                          mediaPadding === 'none' &&
                          styles['hero-image-container--inline-padding-none'],
                        useInlineGridline && styles['hero-image-container--inline-bordered']
                      )}
                    >
                      <div
                        className={clsx(styles['hero-media-container'], imageContainerClassName)}
                        style={imageContainerStyle}
                      >
                        {mediaChild}
                      </div>
                    </Grid.Column>
                  )}
                </>
              )}
            </Grid>
            {mediaChild && useContainedLayout && (
              <div
                ref={imageContainerRef}
                data-testid={testIds.imageWrapper}
                className={clsx(
                  styles['hero-image-wrapper'],
                  imageContainerClassName,
                  imageBackgroundColor &&
                    mediaPadding !== 'none' &&
                    styles[`hero-image-wrapper--bg-${imageBackgroundColor}` as keyof typeof styles],
                  mediaPadding === 'none' && styles['hero-image-wrapper--padding-none']
                )}
                style={imageContainerStyle}
              >
                <div
                  className={clsx(
                    styles['hero-image-wrapper-inner'],
                    mediaPadding === 'all' && styles['hero-image-wrapper-inner--padding-all'],
                    mediaPadding === 'none' && styles['hero-image-wrapper-inner--padding-none'],
                    mediaWrapperHasBorder && styles['hero-image-wrapper-inner--with-gridline']
                  )}
                >
                  {mediaChild}
                </div>
              </div>
            )}
          </section>
        </HeroContext.Provider>
      </Tag>
    );
  }
);

export const Hero = Object.assign(Root, {
  Heading: HeroHeading,
  Description: HeroDescription,
  ButtonGroup: HeroButtonGroup,

  PrimaryAction: HeroPrimaryAction,
  SecondaryAction: HeroSecondaryAction,
  Image: HeroImage,
  Video: HeroVideo,
  Label: HeroLabel,
  Eyebrow: HeroEyebrow,
  testIds
});

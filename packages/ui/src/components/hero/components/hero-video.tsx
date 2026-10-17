// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { BaseProps } from '../../helper';
import type { HeroMediaPadding, HeroMediaPosition } from '../hero-context';
import { useProvidedRefOrCreate } from '../../../hooks';

import styles from '../hero.module.css';
import { Box } from '../../box';
import { Image } from '../../image';
import { Text } from '../../text';
import { MarkGithubIcon, PlayIcon } from '@primer/octicons-react';

type HeroVideoBaseProps = {
  'position'?: HeroMediaPosition;
  /**
   * Controls the padding around media in gridline layouts. `default` preserves the padding recommended for the position.
   */
  'padding'?: HeroMediaPadding;
  'enableBorder'?: boolean;
  'data-testid'?: string;
} & React.PropsWithChildren<BaseProps<HTMLDivElement>>;

// discriminated union to ensure that if one poster* prop is set, all are required
type PosterProps =
  | { poster?: never; posterAltText?: never; posterTitle?: never }
  | { poster: string; posterAltText: string; posterTitle: string };

export type HeroVideoProps = HeroVideoBaseProps & PosterProps;

export const HeroVideo = forwardRef<HTMLDivElement, HeroVideoProps>(
  (
    {
      className,
      children,
      position = 'block-end',
      padding = 'default',
      poster,
      posterTitle,
      posterAltText,
      'data-testid': testId,
      ...rest
    }: HeroVideoProps,
    ref
  ) => {
    const [showVideo, setShowVideo] = React.useState(poster ? false : true);
    const containerRef = useProvidedRefOrCreate(ref as React.RefObject<HTMLDivElement>);
    const isInlinePosition = position.startsWith('inline');

    const mediaClasses = clsx(
      styles['hero-video'],
      styles['hero-media'],
      styles[`hero-media--pos-${position}`],
      isInlinePosition && styles['hero-media--pos-inline'],
      padding === 'all' && styles['hero-media--padding-all'],
      padding === 'none' && styles['hero-media--padding-none'],
      className
    );

    const handlePosterClick = () => setShowVideo(true);

    const videoContent = (
      <div className={mediaClasses} ref={containerRef} data-testid={testId || 'Hero-video'} {...rest}>
        {children}
      </div>
    );

    if (showVideo) {
      return videoContent;
    }

    return (
      <PosterImage
        posterSrc={poster!}
        posterAlt={posterAltText!}
        posterTitle={posterTitle!}
        onClick={handlePosterClick}
        className={mediaClasses}
      />
    );
  }
);

type PosterImageProps = {
  posterSrc: string;
  posterAlt: string;
  posterTitle: string;
  onClick: () => void;
  className?: string;
};

function PosterImage({ posterSrc, posterAlt, posterTitle, onClick, className }: PosterImageProps) {
  return (
    <Box className={className}>
      <button aria-label='Play video' onClick={onClick} className={styles['hero-video-poster-button']}>
        <Image src={posterSrc} alt={posterAlt} className={styles['hero-video-poster-image']} />
        <PlayIcon className={styles['hero-video-poster-icon']} />
        <span className={styles['hero-video-poster-header']}>
          <MarkGithubIcon size={48} className={styles['hero-video-header-poster-icon']} />
          <Text size='300' className={styles['hero-video-poster-text']}>
            {posterTitle}
          </Text>
        </span>
      </button>
    </Box>
  );
}

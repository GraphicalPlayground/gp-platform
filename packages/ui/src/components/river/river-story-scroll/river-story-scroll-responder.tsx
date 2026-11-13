// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useEffect, useRef } from 'react';
import { useStoryScrollContext } from './river-story-scroll-provider';

import styles from './river-story-scroll.module.css';
import { clsx } from 'clsx';

type RiverStoryScrollResponderProps = {
  index: number;
  children?: React.ReactNode;
  className?: string;
  visibleClassName?: string; // Optional: A class to apply when the item is supposed to be visible
  hiddenClassName?: string; // Optional: A class to apply when the item is hidden
};

export function RiverStoryScrollResponder({
  index,
  children,
  className,
  visibleClassName = styles['tracker-in-viewport'],
  hiddenClassName = styles['tracker-outside-viewport']
}: RiverStoryScrollResponderProps) {
  const { visibilityStates } = useStoryScrollContext();
  const isVisible = visibilityStates[index];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    if (isVisible) {
      videoElement.play().catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error playing the video:', error);
      });
    } else {
      videoElement.pause();
    }
  }, [isVisible]);

  // Parse children to attach ref to video elements
  const parsedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === 'video') {
      return React.cloneElement(child, { ref: videoRef } as React.HTMLAttributes<HTMLVideoElement>);
    }

    return child;
  });

  return <div className={clsx(className, isVisible ? visibleClassName : hiddenClassName)}>{parsedChildren}</div>;
}

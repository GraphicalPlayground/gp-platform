// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';

export interface HighLightedProps extends React.HTMLAttributes<HTMLSpanElement> {
  color: string;
  animate?: boolean;
}

/**
 * @brief A component that highlights its children with a decorative background.
 */
export const HighLighted: React.FC<HighLightedProps> = ({
  children,
  className = '',
  color,
  animate = false,
  ...rest
}) => {
  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`} {...rest}>
      <span
        className='absolute -left-2 bottom-1 -z-1 h-[65%] w-[105%] -rotate-1 rounded-sm opacity-80'
        style={{
          backgroundImage: `linear-gradient(104deg, transparent 0%, ${color} 4%, ${color} 96%, transparent 100%)`,
          animation: animate ? 'draw-highlight 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards' : 'none'
        }}
      ></span>
      <span className='relative z-10'>{children}</span>
    </span>
  );
};

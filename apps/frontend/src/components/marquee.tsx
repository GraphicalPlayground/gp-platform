// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';

export interface MarqueeProps {
  brandIcons: string[];
}

export const Marquee: React.FC<MarqueeProps> = ({ brandIcons }) => {
  return (
    <div className='flex flex-row overflow-hidden w-full gap-5 h-36 relative'>
      <div className='absolute h-full left-0 bg-linear-to-r from-white to-transparent w-1/10 z-10'></div>
      <div className='flex min-w-full shrink-0 items-center justify-around gap-5 marquee-inner will-change-transform'>
        {brandIcons.map((icon, index) => (
          <img key={`brand-1-${index}`} src={icon} alt={`Brand ${index + 1}`} className='w-auto h-full opacity-80' draggable={false} />
        ))}
      </div>
      <div className='flex min-w-full shrink-0 items-center justify-around gap-5 marquee-inner will-change-transform'>
        {brandIcons.map((icon, index) => (
          <img key={`brand-2-${index}`} src={icon} alt={`Brand ${index + 1}`} className='w-auto h-full opacity-80' draggable={false} />
        ))}
      </div>
      <div className='absolute h-full right-0 bg-linear-to-l from-white to-transparent w-1/10 z-10'></div>
    </div>
  );
};

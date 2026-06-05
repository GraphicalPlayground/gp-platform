// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cn } from '@/utils/cn';

export interface FooterLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const FooterLogo: React.FC<FooterLogoProps> = ({ src, className, ...rest }) => {
  return (
    <div className='flex bg-none border-none p-0 m-0'>
      <img src={src} className={cn('h-8', className)} {...rest} />
    </div>
  );
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cn } from '@/utils/cn';

export interface FooterRootProps extends React.HTMLAttributes<HTMLElement> {}

export const FooterRoot: React.FC<FooterRootProps> = ({ children, className, ...rest }) => {
  return (
    <footer
      className={cn('bg-black text-white', className)}
      style={
        {
          '--background': '#000000',
          '--foreground': '#FFFFFF'
        } as React.CSSProperties
      }
      {...rest}
    >
      <div className='flex flex-col gap-10 pt-15.25 px-[7%] pb-7.5 max-md:gap-12.5 md:pt-8.75 md:px-[10%] md:pb-7 xl:pt-19 xl:px-[5%] xl:pb-14.25'>
        {children}
      </div>
    </footer>
  );
};

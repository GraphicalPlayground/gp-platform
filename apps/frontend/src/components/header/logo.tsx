// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { cn } from '@/utils/cn';
import React from 'react';
import { Link } from '@/components/link';

export interface HeaderLogoProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  srcFull: string;
  srcShort: string;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ srcFull, srcShort, className, ...rest }) => {
  return (
    <div className={cn('', className)} {...rest}>
      <Link href='/' className='h-full flex items-center'>
        <img src={srcFull} className='hidden xl:block shrink-0 h-6' alt='GPlayd Logo' />
        <img src={srcShort} className='block xl:hidden shrink-0 h-6' alt='GPlayd Logo' />
      </Link>
    </div>
  );
};

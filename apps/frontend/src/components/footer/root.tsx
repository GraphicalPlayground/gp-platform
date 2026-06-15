// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cn } from '@/utils/cn';
import { Link } from '@/components/link';
import { __HAS_WAITLIST__, __SIGN_IN_URL__, __WAITLIST_URL__ } from '@/utils/env';

export interface FooterRootProps extends React.HTMLAttributes<HTMLElement> {
  callToAction?: string;
}

export const FooterRoot: React.FC<FooterRootProps> = ({ children, className, callToAction, ...rest }) => {
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
      {callToAction && (
        <Link
          href={__HAS_WAITLIST__ ? __WAITLIST_URL__ : __SIGN_IN_URL__}
          className='w-full hover:no-underline no-underline font-normal'
        >
          <div className='group cursor-pointer flex justify-between w-full bg-(--gp-primary) text-black grow'>
            <h1
              className='ml-[4.5%] transition-all duration-300 group-hover:ml-[5%] flex items-center'
              style={{ fontSize: 'max(26px, 0.0425 * (var(--scaling-factor)))' }}
            >
              {callToAction}
            </h1>
            <div className='relative aspect-square bg-black w-[max(8vw,60px)] flex justify-center items-center'>
              <svg
                className='w-[50%] h-[50%]'
                width='500'
                height='500'
                viewBox='0 0 500 500'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M28.126 28.126V164.664H164.664L28.126 301.202V471.874H164.664V301.202H198.799L335.336 164.664V301.202H471.874V28.126H28.126Z'
                  stroke='white'
                  strokeWidth='6.252'
                  strokeMiterlimit='10'
                />
              </svg>
            </div>
          </div>
        </Link>
      )}
      <div className='flex flex-col gap-10 pt-15.25 px-[7%] pb-7.5 max-md:gap-12.5 md:pt-8.75 md:px-[10%] md:pb-7 xl:pt-19 xl:px-[5%] xl:pb-14.25'>
        {children}
      </div>
    </footer>
  );
};

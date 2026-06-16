// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeading,
  AccordionTrigger,
  AccordionIndicator,
  AccordionPanel
} from '@gp/react';

export interface FooterNavGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FooterNavGrid: React.FC<FooterNavGridProps> = ({ children, className, ...rest }) => {
  const [screenWidth, setScreenWidth] = React.useState<number>(0);

  React.useEffect(() => {
    const updateScreenWidth = () => setScreenWidth(window.innerWidth);
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  const breakpoint2XL = 1536;

  return (
    <AccordionRoot
      allowsMultipleExpanded
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 gap-10 min-[860px]:flex min-[860px]:flex-wrap min-[860px]:justify-between min-[860px]:gap-x-[5%] min-[860px]:gap-y-16 xl:grid xl:grid-cols-[repeat(4,auto)] xl:justify-between xl:gap-0 w-full 2xl:grid-cols-[minmax(auto,600px)_15%_minmax(auto,600px)] 2xl:grid',
        className
      )}
      {...rest}
    >
      {screenWidth < breakpoint2XL ? (
        children
      ) : (
        <>
          <div className='w-full flex justify-between'>{React.Children.toArray(children).slice(0, 2)}</div>
          <div className='w-full flex justify-center items-center'>
            <div className='h-[97%] w-px bg-[#848280]'></div>
          </div>
          <div className='w-full flex justify-between'>{React.Children.toArray(children).slice(2, 4)}</div>
        </>
      )}
    </AccordionRoot>
  );
};

export interface FooterColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const FooterColumn: React.FC<FooterColumnProps> = ({ children, className, title, ...rest }) => {
  return (
    <AccordionItem className={cn('flex flex-col border-none! after:hidden!', className)} {...rest}>
      {title && (
        <AccordionHeading className='w-full border-b border-white/25 sm:border-none'>
          <AccordionTrigger className='w-full flex justify-between items-center p-0! py-2! bg-transparent! hover:bg-transparent! sm:py-0! sm:pointer-events-none sm:cursor-default'>
            <h3 className='uppercase text-white font-medium text-sm sm:text-base'>{title}</h3>
            <AccordionIndicator className='sm:hidden! text-white' />
          </AccordionTrigger>
        </AccordionHeading>
      )}
      <div className='hidden sm:block!'>
        <ul className='border-none outline-none m-0 p-0 pt-5.5 text-white'>{children}</ul>
      </div>

      <AccordionPanel className='sm:hidden!'>
        <ul className='border-none outline-none m-0 p-0 pt-3.5 text-white'>{children}</ul>
      </AccordionPanel>
    </AccordionItem>
  );
};

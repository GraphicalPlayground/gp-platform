// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

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
  return (
    <AccordionRoot
      allowsMultipleExpanded
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 gap-10 min-[860px]:flex min-[860px]:flex-wrap min-[860px]:justify-between min-[860px]:gap-x-[5%] min-[860px]:gap-y-16 xl:grid xl:grid-cols-[repeat(4,auto)] xl:justify-between xl:gap-0 w-full',
        className
      )}
      {...rest}
    >
      {children}
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

'use client';

import type { SurfaceVariants } from '../surface';
import type { SidebarVariants } from '@gp/styles';
import type { ComponentPropsWithRef } from 'react';

import { sidebarVariants } from '@gp/styles';
import React, { createContext, useContext } from 'react';

import { composeSlotClassName } from '../../utils/compose';
import { SurfaceContext } from '../surface';

/* -------------------------------------------------------------------------------------------------
 * Sidebar Context
 * -----------------------------------------------------------------------------------------------*/
interface SidebarContext {
  slots?: ReturnType<typeof sidebarVariants>;
}

const SidebarContext = createContext<SidebarContext>({});

/* -------------------------------------------------------------------------------------------------
 * Sidebar Root
 * -----------------------------------------------------------------------------------------------*/
interface SidebarRootProps extends ComponentPropsWithRef<'div'>, SidebarVariants {}

const SidebarRoot = ({ children, className, variant = 'default', ...props }: SidebarRootProps) => {
  const slots = React.useMemo(() => sidebarVariants({ variant }), [variant]);

  const content = (
    <div className={slots.base({ className })} data-slot='sidebar' {...props}>
      {children}
    </div>
  );

  return (
    <SidebarContext value={{ slots }}>
      {variant === 'transparent' ? (
        content
      ) : (
        // Allows inner components to apply "on-surface" colors for proper contrast
        <SurfaceContext
          value={{
            variant: variant as SurfaceVariants['variant']
          }}
        >
          {content}
        </SurfaceContext>
      )}
    </SidebarContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar Header
 * -----------------------------------------------------------------------------------------------*/
interface SidebarHeaderProps extends ComponentPropsWithRef<'div'> {}

const SidebarHeader = ({ className, ...props }: SidebarHeaderProps) => {
  const { slots } = useContext(SidebarContext);

  return <div className={composeSlotClassName(slots?.header, className)} data-slot='sidebar-header' {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar Content
 * -----------------------------------------------------------------------------------------------*/
interface SidebarContentProps extends ComponentPropsWithRef<'div'> {}

const SidebarContent = ({ className, ...props }: SidebarContentProps) => {
  const { slots } = useContext(SidebarContext);

  return <div className={composeSlotClassName(slots?.content, className)} data-slot='sidebar-content' {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar Group
 * -----------------------------------------------------------------------------------------------*/
interface SidebarGroupProps extends ComponentPropsWithRef<'div'> {}

const SidebarGroup = ({ className, ...props }: SidebarGroupProps) => {
  const { slots } = useContext(SidebarContext);

  return <div className={composeSlotClassName(slots?.group, className)} data-slot='sidebar-group' {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar Footer
 * -----------------------------------------------------------------------------------------------*/
interface SidebarFooterProps extends ComponentPropsWithRef<'div'> {}

const SidebarFooter = ({ className, ...props }: SidebarFooterProps) => {
  const { slots } = useContext(SidebarContext);

  return <div className={composeSlotClassName(slots?.footer, className)} data-slot='sidebar-footer' {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export { SidebarRoot, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter };

export type { SidebarRootProps, SidebarHeaderProps, SidebarContentProps, SidebarGroupProps, SidebarFooterProps };

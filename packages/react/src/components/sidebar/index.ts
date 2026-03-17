import type { ComponentProps } from 'react';

import { SidebarContent, SidebarFooter, SidebarHeader, SidebarRoot, SidebarGroup } from './sidebar';

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Sidebar = Object.assign(SidebarRoot, {
  Root: SidebarRoot,
  Header: SidebarHeader,
  Group: SidebarGroup,
  Content: SidebarContent,
  Footer: SidebarFooter
});

export type Sidebar = {
  Props: ComponentProps<typeof SidebarRoot>;
  RootProps: ComponentProps<typeof SidebarRoot>;
  HeaderProps: ComponentProps<typeof SidebarHeader>;
  GroupProps: ComponentProps<typeof SidebarGroup>;
  ContentProps: ComponentProps<typeof SidebarContent>;
  FooterProps: ComponentProps<typeof SidebarFooter>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export { SidebarRoot, SidebarHeader, SidebarGroup, SidebarContent, SidebarFooter };

export type {
  SidebarRootProps,
  SidebarRootProps as SidebarProps,
  SidebarHeaderProps,
  SidebarGroupProps,
  SidebarContentProps,
  SidebarFooterProps
} from './sidebar';

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export { sidebarVariants } from '@gp/styles';

export type { SidebarVariants } from '@gp/styles';

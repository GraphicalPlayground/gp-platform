// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { ComponentProps } from 'react';
import { SidebarRoot } from './root';
import { SidebarNavItem, SidebarNavSection } from './navigation';

export const Sidebar = Object.assign(SidebarRoot, {
  Root: SidebarRoot,
  NavItem: SidebarNavItem,
  NavSection: SidebarNavSection
});

export type Sidebar = {
  Props: ComponentProps<typeof SidebarRoot>;
  Root: ComponentProps<typeof SidebarRoot>;
  NavItem: ComponentProps<typeof SidebarNavItem>;
  NavSection: ComponentProps<typeof SidebarNavSection>;
};

export { SidebarRoot, SidebarNavItem, SidebarNavSection };

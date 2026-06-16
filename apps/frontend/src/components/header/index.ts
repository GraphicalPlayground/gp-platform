// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { ComponentProps } from 'react';

import { HeaderActions } from './actions';
import { HeaderButton, HeaderIconButton } from './button';
import { HeaderLink } from './link';
import { HeaderLogo } from './logo';
import { HeaderRoot } from './root';
import { HeaderNavDropdown, HeaderNavItem, HeaderNavigation } from './navigation';

export const Header = Object.assign(HeaderRoot, {
  Logo: HeaderLogo,
  Link: HeaderLink,
  Button: HeaderButton,
  IconButton: HeaderIconButton,
  Actions: HeaderActions,
  Navigation: Object.assign(HeaderNavigation, {
    Item: HeaderNavItem,
    Dropdown: HeaderNavDropdown
  })
});

export type Header = {
  Props: ComponentProps<typeof HeaderRoot>;
  Root: ComponentProps<typeof HeaderRoot>;
  Logo: ComponentProps<typeof HeaderLogo>;
  Link: ComponentProps<typeof HeaderLink>;
  Button: ComponentProps<typeof HeaderButton>;
  IconButton: ComponentProps<typeof HeaderIconButton>;
  Actions: ComponentProps<typeof HeaderActions>;
  Navigation: ComponentProps<typeof HeaderNavigation> & {
    Item: ComponentProps<typeof HeaderNavItem>;
    Dropdown: ComponentProps<typeof HeaderNavDropdown>;
  };
};

export {
  HeaderRoot,
  HeaderLogo,
  HeaderLink,
  HeaderButton,
  HeaderIconButton,
  HeaderActions,
  HeaderNavigation,
  HeaderNavItem,
  HeaderNavDropdown
};

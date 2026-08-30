// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { SubdomainNavBar } from '@gp/ui/components';

interface SubdomainNavBarHeaderProps {
  fixed?: boolean;
  title: string;
  links: { href: string; label: string }[];
}

export const SubdomainNavBarHeader: React.FC<SubdomainNavBarHeaderProps> = ({ fixed = false, links, title }) => {
  return (
    <header>
      <SubdomainNavBar fixed={fixed} title={title}>
        {links.map((link, index) => (
          <SubdomainNavBar.Link key={index} href={link.href}>
            {link.label}
          </SubdomainNavBar.Link>
        ))}
      </SubdomainNavBar>
    </header>
  );
};

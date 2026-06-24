// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { Sidebar } from '@/components/admin/sidebar';
import { Icon } from '@/components/icons';

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex h-screen overflow-hidden bg-[#F6FAFB]'>
      <Sidebar defaultCollapsed={true}>
        <Sidebar.NavSection title='Dashboard'>
          <Sidebar.NavItem icon={Icon.Home} href='/admin'>
            Overview
          </Sidebar.NavItem>
          <Sidebar.NavItem icon={Icon.Chart} href='/admin/analytics'>
            System Health
          </Sidebar.NavItem>
        </Sidebar.NavSection>

        <Sidebar.NavSection title='Users'>
          <Sidebar.NavItem icon={Icon.Profile2user} href='/admin/users'>
            Directory
          </Sidebar.NavItem>
          <Sidebar.NavItem icon={Icon.Shield} href='/admin/users/roles'>
            Roles & Access
          </Sidebar.NavItem>
          <Sidebar.NavItem icon={Icon.Book} href='/admin/users/organizations'>
            Organizations
          </Sidebar.NavItem>
        </Sidebar.NavSection>

        <Sidebar.NavSection title='Curriculum'>
          <Sidebar.NavItem icon={Icon.Teacher} href='/admin/curriculum/courses'>
            Courses
          </Sidebar.NavItem>
          <Sidebar.NavItem icon={Icon.Award} href='/admin/curriculum/certifications'>
            Certifications
          </Sidebar.NavItem>
          <Sidebar.NavItem icon={Icon.TickCircle} href='/admin/curriculum/submissions'>
            Submissions
          </Sidebar.NavItem>
        </Sidebar.NavSection>

        <Sidebar.NavSection title='System'>
          <Sidebar.NavItem icon={Icon.Box} href='/admin/system/packages'>
            Packages
          </Sidebar.NavItem>
          <Sidebar.NavItem icon={Icon.Cpu} href='/admin/system/compute'>
            Compute
          </Sidebar.NavItem>
          <Sidebar.NavItem icon={Icon.Hierarchy} href='/admin/system/development'>
            Development
          </Sidebar.NavItem>
          <Sidebar.NavItem icon={Icon.Global} href='/admin/system/network'>
            Network
          </Sidebar.NavItem>
        </Sidebar.NavSection>

        <Sidebar.NavSection title='Billing'>
          <Sidebar.NavItem icon={Icon.Card} href='/admin/billing/subscriptions'>
            Subscriptions
          </Sidebar.NavItem>
          <Sidebar.NavItem icon={Icon.ReceiptItem} href='/admin/billing/invoices'>
            Invoices
          </Sidebar.NavItem>
          <Sidebar.NavItem icon={Icon.StatusUp} href='/admin/billing/costs'>
            Costs Analytics
          </Sidebar.NavItem>
        </Sidebar.NavSection>

        <Sidebar.NavSection title='Miscellaneous'>
          <Sidebar.NavItem icon={Icon.Settings} href='/admin/settings'>
            Settings
          </Sidebar.NavItem>
          <Sidebar.NavItem icon={Icon.DocumentText} href='/admin/logs'>
            Logs
          </Sidebar.NavItem>
        </Sidebar.NavSection>
      </Sidebar>
      <main className='flex-1 overflow-y-auto p-6'>{children}</main>
    </div>
  );
}

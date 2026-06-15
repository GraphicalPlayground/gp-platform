// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Accordion } from '@gp/react';
import { Link } from '@/components/link';

const accordionsItems = [
  {
    title: 'Legal overview',
    children: [{ title: 'Home', href: '/legal' }]
  },
  {
    title: 'Customer and User Agreements',
    children: [
      { title: 'Software Services Agreement', href: '/legal/ssa' },
      { title: 'Terms of Service', href: '/legal/tos' },
      { title: 'End User License Agreement', href: '/legal/eula' },
      { title: 'Data Processing Addendum', href: '/legal/dpa' }
    ]
  },
  {
    title: 'Policies, Notices and Guidelines',
    children: [
      { title: 'Privacy Policy', href: '/legal/privacy' },
      { title: 'Cookie Policy', href: '/legal/cookie' },
      { title: 'Acceptable Use Policy', href: '/legal/aup' },
      { title: 'Open Source Software Notice', href: '/legal/oss' }
    ]
  }
];

export function LegalNav() {
  const pathname = usePathname();
  const activeGroupIndex = accordionsItems.findIndex((item) => item.children.some((child) => child.href === pathname));
  const initialKey = activeGroupIndex !== -1 ? activeGroupIndex.toString() : '0';

  const [expandedKeys, setExpandedKeys] = useState(new Set<string | number>([initialKey]));

  return (
    <nav>
      <Accordion className='w-full max-w-md' expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
        {accordionsItems.map((item, index) => {
          const itemValue = index.toString();

          return (
            <Accordion.Item key={itemValue} id={itemValue}>
              <Accordion.Heading>
                <Accordion.Trigger>
                  <h4 className='text-lg font-normal'>{item.title}</h4>
                  <Accordion.Indicator className='duration-300' />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel className='duration-300'>
                <Accordion.Body>
                  <div className='flex flex-col gap-5'>
                    {item.children.map((child, childIndex) => {
                      const isActive = pathname === child.href;

                      return (
                        <Link key={childIndex} href={child.href} className={`text-base ${isActive ? 'underline' : ''}`}>
                          {child.title}
                          {!child.href.startsWith('/') && <Link.Icon />}
                        </Link>
                      );
                    })}
                  </div>
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </nav>
  );
}

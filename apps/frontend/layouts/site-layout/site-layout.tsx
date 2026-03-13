'use client';

import React from 'react';

import { Footer } from '@/components/footer/footer';
import { Navbar } from '@/components/navbar/navbar';

import './site-layout.css';

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div className='gp-site-layout'>
      <Navbar />
      <main className='gp-site-content'>{children}</main>
      <Footer />
    </div>
  );
};

SiteLayout.displayName = 'GP.SiteLayout';

export type { SiteLayoutProps };
export { SiteLayout };

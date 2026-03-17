import type React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
}

export interface PageProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string>;
}

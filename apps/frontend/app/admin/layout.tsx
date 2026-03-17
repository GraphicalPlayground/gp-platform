'use client';

import type { LayoutProps } from '@/types/shared';

import { AdminSidebar } from '@/components/admin-sidebar';

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <body>
      <AdminSidebar />
      <main>{children}</main>
    </body>
  );
}

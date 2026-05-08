'use client';

import React from 'react';
import { Refine, GitHubBanner } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import routerProvider from '@refinedev/nextjs-router';

import { dataProvider } from '@providers/data-provider';
import { ErrorComponent } from '@/components/refine-ui/layout/error-component';
import { Layout } from '@/components/refine-ui/layout/layout';
import { Header } from '@/components/refine-ui/layout/header';
import { useNotificationProvider } from '@/components/refine-ui/notification/use-notification-provider';
import { Toaster } from '@/components/refine-ui/notification/toaster';
import { ThemeProvider } from '@/components/refine-ui/theme/theme-provider';
import '@/app/globals.css';
import { authProviderClient } from '@providers/auth-provider/auth-provider.client';

type RefineContextProps = {
  children: React.ReactNode;
};

export const RefineContext = ({ children }: RefineContextProps) => {
  const notificationProvider = useNotificationProvider();

  return (
    <RefineKbarProvider>
      <ThemeProvider>
        <Refine
          dataProvider={dataProvider}
          notificationProvider={notificationProvider}
          authProvider={authProviderClient}
          routerProvider={routerProvider}
          resources={[
            {
              name: 'blog_posts',
              list: '/blog-posts',
              create: '/blog-posts/create',
              edit: '/blog-posts/edit/:id',
              show: '/blog-posts/show/:id',
              meta: {
                canDelete: true
              }
            },
            {
              name: 'categories',
              list: '/categories',
              create: '/categories/create',
              edit: '/categories/edit/:id',
              show: '/categories/show/:id',
              meta: {
                canDelete: true
              }
            }
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true
          }}
        >
          {children}
          <Toaster />
          <RefineKbar />
        </Refine>
      </ThemeProvider>
    </RefineKbarProvider>
  );
};

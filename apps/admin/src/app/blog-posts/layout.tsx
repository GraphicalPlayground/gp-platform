import React from 'react';
import { Layout as BaseLayout } from '@components/refine-ui/layout/layout';
import { authProviderServer } from '@providers/auth-provider/auth-provider.server';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await getData();

  if (!data.authenticated) {
    return redirect(data?.redirectTo || '/login');
  }

  return <BaseLayout>{children}</BaseLayout>;
}

async function getData() {
  const { authenticated, redirectTo } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo
  };
}

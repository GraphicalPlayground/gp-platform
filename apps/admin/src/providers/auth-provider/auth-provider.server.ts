import type { AuthProvider } from '@refinedev/core';
import { cookies } from 'next/headers';

export const authProviderServer: Pick<AuthProvider, 'check'> = {
  check: async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (token) {
      return {
        authenticated: true
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: '/login'
    };
  }
};

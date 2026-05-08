'use client';

import type { AuthProvider } from '@refinedev/core';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

export const authProviderClient: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ identifier: email, password })
      });

      const data = await response.json();

      if (response.ok && data.data) {
        const { user, accessToken } = data.data;
        Cookies.set('auth', JSON.stringify(user), {
          expires: 30, // 30 days
          path: '/'
        });
        Cookies.set('token', accessToken, {
          expires: 30,
          path: '/'
        });
        return {
          success: true,
          redirectTo: '/'
        };
      }

      return {
        success: false,
        error: {
          name: 'LoginError',
          message: data.message || 'Invalid email or password'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: 'LoginError',
          message: 'An error occurred during login'
        }
      };
    }
  },
  logout: async () => {
    Cookies.remove('auth', { path: '/' });
    Cookies.remove('token', { path: '/' });
    return {
      success: true,
      redirectTo: '/login'
    };
  },
  check: async () => {
    const token = Cookies.get('token');
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
  },
  getPermissions: async () => {
    const auth = Cookies.get('auth');
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return [parsedUser.role];
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get('auth');
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true
      };
    }

    return { error };
  }
};

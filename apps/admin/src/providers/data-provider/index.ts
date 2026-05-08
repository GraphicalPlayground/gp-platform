'use client';

import dataProviderSimpleRest from '@refinedev/simple-rest';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

const baseDataProvider = dataProviderSimpleRest(API_URL);

export const dataProvider = {
  ...baseDataProvider,
  getList: async ({ resource, pagination, filters, sorters, meta }: any) => {
    const token = Cookies.get('token');
    const { current = 1, pageSize = 10 } = pagination ?? {};
    
    const query: any = {
      page: current,
      perPage: pageSize,
    };

    // Simple mapping for demonstration, you might need more complex filter/sort mapping
    const url = `${API_URL}/${resource}?page=${query.page}&perPage=${query.perPage}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    const json = await response.json();

    if (!response.ok) {
      throw json;
    }

    return {
      data: json.data,
      total: json.meta?.total ?? json.data.length,
    };
  },
  getOne: async ({ resource, id, meta }: any) => {
    const token = Cookies.get('token');
    const url = `${API_URL}/${resource}/${id}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    const json = await response.json();

    if (!response.ok) {
      throw json;
    }

    return {
      data: json.data,
    };
  },
  // Add other methods if needed (create, update, delete)
  deleteOne: async ({ resource, id, variables, meta }: any) => {
    const token = Cookies.get('token');
    const url = `${API_URL}/${resource}/${id}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    const json = await response.json();

    if (!response.ok) {
      throw json;
    }

    return {
      data: json.data,
    };
  },
};

'use client';

import { useTable } from '@refinedev/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

import { DataTable } from '@/components/refine-ui/data-table/data-table';
import { ListView } from '@/components/refine-ui/views/list-view';
import { Badge } from '@/components/ui/badge';
import { ShowButton } from '@/components/refine-ui/buttons/show';
import { DeleteButton } from '@/components/refine-ui/buttons/delete';
import type { User } from '@gp/types';

export default function UserList() {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<User>();

    return [
      columnHelper.accessor('id', {
        id: 'id',
        header: 'ID',
        enableSorting: false,
        size: 100
      }),
      columnHelper.accessor('pseudo', {
        id: 'pseudo',
        header: 'Pseudo',
        enableSorting: true
      }),
      columnHelper.accessor('email', {
        id: 'email',
        header: 'Email',
        enableSorting: true
      }),
      columnHelper.accessor('role', {
        id: 'role',
        header: 'Role',
        enableSorting: true,
        cell: ({ getValue }) => {
          const role = getValue();
          return (
            <Badge 
              variant={role === 'admin' ? 'default' : role === 'instructor' ? 'secondary' : 'outline'}
            >
              {role}
            </Badge>
          );
        }
      }),
      columnHelper.accessor('mfaEnabled', {
        id: 'mfaEnabled',
        header: 'MFA',
        enableSorting: true,
        cell: ({ getValue }) => {
          return getValue() ? 'Enabled' : 'Disabled';
        }
      }),
      columnHelper.accessor('createdAt', {
        id: 'createdAt',
        header: 'Joined At',
        enableSorting: true,
        cell: ({ getValue }) => {
          const date = getValue();
          return date ? new Date(date).toLocaleDateString() : '-';
        }
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex gap-2'>
            <ShowButton recordItemId={row.original.id} size='sm' />
            <DeleteButton recordItemId={row.original.id} size='sm' />
          </div>
        ),
        enableSorting: false,
        size: 150
      })
    ];
  }, []);

  const table = useTable({
    columns,
    refineCoreProps: {
      syncWithLocation: true
    }
  });

  return (
    <ListView>
      <DataTable table={table} />
    </ListView>
  );
}

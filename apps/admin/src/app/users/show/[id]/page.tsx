'use client';

import { useShow } from '@refinedev/core';
import React from 'react';
import { ShowView } from '@/components/refine-ui/views/show-view';
import { Typography } from '@gp/ui';
import type { User } from '@gp/types';

export default function UserShow() {
  const { query } = useShow<User>();
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <ShowView>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className='flex flex-col gap-4'>
          <div>
            <Typography variant='h5' className='font-semibold'>
              ID
            </Typography>
            <Typography variant='p'>{record?.id}</Typography>
          </div>
          <div>
            <Typography variant='h5' className='font-semibold'>
              Pseudo
            </Typography>
            <Typography variant='p'>{record?.pseudo}</Typography>
          </div>
          <div>
            <Typography variant='h5' className='font-semibold'>
              Email
            </Typography>
            <Typography variant='p'>{record?.email}</Typography>
          </div>
          <div>
            <Typography variant='h5' className='font-semibold'>
              Role
            </Typography>
            <Typography variant='p'>{record?.role}</Typography>
          </div>
          <div>
            <Typography variant='h5' className='font-semibold'>
              First Name
            </Typography>
            <Typography variant='p'>{record?.firstName ?? '-'}</Typography>
          </div>
          <div>
            <Typography variant='h5' className='font-semibold'>
              Last Name
            </Typography>
            <Typography variant='p'>{record?.lastName ?? '-'}</Typography>
          </div>
          <div>
            <Typography variant='h5' className='font-semibold'>
              MFA Enabled
            </Typography>
            <Typography variant='p'>{record?.mfaEnabled ? 'Yes' : 'No'}</Typography>
          </div>
          <div>
            <Typography variant='h5' className='font-semibold'>
              Created At
            </Typography>
            <Typography variant='p'>{record?.createdAt ? new Date(record.createdAt).toLocaleString() : '-'}</Typography>
          </div>
        </div>
      )}
    </ShowView>
  );
}

'use client';

import { Suspense } from 'react';
import { ErrorComponent } from '@/components/refine-ui/layout/error-component';
import { Authenticated } from '@refinedev/core';

export default function NotFound() {
  return (
    <Suspense>
      <Authenticated key='not-found'>
        <ErrorComponent />
      </Authenticated>
    </Suspense>
  );
}

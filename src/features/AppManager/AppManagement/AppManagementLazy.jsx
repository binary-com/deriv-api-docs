// load lazy suspendse AppManagement.jsx
import React, { lazy, Suspense } from 'react';
import DelayedFallback from '@site/src/components/DelayedFallback';
const LazyAppManagement = lazy(() => import('./AppManagement'));

export const AppManagementLazy = () => {
  return (
    <Suspense fallback={<DelayedFallback />}>
      <LazyAppManagement />
    </Suspense>
  );
};

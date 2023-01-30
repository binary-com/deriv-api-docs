import React from 'react';
// import { useSelector } from '@xstate/react';
// import { isManageAppsEmptySelector } from '../../../../state/selectors';
// import { stateService } from '../../../../state/stateSignal';
import DelayedFallback from '@site/src/components/DelayedFallback';

const LazyAppManagementEmpty = React.lazy(() => import('./AppManagementEmpty'));

export default function AppManagementEmptyLazy() {
  // const isManageAppsEmpty = useSelector(stateService, isManageAppsEmptySelector);
  // if (!isManageAppsEmpty) {
  //     return null;
  // }
  return (
    <React.Suspense fallback={<DelayedFallback />}>
      <LazyAppManagementEmpty />
    </React.Suspense>
  );
}

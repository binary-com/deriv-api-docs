import React, { Suspense, useEffect } from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
// import DashboardTabs from './components/Tabs';
import useAppManager from '@site/src/hooks/useAppManager';
import Spinner from '@site/src/components/Spinner';

const ManageDashboard = React.lazy(() => import('./manage-dashboard'));
const Login = React.lazy(() =>
  import('../Auth/Login/Login').then((module) => ({ default: module.Login })),
);

export const AppManager = () => {
  const { is_logged_in } = useAuthContext();
  const { setIsDashboard } = useAppManager();

  useEffect(() => {
    setIsDashboard(true);
    return () => {
      setIsDashboard(false);
    };
  }, [setIsDashboard]);

  return (
    <React.Fragment>
      <Suspense
        fallback={
          <div style={{ height: '90vh' }}>
            <Spinner />
          </div>
        }
      >
        {is_logged_in ? <ManageDashboard /> : <Login />}
      </Suspense>
    </React.Fragment>
  );
};

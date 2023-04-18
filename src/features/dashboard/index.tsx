import React, { useEffect } from 'react';
import { Login } from '../Auth/Login/Login';
import useAuthContext from '@site/src/hooks/useAuthContext';
import DashboardTabs from './components/Tabs';
import useAppManager from '@site/src/hooks/useAppManager';

export const AppManager = () => {
  const { is_logged_in } = useAuthContext();
  const { setIsDashboard, is_dashboard } = useAppManager();

  useEffect(() => {
    setIsDashboard(true);
    return () => {
      setIsDashboard(false);
    };
  }, [setIsDashboard]);

  return <React.Fragment>{is_logged_in ? <DashboardTabs /> : <Login />}</React.Fragment>;
};

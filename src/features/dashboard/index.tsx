import React from 'react';
import { Login } from '../Auth/Login/Login';
import useAuthContext from '@site/src/hooks/useAuthContext';
import AppManagerTabs from './components/Tabs';
import AppManagerContextProvider from '@site/src/contexts/app-manager/app-manager.provider';

export const AppManager = () => {
  const { is_logged_in } = useAuthContext();

  return (
    <AppManagerContextProvider>
      {is_logged_in ? <AppManagerTabs /> : <Login />}
    </AppManagerContextProvider>
  );
};

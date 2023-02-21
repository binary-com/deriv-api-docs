import { ApplicationObject } from '@deriv/api-types';
import useGetApps from '@site/src/features/dashboard/hooks/useGetApp';
import useAuthContext from '@site/src/hooks/useAuthContext';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AppManagerContext, TAppManagerContext, TDashboardTab } from './app-manager.context';

type TAppManagerContextProps = {
  children: React.ReactNode;
};

const AppManagerContextProvider = ({ children }: TAppManagerContextProps) => {
  const [apps, setApps] = useState<ApplicationObject[]>([]);
  const [currentTab, setCurrentTab] = useState<TDashboardTab>('MANAGE_TOKENS');
  const { getAllApps, apps: updatedApps } = useGetApps();
  const { is_authorized } = useAuthContext();

  const getApps = useCallback(() => {
    if (is_authorized) {
      getAllApps();
    }
  }, [getAllApps, is_authorized]);

  const updateCurrentTab = useCallback((updatedTab: TDashboardTab) => {
    setCurrentTab(updatedTab);
  }, []);

  useEffect(() => {
    setApps(updatedApps);
  }, [updatedApps]);

  const context_object: TAppManagerContext = useMemo(() => {
    return {
      apps,
      getApps,
      currentTab,
      updateCurrentTab,
    };
  }, [apps, currentTab, getApps, updateCurrentTab]);

  return <AppManagerContext.Provider value={context_object}>{children}</AppManagerContext.Provider>;
};

export default AppManagerContextProvider;

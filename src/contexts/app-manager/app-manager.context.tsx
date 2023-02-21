import { ApplicationObject } from '@deriv/api-types';
import { createContext } from 'react';

export type TDashboardTab = 'MANAGE_TOKENS' | 'REGISTER_APP' | 'MANAGE_APPS';

export type TAppManagerContext = {
  apps: ApplicationObject[];
  getApps: () => void;
  currentTab: TDashboardTab;
  updateCurrentTab: (tab: TDashboardTab) => void;
};

export const AppManagerContext = createContext<TAppManagerContext | null>(null);

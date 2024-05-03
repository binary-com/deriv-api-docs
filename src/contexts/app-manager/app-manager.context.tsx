import { ApplicationObject } from '@deriv/api-types';
import { createContext, Dispatch, SetStateAction } from 'react';

export type TDashboardTab = 'MANAGE_TOKENS' | 'REGISTER_APP' | 'MANAGE_APPS';

export type TAppManagerContext = {
  apps: ApplicationObject[];
  getApps: () => void;
  currentTab: TDashboardTab;
  updateCurrentTab: (tab: TDashboardTab) => void;
  is_dashboard: boolean;
  setIsDashboard: Dispatch<SetStateAction<boolean>>;
  app_register_modal_open: boolean;
  setAppRegisterModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const AppManagerContext = createContext<TAppManagerContext | null>(null);

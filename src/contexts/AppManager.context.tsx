import React from 'react';

export type TUpdatingRow = {
  name?: string;
  app_markup_percentage?: number;
  redirect_uri?: string;
  verification_uri?: string;
  scopes?: string[];
  app_id?: number;
};

type TAppManagerContext = {
  manager_state?: string;
  setManagerState?: React.Dispatch<React.SetStateAction<string>>;
  dialog_state?: string;
  setDialogState?: React.Dispatch<React.SetStateAction<string>>;
  updating_row?: TUpdatingRow;
  setUpdatingRow?: React.Dispatch<React.SetStateAction<TUpdatingRow>>;
  is_empty_state?: boolean;
  setIsEmptyState?: React.Dispatch<React.SetStateAction<boolean>>;
  is_loading_apps?: boolean;
  setIsLoadingApps?: React.Dispatch<React.SetStateAction<boolean>>;
};

type TAppManagerContextProps = {
  children: React.ReactNode;
};

export const AppManagerContext = React.createContext<TAppManagerContext>({});

const AppManagerContextProvider = ({ children }: TAppManagerContextProps) => {
  const [manager_state, setManagerState] = React.useState('REGISTER_STATE');
  const [dialog_state, setDialogState] = React.useState('');
  const [updating_row, setUpdatingRow] = React.useState({});
  const [is_empty_state, setIsEmptyState] = React.useState(false);
  const [is_loading_apps, setIsLoadingApps] = React.useState(true);

  const context_object = {
    setManagerState,
    manager_state,
    setDialogState,
    dialog_state,
    setUpdatingRow,
    updating_row,
    setIsEmptyState,
    is_empty_state,
    setIsLoadingApps,
    is_loading_apps,
  };

  return <AppManagerContext.Provider value={context_object}>{children}</AppManagerContext.Provider>;
};

export default AppManagerContextProvider;

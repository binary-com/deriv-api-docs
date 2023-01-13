import React, { useMemo } from 'react';
import type { ReactNode } from 'react';

export interface IRootContext {
  is_logged_in?: boolean;
  setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RootContext = React.createContext<IRootContext>({});

type TRootContextProps = {
  children: ReactNode;
};

const RootContextProvider = ({ children }: TRootContextProps) => {
  const [is_logged_in, setIsLoggedIn] = React.useState(false);

  const context_object = useMemo(() => {
    return {
      is_logged_in,
      setIsLoggedIn,
    };
  }, [is_logged_in]);

  return <RootContext.Provider value={context_object}>{children}</RootContext.Provider>;
};

export default RootContextProvider;

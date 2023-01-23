import React, { useMemo, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useSessionStorage } from 'usehooks-ts';
import { IRootContext, IUserAccount, RootContext } from './root.context';

type TRootContextProps = {
  children: ReactNode;
};

const RootContextProvider = ({ children }: TRootContextProps) => {
  const [is_logged_in, setIsLoggedIn] = React.useState(false);
  const [accounts, setAccounts] = useSessionStorage<IUserAccount[]>('user-accounts', []);
  const [currentAccount, setCurrentAccount] = useSessionStorage<IUserAccount>('current-account', {
    name: '',
    token: '',
    currency: '',
  });

  const updateAccounts = useCallback(
    (userAccounts: IUserAccount[]) => {
      setAccounts(userAccounts);
      if (userAccounts.length) {
        setCurrentAccount(userAccounts[0]);
      }
    },
    [setAccounts, setCurrentAccount],
  );

  const updateCurrentAccount = useCallback(
    (account: IUserAccount) => {
      setCurrentAccount(account);
    },
    [setCurrentAccount],
  );

  useEffect(() => {
    if (accounts.length) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [accounts]);

  const context_object: IRootContext = useMemo(() => {
    return {
      is_logged_in,
      accounts,
      updateAccounts,
      currentAccount,
      updateCurrentAccount,
    };
  }, [is_logged_in, accounts, updateAccounts, currentAccount, updateCurrentAccount]);

  return <RootContext.Provider value={context_object}>{children}</RootContext.Provider>;
};

export default RootContextProvider;

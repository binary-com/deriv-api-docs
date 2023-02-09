import React, { useMemo, useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useSessionStorage } from 'usehooks-ts';
import { AuthContext, IAuthContext, IUser, IUserAccounts, IUserLoginAccount } from './auth.context';
import apiManager from '@site/src/configs/websocket';
import {
  CURRENT_LOGIN_ACCOUNT_SESSION_STORAGE_KEY,
  LOGIN_ACCOUNTS_SESSION_STORAGE_KEY,
  USER_ACCOUNTS_SESSION_STORAGE_KEY,
  USER_SESSION_STORAGE_KEY,
} from '@site/src/utils/constants';

type TAuthProviderProps = {
  children: ReactNode;
};

apiManager.init();

const AuthProvider = ({ children }: TAuthProviderProps) => {
  const [is_logged_in, setIsLoggedIn] = useState(false);
  const [is_authorized, setIsAuthorized] = useState(false);

  const [loginAccounts, setLoginAccounts] = useSessionStorage<IUserLoginAccount[]>(
    LOGIN_ACCOUNTS_SESSION_STORAGE_KEY,
    [],
  );
  const [currentLoginAccount, setCurrentLoginAccount] = useSessionStorage<IUserLoginAccount>(
    CURRENT_LOGIN_ACCOUNT_SESSION_STORAGE_KEY,
    {
      name: '',
      token: '',
      currency: '',
    },
  );

  const [userAccounts, setUserAccounts] = useSessionStorage<IUserAccounts>(
    USER_ACCOUNTS_SESSION_STORAGE_KEY,
    [],
  );
  const [user, setUser] = useSessionStorage<IUser>(USER_SESSION_STORAGE_KEY, {});

  const updateAuthorize = useCallback(async () => {
    if (currentLoginAccount.token) {
      try {
        const { authorize } = await apiManager.authorize(currentLoginAccount.token);
        setIsAuthorized(true);
        const { account_list, ...user } = authorize;
        setUserAccounts(account_list);
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    }
  }, [currentLoginAccount.token, setUser, setUserAccounts]);

  useEffect(() => {
    if (!is_authorized) {
      updateAuthorize();
    }
  }, [is_authorized, updateAuthorize]);

  const updateUserAccounts = useCallback(
    (accounts: IUserAccounts) => {
      setUserAccounts(accounts);
    },
    [setUserAccounts],
  );

  const updateLoginAccounts = useCallback(
    (loginAccounts: IUserLoginAccount[]) => {
      setLoginAccounts(loginAccounts);
      if (loginAccounts.length) {
        setCurrentLoginAccount(loginAccounts[0]);
      }
    },
    [setCurrentLoginAccount, setLoginAccounts],
  );

  const updateCurrentLoginAccount = useCallback(
    (account: IUserLoginAccount) => {
      setIsAuthorized(false);
      setCurrentLoginAccount(account);
    },
    [setCurrentLoginAccount],
  );

  useEffect(() => {
    if (loginAccounts.length) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [loginAccounts.length]);

  const context_object: IAuthContext = useMemo(() => {
    return {
      is_logged_in,
      is_authorized,
      loginAccounts,
      updateLoginAccounts,
      currentLoginAccount,
      updateCurrentLoginAccount,
      userAccounts,
      updateUserAccounts,
      user,
    };
  }, [
    currentLoginAccount,
    is_authorized,
    is_logged_in,
    loginAccounts,
    updateCurrentLoginAccount,
    updateLoginAccounts,
    userAccounts,
    updateUserAccounts,
    user,
  ]);

  return <AuthContext.Provider value={context_object}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

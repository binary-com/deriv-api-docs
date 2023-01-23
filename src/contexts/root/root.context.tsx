import React from 'react';

export interface IUserAccount {
  name: string;
  token: string;
  currency: string;
}

export interface IRootContext {
  is_logged_in: boolean;
  accounts: IUserAccount[];
  currentAccount: IUserAccount;
  updateCurrentAccount: (userAccount: IUserAccount) => void;
  updateAccounts: (userAccounts: IUserAccount[]) => void;
}

export const RootContext = React.createContext<IRootContext | null>(null);

import { IAuthContext, IUserLoginAccount } from '@site/src/contexts/auth/auth.context';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import {
  CURRENT_LOGIN_ACCOUNT_SESSION_STORAGE_KEY,
  LOGIN_ACCOUNTS_SESSION_STORAGE_KEY,
} from '@site/src/utils/constants';
import { act, renderHook, RenderHookResult, cleanup } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import useAuthContext from '..';

const fakeAccounts: IUserLoginAccount[] = [
  {
    name: 'test',
    token: 'test_token',
    currency: 'USD',
  },
  {
    name: 'test2',
    token: 'test_token2',
    currency: 'ETH',
  },
];

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('Root Context', () => {
  let view: RenderHookResult<{ children: ReactNode }, IAuthContext>;

  beforeEach(() => {
    view = renderHook(() => useAuthContext(), { wrapper });
  });

  afterEach(() => {
    cleanup();
  });

  it('Should have is_logged_in as falsy', () => {
    expect(view.result.current.is_logged_in).toBeFalsy();
  });

  it('Should have empty array for accounts as initial value', () => {
    expect(view.result.current.loginAccounts.length).toBe(0);
  });

  it('Should have empty values for current account as initial value ', () => {
    expect(view.result.current.currentLoginAccount).toStrictEqual({
      name: '',
      token: '',
      currency: '',
    });
  });

  it('Should update accounts in state', () => {
    act(() => {
      view.result.current.updateLoginAccounts(fakeAccounts);
    });

    expect(view.result.current.loginAccounts.length).toBe(2);
    expect(view.result.current.loginAccounts).toStrictEqual(fakeAccounts);
  });

  it('Should update accounts in session storage', () => {
    act(() => {
      view.result.current.updateLoginAccounts(fakeAccounts);
    });

    expect(sessionStorage.__STORE__[LOGIN_ACCOUNTS_SESSION_STORAGE_KEY]).toStrictEqual(
      JSON.stringify(fakeAccounts),
    );
  });

  it('Should set the first item in update accounts as current account in state', () => {
    act(() => {
      view.result.current.updateLoginAccounts(fakeAccounts);
    });
    expect(view.result.current.currentLoginAccount).toStrictEqual({
      name: 'test',
      token: 'test_token',
      currency: 'USD',
    });
  });

  it('Should set the first item in update accounts as current account in session storage', () => {
    act(() => {
      view.result.current.updateLoginAccounts(fakeAccounts);
    });

    expect(sessionStorage.__STORE__[CURRENT_LOGIN_ACCOUNT_SESSION_STORAGE_KEY]).toStrictEqual(
      JSON.stringify({
        name: 'test',
        token: 'test_token',
        currency: 'USD',
      }),
    );
  });

  it('Should update current account in state', () => {
    const fakeCurrentAccount: IUserLoginAccount = {
      name: 'fake_current_account_name',
      token: 'fake_current_account_token',
      currency: 'fake_current_account_currency',
    };
    act(() => {
      view.result.current.updateCurrentLoginAccount(fakeCurrentAccount);
    });

    expect(view.result.current.currentLoginAccount).toStrictEqual({
      name: 'fake_current_account_name',
      token: 'fake_current_account_token',
      currency: 'fake_current_account_currency',
    });
  });

  it('Should update current account in session storage', () => {
    const fakeCurrentAccount: IUserLoginAccount[] = [
      {
        name: 'fake_current_account_name',
        token: 'fake_current_account_token',
        currency: 'fake_current_account_currency',
      },
    ];
    act(() => {
      view.result.current.updateLoginAccounts(fakeCurrentAccount);
    });

    expect(sessionStorage.__STORE__[CURRENT_LOGIN_ACCOUNT_SESSION_STORAGE_KEY]).toStrictEqual(
      JSON.stringify({
        name: 'fake_current_account_name',
        token: 'fake_current_account_token',
        currency: 'fake_current_account_currency',
      }),
    );
  });

  it('Should be considered as logged in when accounts is not empty', () => {
    act(() => {
      view.result.current.updateLoginAccounts(fakeAccounts);
    });

    expect(view.result.current.is_logged_in).toBeTruthy();
  });
});

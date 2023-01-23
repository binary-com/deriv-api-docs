import { IRootContext, IUserAccount } from '@site/src/contexts/root/root.context';
import RootContextProvider from '@site/src/contexts/root/root.context.provider';
import { act, renderHook, RenderHookResult, cleanup } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import useRootContext from '..';

const fakeAccounts: IUserAccount[] = [
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

const wrapper = ({ children }) => <RootContextProvider>{children}</RootContextProvider>;

describe('Root Context', () => {
  let view: RenderHookResult<{ children: ReactNode }, IRootContext>;

  beforeEach(() => {
    view = renderHook(() => useRootContext(), { wrapper });
  });

  afterEach(() => {
    cleanup();
  });

  it('Should have is_logged_in as falsy', () => {
    expect(view.result.current.is_logged_in).toBeFalsy();
  });

  it('Should have empty array for accounts as initial value', () => {
    expect(view.result.current.accounts.length).toBe(0);
  });

  it('Should have empty values for current account as initial value ', () => {
    expect(view.result.current.currentAccount).toStrictEqual({
      name: '',
      token: '',
      currency: '',
    });
  });

  it('Should update accounts in state', () => {
    act(() => {
      view.result.current.updateAccounts(fakeAccounts);
    });

    expect(view.result.current.accounts.length).toBe(2);
    expect(view.result.current.accounts).toStrictEqual(fakeAccounts);
  });

  it('Should update accounts in session storage', () => {
    act(() => {
      view.result.current.updateAccounts(fakeAccounts);
    });

    expect(sessionStorage.__STORE__['user-accounts']).toStrictEqual(JSON.stringify(fakeAccounts));
  });

  it('Should set the first item in update accounts as current account in state', () => {
    act(() => {
      view.result.current.updateAccounts(fakeAccounts);
    });
    expect(view.result.current.currentAccount).toStrictEqual({
      name: 'test',
      token: 'test_token',
      currency: 'USD',
    });
  });

  it('Should set the first item in update accounts as current account in session storage', () => {
    act(() => {
      view.result.current.updateAccounts(fakeAccounts);
    });

    expect(sessionStorage.__STORE__['current-account']).toStrictEqual(
      JSON.stringify({
        name: 'test',
        token: 'test_token',
        currency: 'USD',
      }),
    );
  });

  it('Should update current account in state', () => {
    const fakeCurrentAccount: IUserAccount = {
      name: 'fake_current_account_name',
      token: 'fake_current_account_token',
      currency: 'fake_current_account_currency',
    };
    act(() => {
      view.result.current.updateCurrentAccount(fakeCurrentAccount);
    });

    expect(view.result.current.currentAccount).toStrictEqual({
      name: 'fake_current_account_name',
      token: 'fake_current_account_token',
      currency: 'fake_current_account_currency',
    });
  });

  it('Should update current account in session storage', () => {
    const fakeCurrentAccount: IUserAccount = {
      name: 'fake_current_account_name',
      token: 'fake_current_account_token',
      currency: 'fake_current_account_currency',
    };
    act(() => {
      view.result.current.updateCurrentAccount(fakeCurrentAccount);
    });

    expect(sessionStorage.__STORE__['current-account']).toStrictEqual(
      JSON.stringify({
        name: 'fake_current_account_name',
        token: 'fake_current_account_token',
        currency: 'fake_current_account_currency',
      }),
    );
  });

  it('Should be considered as logged in when accounts is not empty', () => {
    act(() => {
      view.result.current.updateAccounts(fakeAccounts);
    });

    expect(view.result.current.is_logged_in).toBeTruthy();
  });
});

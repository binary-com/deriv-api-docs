import RootContextProvider from '@site/src/contexts/root/root.context.provider';
import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import useAuthParams from '..';

const mockUpdateAccounts = jest.fn();

const mockUseRootContext = jest.fn().mockImplementation(() => ({
  updateAccounts: mockUpdateAccounts,
}));

React.useContext = mockUseRootContext;

const wrapper = ({ children }) => <RootContextProvider>{children}</RootContextProvider>;

describe('Use Auth Params', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should update accounts in the context', () => {
    const { result } = renderHook(() => useAuthParams(), { wrapper });
    const test_search_params =
      '?acct1=CR111111&token1=first_token&cur1=USD&acct2=CR2222222&token2=second_token&cur2=ETH';
    act(() => {
      result.current.checkUrlParams(test_search_params);
    });

    const expected_accounts = [
      {
        currency: 'USD',
        name: 'CR111111',
        token: 'first_token',
      },
      {
        currency: 'ETH',
        name: 'CR2222222',
        token: 'second_token',
      },
    ];

    expect(mockUpdateAccounts).toBeCalledTimes(1);
    expect(mockUpdateAccounts).toBeCalledWith(expected_accounts);
  });

  it('Should not update accounts in context with empty string as query params', () => {
    const { result } = renderHook(() => useAuthParams(), { wrapper });
    act(() => {
      result.current.checkUrlParams('');
    });

    expect(mockUpdateAccounts).not.toBeCalled();
  });
});

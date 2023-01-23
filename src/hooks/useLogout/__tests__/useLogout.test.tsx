import RootContextProvider from '@site/src/contexts/root/root.context.provider';
import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import useLogout from '..';

const wrapper = ({ children }) => <RootContextProvider>{children}</RootContextProvider>;

const mockUpdateAccounts = jest.fn();

const mockContext = jest.fn().mockImplementation(() => ({
  updateAccounts: mockUpdateAccounts,
}));

React.useContext = mockContext;

describe('Login', () => {
  it('Should clear context accounts on logout', () => {
    const { result } = renderHook(() => useLogout(), { wrapper });

    act(() => {
      result.current.logout();
    });

    expect(mockUpdateAccounts).toBeCalledTimes(1);
  });
});

import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import useLogout from '..';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import useAuthContext from '../../useAuthContext';

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

const mockUpdateLoginAccounts = jest.fn();

mockUseAuthContext.mockImplementation(() => ({
  updateLoginAccounts: mockUpdateLoginAccounts,
}));

describe('Login', () => {
  it('Should clear context accounts on logout', () => {
    const { result } = renderHook(() => useLogout(), { wrapper });

    act(() => {
      result.current.logout();
    });

    expect(mockUpdateLoginAccounts).toBeCalledTimes(1);
  });
});

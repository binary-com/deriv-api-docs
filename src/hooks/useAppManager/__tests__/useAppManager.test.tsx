import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import useAppManager from '..';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import AppManagerContextProvider from '@site/src/contexts/app-manager/app-manager.provider';

const wrapper = ({ children }) => (
  <AuthProvider>
    {' '}
    <AppManagerContextProvider>{children}</AppManagerContextProvider>
  </AuthProvider>
);

describe('use App Manager', () => {
  it('Should have is_dashboard falsy', () => {
    const { result } = renderHook(() => useAppManager(), { wrapper });
    expect(result.current.is_dashboard).toBeFalsy();
  });

  it('Should have MANAGE_TOKENS as initial value for currentTab', () => {
    const { result } = renderHook(() => useAppManager(), { wrapper });
    expect(result.current.currentTab).toBe('MANAGE_TOKENS');
  });

  it('Should update currentTab value', () => {
    const { result } = renderHook(() => useAppManager(), { wrapper });
    act(() => {
      result.current.updateCurrentTab('REGISTER_APP');
    });
    expect(result.current.currentTab).toBe('REGISTER_APP');
  });

  it('Should set is_dashboard to truthy when user visits dashboard tab', () => {
    const { result } = renderHook(() => useAppManager(), { wrapper });
    act(() => {
      result.current.setIsDashboard(true);
    });
    expect(result.current.is_dashboard).toBeTruthy();
  });
});

import makeMockSocket from '@site/src/__mocks__/socket.mock';
import { act, renderHook, cleanup } from '@testing-library/react-hooks';
import WS from 'jest-websocket-mock';
import React from 'react';
import useAppManager from '..';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import AppManagerContextProvider from '@site/src/contexts/app-manager/app-manager.provider';

const connection = makeMockSocket();

const wrapper = ({ children }) => (
  <AuthProvider>
    {' '}
    <AppManagerContextProvider>{children}</AppManagerContextProvider>
  </AuthProvider>
);

describe('use App Manager', () => {
  let wsServer: WS;
  beforeEach(async () => {
    wsServer = await connection.setup();
  });
  afterEach(async () => {
    connection.tearDown();
    cleanup();
  });

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
});

import AuthProvider from '@site/src/contexts/auth/auth.provider';
import TokenPageProvider from '@site/src/contexts/tokenPage/token-page.provider';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import { cleanup, renderHook, act } from '@testing-library/react-hooks';
import { WS } from 'jest-websocket-mock';
import React from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import useTokenPage from '../useTokenPage';
import { TTokensArrayType } from '@site/src/contexts/tokenPage/types';
import useDeleteToken from '../useDeleteToken';

const connection = makeMockSocket();

const wrapper = ({ children }) => (
  <AuthProvider>
    <TokenPageProvider>{children}</TokenPageProvider>
  </AuthProvider>
);

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

mockUseAuthContext.mockImplementation(() => ({
  is_authorized: true,
}));

jest.mock('../useTokenPage');

const mockUseTokenPage = useTokenPage as jest.MockedFunction<typeof useTokenPage>;

let tokens: TTokensArrayType = [
  {
    display_name: 'test',
    last_used: '',
    scopes: ['read', 'trade'],
    token: 'lWUXvbeFMGhOW59',
    valid_for_ip: '',
  },
];

const mockUpdateTokens = jest.fn().mockImplementation((updatedTokens) => {
  tokens = updatedTokens;
});

mockUseTokenPage.mockImplementation(() => ({
  tokens,
  updateTokens: mockUpdateTokens,
}));

describe('Use Create Token', () => {
  let wsServer: WS;
  beforeEach(async () => {
    wsServer = await connection.setup();
    await wsServer.connected;
  });

  afterEach(() => {
    connection.tearDown();
    cleanup();
  });

  it('Should delete token token', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDeleteToken(), { wrapper });

    act(() => {
      result.current.deleteToken('lWUXvbeFMGhOW59');
    });

    await expect(wsServer).toReceiveMessage({
      api_token: 1,
      delete_token: 'lWUXvbeFMGhOW59',
      req_id: 1,
    });

    wsServer.send({
      api_token: {
        delete_token: 1,
        tokens: [],
      },
      echo_req: { api_token: 1, delete_token: 'lWUXvbeFMGhOW59', req_id: 1 },
      msg_type: 'api_token',
      req_id: 1,
    });

    await waitForNextUpdate();

    expect(mockUpdateTokens).toHaveBeenCalledTimes(1);
  });
});

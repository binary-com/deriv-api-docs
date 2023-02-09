import AuthProvider from '@site/src/contexts/auth/auth.provider';
import TokenPageProvider from '@site/src/contexts/tokenPage/token-page.provider';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import { cleanup, renderHook } from '@testing-library/react-hooks';
import { WS } from 'jest-websocket-mock';
import React from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import useTokenPage from '../useTokenPage';
import { TTokensArrayType } from '@site/src/contexts/tokenPage/types';
import useGetTokens from '../useGetTokens';

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

let tokens: TTokensArrayType = [];

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

  it('Should create token', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetTokens(), { wrapper });

    expect(result.current.isLoadingTokens).toBeTruthy();

    await expect(wsServer).toReceiveMessage({ api_token: 1, req_id: 1 });

    wsServer.send({
      api_token: {
        tokens: [
          {
            display_name: '111111',
            last_used: '',
            scopes: ['read', 'trade'],
            token: 'token_1',
            valid_for_ip: '',
          },
          {
            display_name: 'michio_app_pages',
            last_used: '2022-10-04 10:33:51',
            scopes: ['read', 'trade', 'payments', 'trading_information', 'admin'],
            token: 'token_2',
            valid_for_ip: '',
          },
        ],
      },
      echo_req: { api_token: 1, req_id: 1 },
      msg_type: 'api_token',
      req_id: 1,
    });

    await waitForNextUpdate();

    expect(mockUpdateTokens).toHaveBeenCalledTimes(1);
    expect(mockUpdateTokens).toHaveBeenCalledWith([
      {
        display_name: '111111',
        last_used: '',
        scopes: ['read', 'trade'],
        token: 'token_1',
        valid_for_ip: '',
      },
      {
        display_name: 'michio_app_pages',
        last_used: '2022-10-04 10:33:51',
        scopes: ['read', 'trade', 'payments', 'trading_information', 'admin'],
        token: 'token_2',
        valid_for_ip: '',
      },
    ]);

    expect(tokens).toEqual(
      expect.arrayContaining([
        {
          display_name: '111111',
          last_used: '',
          scopes: ['read', 'trade'],
          token: 'token_1',
          valid_for_ip: '',
        },
        {
          display_name: 'michio_app_pages',
          last_used: '2022-10-04 10:33:51',
          scopes: ['read', 'trade', 'payments', 'trading_information', 'admin'],
          token: 'token_2',
          valid_for_ip: '',
        },
      ]),
    );
  });
});

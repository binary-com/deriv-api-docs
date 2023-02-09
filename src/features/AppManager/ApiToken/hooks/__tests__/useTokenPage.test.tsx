import TokenPageProvider from '@site/src/contexts/tokenPage/token-page.provider';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import React from 'react';
import useTokenPage from '../useTokenPage';

const wrapper = ({ children }) => <TokenPageProvider>{children}</TokenPageProvider>;
describe('Use Page Token', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should have empty array for tokens', () => {
    const { result } = renderHook(() => useTokenPage(), { wrapper });
    expect(result.current.tokens.length).toBe(0);
  });

  it('Should update tokens on updateTokens call', () => {
    const { result } = renderHook(() => useTokenPage(), { wrapper });

    act(() => {
      result.current.updateTokens([
        {
          display_name: 'test',
          last_used: '',
          scopes: ['read', 'trade'],
          token: 'r3ScTjzYwbfoLyz',
          valid_for_ip: '',
        },
      ]);
    });

    expect(result.current.tokens.length).toBe(1);
    expect(result.current.tokens).toEqual(
      expect.arrayContaining([
        {
          display_name: 'test',
          last_used: '',
          scopes: ['read', 'trade'],
          token: 'r3ScTjzYwbfoLyz',
          valid_for_ip: '',
        },
      ]),
    );
  });
});

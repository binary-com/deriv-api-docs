import React, { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { TTokensArrayType } from './types';
import { ITokenPageContext, TokenPageContext } from './token-page.context';
type TTokenProviderProps = {
  children: ReactNode;
};

const TokenPageProvider = ({ children }: TTokenProviderProps) => {
  const [tokens, setTokens] = useState<TTokensArrayType>([]);

  const updateTokens = useCallback((updatedTokens: TTokensArrayType) => {
    setTokens(updatedTokens);
  }, []);

  const contextValue: ITokenPageContext = useMemo(() => {
    return {
      tokens,
      updateTokens,
    };
  }, [tokens, updateTokens]);

  return <TokenPageContext.Provider value={contextValue}>{children}</TokenPageContext.Provider>;
};

export default TokenPageProvider;

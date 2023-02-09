import React from 'react';
import { TTokensArrayType } from './types';

export interface ITokenPageContext {
  tokens: TTokensArrayType;
  updateTokens: (tokens: TTokensArrayType) => void;
}

export const TokenPageContext = React.createContext<ITokenPageContext | null>(null);

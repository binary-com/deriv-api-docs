import { ApiToken, StreamTypes } from '@deriv/api-types';
import { Column } from 'react-table';

export type TTokensArrayType = ApiToken['tokens'];

export type TTokenType = ArrayElement<TTokensArrayType>;

export type TScopesArrayType = TTokenType['scopes'];

export type TScopes = ArrayElement<TScopesArrayType>;

export type TInfo = {
  title?: string;
  description?: string;
  auth_required?: number;
  auth_scopes?: string[];
};

export type TEnumStreamType = Array<StreamTypes>;

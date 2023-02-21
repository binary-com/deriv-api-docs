import { ApiToken } from '@deriv/api-types';
import { Column } from 'react-table';

export type TTokensArrayType = ApiToken['tokens'];

export type TTokenType = ArrayElement<TTokensArrayType>;

export type TScopesArrayType = TTokenType['scopes'];

export type TScopes = ArrayElement<TScopesArrayType>;

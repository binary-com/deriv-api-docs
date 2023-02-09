// import useAuthContext from '@site/src/hooks/useAuthContext';
import useWS from '@site/src/hooks/useWs';
import { useCallback, useEffect } from 'react';
import { TTokenType } from '@site/src/contexts/tokenPage/types';
import useTokenPage from './useTokenPage';
import useAuthContext from '@site/src/hooks/useAuthContext';

const useCreateToken = () => {
  const { send, data, is_loading, error } = useWS('api_token');
  const { is_authorized } = useAuthContext();
  const { updateTokens } = useTokenPage();

  const createToken = useCallback(
    (tokenName: string, scopes: TTokenType['scopes']) => {
      if (is_authorized) {
        send({ new_token: tokenName, new_token_scopes: scopes });
      }
    },
    [is_authorized, send],
  );

  useEffect(() => {
    if (data) {
      updateTokens(data.tokens);
    }
  }, [data, updateTokens]);

  return {
    createToken,
    isCreatingToken: is_loading,
    errorCreatingToken: error,
  };
};

export default useCreateToken;

import useAuthContext from '@site/src/hooks/useAuthContext';
import useWS from '@site/src/hooks/useWs';
import { useEffect } from 'react';
import useTokenPage from './useTokenPage';

const useGetTokens = () => {
  const { send: getAllTokens, data, is_loading, error } = useWS('api_token');
  const { is_authorized } = useAuthContext();
  const { updateTokens } = useTokenPage();

  useEffect(() => {
    if (is_authorized) {
      getAllTokens();
    }
  }, [is_authorized, getAllTokens]);

  useEffect(() => {
    if (data) {
      updateTokens(data.tokens);
    }
  }, [data, updateTokens]);

  return {
    getAllTokens,
    isLoadingTokens: is_loading,
    errorLoadingTokens: error,
  };
};

export default useGetTokens;

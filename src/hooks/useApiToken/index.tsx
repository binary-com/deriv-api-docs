import { ApiTokenContext } from '@site/src/contexts/api-token/api-token.context';
import { useContext } from 'react';

const useApiToken = () => {
  return useContext(ApiTokenContext);
};

export default useApiToken;

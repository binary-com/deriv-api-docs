import { useCallback } from 'react';
import { TTokenType } from '@site/src/types';
import useApiToken from '../useApiToken';

const useTokenSelector = () => {
  const { updateCurrentToken } = useApiToken();

  const onSelectToken = useCallback(
    (token: TTokenType) => {
      updateCurrentToken(token);
    },
    [updateCurrentToken],
  );

  return { onSelectToken };
};

export default useTokenSelector;

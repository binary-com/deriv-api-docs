import { getAccountsFromSearchParams } from '@site/src/utils';
import { useCallback } from 'react';
import useAuthContext from '../useAuthContext';

const useAuthParams = () => {
  const { updateLoginAccounts } = useAuthContext();
  const checkUrlParams = useCallback(
    (searchParams: string) => {
      // if we got something in the search params, start processing it otherwise do nothing!
      if (searchParams) {
        const accounts = getAccountsFromSearchParams(searchParams);
        updateLoginAccounts(accounts);
      }
    },
    [updateLoginAccounts],
  );
  return { checkUrlParams };
};

export default useAuthParams;

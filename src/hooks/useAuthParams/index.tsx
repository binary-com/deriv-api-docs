import { getAccountsFromSearchParams } from '@site/src/utils';
import { useCallback } from 'react';
import useRootContext from '../useRootContext';

const useAuthParams = () => {
  const { updateAccounts } = useRootContext();

  const checkUrlParams = useCallback(
    (searchParams: string) => {
      // if we got something in the search params, start processing it otherwise do nothing!
      if (searchParams) {
        const accounts = getAccountsFromSearchParams(searchParams);
        updateAccounts(accounts);
      }
    },
    [updateAccounts],
  );
  return { checkUrlParams };
};

export default useAuthParams;

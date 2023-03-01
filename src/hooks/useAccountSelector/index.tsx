import { useCallback } from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';

const useAccountSelector = () => {
  const { loginAccounts, updateCurrentLoginAccount } = useAuthContext();

  const onSelectAccount = useCallback(
    (accountName: string) => {
      const selected = loginAccounts.find((item) => item.name === accountName);
      updateCurrentLoginAccount(selected);
    },
    [loginAccounts, updateCurrentLoginAccount],
  );

  return { onSelectAccount };
};

export default useAccountSelector;

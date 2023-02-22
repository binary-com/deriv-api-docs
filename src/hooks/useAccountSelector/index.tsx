import { useCallback } from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';

const useAccountSelector = () => {
  const { loginAccounts, updateCurrentLoginAccount } = useAuthContext();

  const onSelectItem = useCallback(
    (accountName: string) => {
      const selected = loginAccounts.find((item) => item.name === accountName);
      updateCurrentLoginAccount(selected);
    },
    [loginAccounts, updateCurrentLoginAccount],
  );

  return { onSelectItem };
};

export default useAccountSelector;

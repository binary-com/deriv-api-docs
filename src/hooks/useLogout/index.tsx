import { useCallback } from 'react';
import useRootContext from '../useRootContext';

const useLogout = () => {
  const { updateAccounts } = useRootContext();

  // we clean up everything related to the user here, for now it's just user's account
  // later on we should clear user tokens as well
  const logout = useCallback(() => {
    updateAccounts([]);
  }, [updateAccounts]);

  return { logout };
};

export default useLogout;

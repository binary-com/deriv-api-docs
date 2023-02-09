import { useCallback } from 'react';
import useAuthContext from '../useAuthContext';

const useLogout = () => {
  const { updateLoginAccounts } = useAuthContext();

  // we clean up everything related to the user here, for now it's just user's account
  // later on we should clear user tokens as well
  const logout = useCallback(() => {
    updateLoginAccounts([]);
  }, [updateLoginAccounts]);

  return { logout };
};

export default useLogout;

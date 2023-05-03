import apiManager from '@site/src/configs/websocket';
import { useCallback } from 'react';
import useAuthContext from '../useAuthContext';

const useLogout = () => {
  const { updateLoginAccounts, updateCurrentLoginAccount } = useAuthContext();

  // we clean up everything related to the user here, for now it's just user's account
  // later on we should clear user tokens as well
  const logout = useCallback(async () => {
    await apiManager.logout();
    updateLoginAccounts([]);
    updateCurrentLoginAccount({
      name: '',
      token: '',
      currency: '',
    });
  }, [updateCurrentLoginAccount, updateLoginAccounts]);

  return { logout };
};

export default useLogout;

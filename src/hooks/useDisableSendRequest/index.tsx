import { useCallback } from 'react';
import useAuthContext from '../useAuthContext';

const useDisableSendRequest = () => {
  const { is_authorized, is_logged_in } = useAuthContext();
  const disableSendRequest = useCallback(
    (auth) => {
      const auth_required = auth === 1;
      if (!auth_required || !is_logged_in || is_authorized) return false;
      return true;
    },
    [is_authorized, is_logged_in],
  );

  return { disableSendRequest };
};

export default useDisableSendRequest;

import { AuthContext } from '@site/src/contexts/auth/auth.context';
import { useContext } from 'react';

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;

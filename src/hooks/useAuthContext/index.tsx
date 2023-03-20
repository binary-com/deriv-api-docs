import { AuthContext } from '@site/src/contexts/auth/auth.context';
import { useContext } from 'react';

const useAuthContext = () => {
  console.log(useContext(AuthContext));
  return useContext(AuthContext);
};

export default useAuthContext;

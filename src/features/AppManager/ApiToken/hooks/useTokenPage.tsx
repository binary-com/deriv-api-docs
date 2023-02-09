import { TokenPageContext } from '@site/src/contexts/tokenPage/token-page.context';
import { useContext } from 'react';

const useTokenPage = () => {
  return useContext(TokenPageContext);
};

export default useTokenPage;

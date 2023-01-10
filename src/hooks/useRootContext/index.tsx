import { RootContext } from '@site/src/contexts/root.context';
import { useContext } from 'react';

const useRootContext = () => {
  return useContext(RootContext);
};

export default useRootContext;

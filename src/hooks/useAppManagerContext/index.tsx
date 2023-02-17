import { AppManagerContext } from '@site/src/contexts/app-manager/app-manager.context';
import React from 'react';

const useAppManagerContext = () => {
  return React.useContext(AppManagerContext);
};

export default useAppManagerContext;

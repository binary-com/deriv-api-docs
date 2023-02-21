import { AppManagerContext } from '@site/src/contexts/app-manager/app-manager.context';
import React from 'react';

const useAppManager = () => {
  return React.useContext(AppManagerContext);
};

export default useAppManager;

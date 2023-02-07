import React from 'react';
import { AppManagerContext } from '@site/src/contexts/AppManager.context';

export const useAppManagerContext = () => {
  return React.useContext(AppManagerContext);
};

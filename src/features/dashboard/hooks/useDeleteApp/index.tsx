import useAppManagerContext from '@site/src/hooks/useAppManagerContext';
import useWS from '@site/src/hooks/useWs';
import { useCallback } from 'react';

export const useDeleteApp = () => {
  const { send, is_loading } = useWS('app_delete');
  const { getApps } = useAppManagerContext();

  const deleteApp = useCallback(
    async (appId: number) => {
      await send({ app_delete: appId });
      getApps();
    },
    [getApps, send],
  );

  return {
    isLoading: is_loading,
    deleteApp,
  };
};

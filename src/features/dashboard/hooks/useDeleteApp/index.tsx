import useAppManager from '@site/src/hooks/useAppManager';
import useWS from '@site/src/hooks/useWs';
import { useCallback } from 'react';

export const useDeleteApp = () => {
  const { data, send, is_loading } = useWS('app_delete');
  const { getApps } = useAppManager();

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
    data,
  };
};

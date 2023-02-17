import useWS from '@site/src/hooks/useWs';
import { useCallback } from 'react';

const useGetApps = () => {
  const { send, data, is_loading, error } = useWS('app_list');

  const getAllApps = useCallback(() => {
    send();
  }, [send]);

  return { getAllApps, apps: data };
};

export default useGetApps;

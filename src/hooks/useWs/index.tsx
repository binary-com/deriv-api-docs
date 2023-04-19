import apiManager from '@site/src/configs/websocket';
import { TSocketEndpointNames, TSocketResponseData } from '@site/src/configs/websocket/types';
import { useCallback, useState } from 'react';

const useWS = <T extends TSocketEndpointNames>(name: T) => {
  const [is_loading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<TSocketResponseData<T>>();

  const clear = useCallback(() => {
    setError(null);
    setData(null);
  }, []);

  const send = useCallback(
    async (data?: Parameters<typeof apiManager.augmentedSend<T>>[1]) => {
      setIsLoading(true);
      try {
        const response = await apiManager.augmentedSend(name, data);
        const key = response['msg_type'] ?? name;
        setData(response[key] as TSocketResponseData<T>);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    },
    [name],
  );

  return { send, is_loading, error, data, clear };
};

export default useWS;

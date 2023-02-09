import apiManager from '@site/src/configs/websocket';
import { TSocketEndpointNames, TSocketResponseData } from '@site/src/configs/websocket/types';
import { useCallback, useState } from 'react';

const useWS = <T extends TSocketEndpointNames>(name: T) => {
  const [is_loading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<TSocketResponseData<T>>();
  const send = useCallback(
    async (data?: Parameters<typeof apiManager.augmentedSend<T>>[1]) => {
      setIsLoading(true);
      try {
        const response = await apiManager.augmentedSend(name, data);
        // based on the tests this condition might not even be satisfied, but for now I'll leave it here ( we have to do manual testing for different kind of calls)
        if (response?.error) {
          setError(response.error);
        } else {
          setData(response[name] as TSocketResponseData<T>);
        }
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    },
    [name],
  );

  return { send, is_loading, error, data };
};

export default useWS;

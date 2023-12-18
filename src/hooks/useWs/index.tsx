import apiManager from '@site/src/configs/websocket';
import {
  TSocketEndpointNames,
  TSocketResponse,
  TSocketResponseData,
} from '@site/src/configs/websocket/types';
import { useCallback, useState } from 'react';

const useWS = <T extends TSocketEndpointNames>(name?: T) => {
  const [is_loading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<TSocketResponseData<T>>();
  const [full_response, setFullResponse] = useState<TSocketResponse<T>>();
  const hash = window.location.hash;

  const clear = useCallback(() => {
    setError(null);
    setData(null);
    setFullResponse(null);
  }, []);

  const send = useCallback(
    async (data?: Parameters<typeof apiManager.augmentedSend<T>>[0]) => {
      let payload = data;
      console.log(hash);

      if (name) {
        if (payload === undefined || name == 'api_token' || name == 'app_register') {
          if (hash === '#api_token') {
            payload = { ...payload };
          } else {
            payload = { [name]: 1, ...payload };
          }
        }
      } else {
        payload = { ...payload };
      }

      setIsLoading(true);

      try {
        const response = await apiManager.augmentedSend(payload);
        const key = response['msg_type'] ?? name;
        setData(response[key] as TSocketResponseData<T>);
        setFullResponse(response);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    },
    [name],
  );

  return { send, full_response, is_loading, error, data, clear };
};

export default useWS;

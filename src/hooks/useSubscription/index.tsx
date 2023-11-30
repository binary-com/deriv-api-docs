import apiManager from '@site/src/configs/websocket';
import {
  TSocketResponse,
  TSocketResponseData,
  TSocketSubscribableEndpointNames,
} from '@site/src/configs/websocket/types';
import { useCallback, useState } from 'react';

type TError = {
  code?: string;
  message?: string;
};

const useSubscription = <T extends TSocketSubscribableEndpointNames>(name: T) => {
  const [is_loading, setIsLoading] = useState(false);
  const [is_subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<TError>();
  const [data, setData] = useState<TSocketResponseData<T>>();
  const [full_response, setFullResponse] = useState<TSocketResponse<T>>();
  const [subscriber, setSubscriber] = useState<{ unsubscribe?: VoidFunction }>();

  const onData = useCallback(
    (response: TSocketResponse<T>) => {
      const key = response['msg_type'] ?? name;
      setData(response[key] as TSocketResponseData<T>);
      setFullResponse(response);
      setIsLoading(false);
    },
    [name],
  );

  const onError = useCallback((response: TSocketResponse<T>) => {
    setError(response.error);
    setIsLoading(false);
    setFullResponse(null);
  }, []);

  const subscribe = useCallback(
    (data: Parameters<typeof apiManager.augmentedSubscribe<T>>[0]) => {
      let payload = data;
      if (name) {
        payload = { [name]: 1, subscribe: 1, ...payload };
      } else {
        payload = { subscribe: 1, ...payload };
      }
      setIsLoading(true);
      setSubscribed(true);
      const subscriber_ref = apiManager.augmentedSubscribe(payload).subscribe(onData, onError);
      setSubscriber(subscriber_ref);
      return subscriber_ref;
    },
    [name, onData, onError],
  );

  const unsubscribe = useCallback(() => {
    subscriber?.unsubscribe?.();
    setSubscribed(false);
  }, [subscriber]);

  return {
    subscribe,
    unsubscribe,
    is_loading,
    is_subscribed,
    error,
    data,
    full_response,
  };
};

export default useSubscription;

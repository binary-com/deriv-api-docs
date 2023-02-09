import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import useWS from '../useWs';
import { useQuery } from 'react-query';
import { useAppManagerContext } from '../useAppManagerContext';
import apiManager from '@site/src/configs/websocket';

export const useApps = () => {
  // const { data, send, error, is_loading } = useWS('app_list')
  const { setIsEmptyState, setIsLoadingApps, is_loading_apps } = useAppManagerContext();

  return useQuery('apps', apiManager.api.app_list, {
    enabled: is_loading_apps,
    onSuccess: (data) => {
      const isEmpty = data?.app_list?.length === 0;
      if (isEmpty) {
        setIsEmptyState(true);
      } else {
        setIsEmptyState(false);
      }
      setIsLoadingApps(false);
    },
    onError: (error) => {
      console.warn(error);
    },
  });
};

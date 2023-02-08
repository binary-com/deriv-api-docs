import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import { useQuery } from 'react-query';
import { useAppManagerContext } from '../useAppManagerContext';

const getApps = async () => {
  const api = new DerivAPIBasic({
    endpoint: 'ws.binaryws.com', // TODO: replace
    lang: 'EN',
    app_id: '1089', // TODO: replace
  });
  await api.authorize('');
  const apps = await api.appList();
  await api.disconnect();
  return apps;
};

export const useApps = () => {
  const { setIsEmptyState, setIsLoadingApps, is_loading_apps } = useAppManagerContext();
  return useQuery('apps', getApps, {
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

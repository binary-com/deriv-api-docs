import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import { useAppManagerContext } from '../useAppManagerContext';
import { useMutation } from 'react-query';

const appDelete = async (created_app_id: number) => {
  // stateService.send('DELETE_APP');
  const api = new DerivAPIBasic({
    // endpoint: server_url(),
    // lang: 'EN',
    // app_id: app_id()
    endpoint: 'ws.binaryws.com',
    lang: 'EN',
    app_id: '1089',
  });
  // TODO: Assign new token to delete apps.
  await api.authorize('');
  await api.appDelete(created_app_id);
  await api.disconnect();
};

export const useDeleteApp = (created_app_id: number) => {
  const { setIsLoadingApps } = useAppManagerContext();
  const { mutate, isLoading } = useMutation((app_id: number) => appDelete(app_id), {
    onSuccess: () => setIsLoadingApps(true),
    onError: (error) => {
      console.warn(error);
    },
  });

  const deleteApp = () => {
    mutate(created_app_id);
  };

  return {
    isLoading,
    deleteApp,
  };
};

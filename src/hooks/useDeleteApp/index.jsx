import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import { useAppManagerContext } from '@site/src/contexts/AppManager.context';
import { useMutation } from 'react-query';
// import { stateService } from '../state/stateSignal';
// import { token1, server_url, app_id } from '../state/storageSignals';

const appDelete = async (created_app_id) => {
  // stateService.send('DELETE_APP');
  const api = new DerivAPIBasic({
    // endpoint: server_url(),
    // lang: 'EN',
    // app_id: app_id()
    endpoint: 'ws.binaryws.com',
    lang: 'EN',
    app_id: '1089',
  });
  console.log('A token is still required');
  // TODO: Assign new token to delete apps.
  await api.authorize('GqD5jIEjuQWMBR8');
  await api.appDelete(created_app_id);
  await api.disconnect();
};

export const useDeleteApp = (created_app_id) => {
  const { setIsLoadingApps } = useAppManagerContext();
  const { mutate, isLoading } = useMutation(() => appDelete(created_app_id), {
    onSuccess: () => {
      // stateService.send('SUCCESS');
      // stateService.send('FETCH_APP_LIST');
      setIsLoadingApps(true);
      console.log('app successfully deleted');
    },
    onError: () => {
      // stateService.send('ERROR');
      console.log('failed to delete app');
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

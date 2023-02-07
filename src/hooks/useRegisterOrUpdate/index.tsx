import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
// import { useSelector } from '@xstate/react';
import { useMutation } from 'react-query';
// import { stateService, updatingRow } from '../state/stateSignal';
// import { server_url, app_id } from '../state/storageSignals';
import { useAppManagerContext } from '../useAppManagerContext';
import { TUpdatingRow } from '@site/src/contexts/AppManager.context';

interface MapFormDataToScopeT {
  read_scope: boolean;
  trade_scope: boolean;
  trading_information_scope: boolean;
  payments_scope: boolean;
  admin_scope: boolean;
}

interface RegisterAppT extends MapFormDataToScopeT {
  api_token_input: string;
  app_name: string;
  app_redirect_uri: string;
  app_verification_uri: string;
  app_markup_percentage: number;
}

type AppRegisterT = {
  token: string;
  name: string;
  redirect_uri: string;
  verification_uri: string;
  app_markup_percentage: number;
  is_update_mode?: boolean;
  scopes: string[];
  updating_row?: TUpdatingRow;
};

const appRegister = async ({
  token,
  name,
  redirect_uri,
  scopes,
  verification_uri,
  app_markup_percentage = 0,
  is_update_mode,
  updating_row,
}: AppRegisterT) => {
  // const [updatingRow, setUpdatingRow] = React.useState({})

  // TODO: Assign proper app_id and edpoint
  const api = new DerivAPIBasic({
    // endpoint: server_url(),
    endpoint: 'ws.binaryws.com',
    lang: 'EN',
    // app_id: app_id(),
    app_id: '1089',
  });
  await api.authorize(token);
  const registerParams = { name, redirect_uri, scopes, app_markup_percentage };
  if (verification_uri) registerParams['verification_uri'] = verification_uri;
  if (is_update_mode) {
    registerParams['app_update'] = updating_row?.app_id;
    await api.send(registerParams);
    await api.disconnect();
  } else {
    registerParams['app_register'] = 1;
    await api.send(registerParams);
    await api.disconnect();
  }
};

const mapFormDataToScope = (form_data: MapFormDataToScopeT) => {
  const scopes: string[] = [];
  if (form_data.read_scope) scopes.push('read');
  if (form_data.trade_scope) scopes.push('trade');
  if (form_data.trading_information_scope) scopes.push('trading_information');
  if (form_data.payments_scope) scopes.push('payments');
  if (form_data.admin_scope) scopes.push('admin');
  return scopes;
};

export const useRegisterOrUpdateApp = () => {
  const { setDialogState, setIsLoadingApps, manager_state, updating_row } = useAppManagerContext();
  const { mutate, isLoading, error } = useMutation(
    ({
      token,
      name,
      redirect_uri,
      scopes,
      verification_uri,
      app_markup_percentage,
      is_update_mode,
    }: AppRegisterT) =>
      appRegister({
        token,
        name,
        redirect_uri,
        scopes,
        verification_uri,
        app_markup_percentage,
        is_update_mode,
        updating_row,
      }),
    {
      onSuccess: () => {
        setIsLoadingApps(true);
        setDialogState('DIALOG_SUCCESS');
      },
      onError: () => setDialogState('DIALOG_ERROR'),
    },
  );

  const registerApp = (form_data: RegisterAppT) => {
    const is_update_mode = manager_state === 'UPDATE_STATE';
    const token = form_data.api_token_input;
    const name = form_data.app_name;
    const redirect_uri = form_data.app_redirect_uri;
    const verification_uri = form_data.app_verification_uri;
    const app_markup_percentage = form_data.app_markup_percentage;
    const scopes = mapFormDataToScope(form_data);
    mutate({
      token,
      name,
      redirect_uri,
      scopes,
      verification_uri,
      app_markup_percentage,
      is_update_mode,
      updating_row,
    });
  };

  return {
    isLoading,
    registerApp,
    error,
  };
};

import React, { useCallback, useState } from 'react';
import useWS from '@site/src/hooks/useWs';
import AppForm from '../components/AppForm';
import { scopesObjectToArray } from '@site/src/utils';
import { RegisterAppDialogError } from '../components/Dialogs/RegisterAppDialogError';
import { RegisterAppDialogSuccess } from '../components/Dialogs/RegisterAppDialogSuccess';
import { IRegisterAppForm } from '../types';
import useAuthContext from '@site/src/hooks/useAuthContext';

const AppRegistration = () => {
  const { send: registerApp, error, clear, data } = useWS('app_register');
  const { currentLoginAccount } = useAuthContext();
  const [form_is_cleared, setFormIsCleared] = useState(false);

  const onSubmit = useCallback(
    (data: IRegisterAppForm) => {
      const { name, redirect_uri, verification_uri, app_markup_percentage } = data;
      const is_demo_account = currentLoginAccount.name.includes('VRTC');

      const has_redirect_uri = redirect_uri !== '' && { redirect_uri };
      const has_verification_uri = verification_uri !== '' && { verification_uri };
      const can_have_markup = !is_demo_account && {
        app_markup_percentage: Number(app_markup_percentage),
      };

      const selectedScopes = scopesObjectToArray({
        admin: data.admin,
        payments: data.payments,
        read: data.read,
        trade: data.trade,
        trading_information: data.trading_information,
      });
      registerApp({
        name,
        ...has_redirect_uri,
        ...has_verification_uri,
        ...can_have_markup,
        scopes: selectedScopes,
      });
      setFormIsCleared(true);
    },
    [registerApp, currentLoginAccount.name],
  );

  return (
    <>
      <AppForm
        submit={onSubmit}
        form_is_cleared={form_is_cleared}
        setFormIsCleared={setFormIsCleared}
      />
      {error && <RegisterAppDialogError error={error} onClose={clear} />}
      {data && <RegisterAppDialogSuccess onClose={clear} />}
    </>
  );
};

export default AppRegistration;

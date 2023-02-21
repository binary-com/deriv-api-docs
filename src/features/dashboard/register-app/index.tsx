import { Button } from '@deriv/ui';
import useWS from '@site/src/hooks/useWs';
import { scopesObjectToArray } from '@site/src/utils';
import React, { useCallback } from 'react';
import AppForm from '../components/AppForm';
import { RegisterAppDialogError } from '../components/Dialogs/RegisterAppDialogError';
import { RegisterAppDialogSuccess } from '../components/Dialogs/RegisterAppDialogSuccess';
import { IRegisterAppForm } from '../types';

const AppRegistration = () => {
  const { is_loading, send: registerApp, error, clear, data } = useWS('app_register');

  const onSubmit = useCallback(
    (data: IRegisterAppForm) => {
      const { name, redirect_uri, verification_uri, app_markup_percentage } = data;

      const selectedScopes = scopesObjectToArray({
        admin: data.admin,
        payments: data.payments,
        read: data.trade,
        trade: data.trade,
        trading_information: data.trading_information,
      });
      registerApp({
        name,
        redirect_uri,
        verification_uri,
        app_markup_percentage: Number(app_markup_percentage),
        scopes: selectedScopes,
      });
    },
    [registerApp],
  );

  const renderButtons = () => {
    return (
      <>
        <Button role='submit' disabled={is_loading}>
          Register Application
        </Button>
      </>
    );
  };

  return (
    <>
      <AppForm renderButtons={renderButtons} submit={onSubmit} />
      {error && <RegisterAppDialogError error={error} onClose={clear} />}
      {data && <RegisterAppDialogSuccess onClose={clear} />}
    </>
  );
};

export default AppRegistration;

import React, { useCallback } from 'react';
import useWS from '@site/src/hooks/useWs';
import AppForm from '../components/AppForm';
import { Button } from '@deriv/ui';
import { scopesObjectToArray } from '@site/src/utils';
import { RegisterAppDialogError } from '../components/Dialogs/RegisterAppDialogError';
import { RegisterAppDialogSuccess } from '../components/Dialogs/RegisterAppDialogSuccess';
import { IRegisterAppForm } from '../types';
import useAuthContext from '@site/src/hooks/useAuthContext';
import styles from '../components/AppForm/app-form.module.scss';

const AppRegistration = () => {
  const { is_loading, send: registerApp, error, clear, data } = useWS('app_register');
  const { currentLoginAccount } = useAuthContext();

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
    },
    [registerApp],
  );

  const renderButtons = () => {
    return (
      <>
        <Button role='submit' disabled={is_loading} className={styles.buttonRadius}>
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

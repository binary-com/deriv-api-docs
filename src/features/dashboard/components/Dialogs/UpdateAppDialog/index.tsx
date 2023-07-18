import React, { useCallback, useEffect } from 'react';
import AppForm from '../../AppForm';
import useWS from '@site/src/hooks/useWs';
import useAppManager from '@site/src/hooks/useAppManager';
import { Button, Modal } from '@deriv/ui';
import { IRegisterAppForm } from '../../../types';
import { ApplicationObject } from '@deriv/api-types';
import { RegisterAppDialogError } from '../RegisterAppDialogError';
import { scopesArrayToObject, scopesObjectToArray } from '@site/src/utils';
import styles from './update-app-dialog.module.scss';
import useAuthContext from '@site/src/hooks/useAuthContext';
import Translate from '@docusaurus/Translate';

interface IUpdateAppDialog {
  app: ApplicationObject;
  onClose: () => void;
}

const UpdateAppDialog = ({ app, onClose }: IUpdateAppDialog) => {
  const { send: updateApp, is_loading, data, error, clear } = useWS('app_update');
  const { currentLoginAccount } = useAuthContext();
  const { getApps } = useAppManager();

  const scopes = scopesArrayToObject(app.scopes);
  const initialValues: Partial<IRegisterAppForm> = {
    ...app,
    ...scopes,
    app_markup_percentage: String(app.app_markup_percentage),
  };

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (data) {
      getApps();
      onClose();
    }
  }, [data, getApps, onClose]);

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
      updateApp({
        app_update: data.app_id,
        name,
        ...has_redirect_uri,
        ...has_verification_uri,
        ...can_have_markup,
        scopes: selectedScopes,
      });
    },
    [updateApp],
  );

  const renderButtons = () => {
    return (
      <div className={styles.buttons}>
        <Button role='submit' disabled={is_loading}>
          <Translate> Update Application</Translate>
        </Button>
        <Button onClick={onClose}>
          <Translate>Cancel</Translate>
        </Button>
      </div>
    );
  };

  return (
    <Modal defaultOpen onOpenChange={onOpenChange}>
      <Modal.Portal>
        <div className='modal-overlay'>
          <Modal.Overlay />
          <Modal.PageContent
            title={'Update App'}
            has_close_button
            has_title_separator
            className={styles.update_dialog}
          >
            <div className={styles.update_app_content}>
              <AppForm
                is_update_mode
                renderButtons={renderButtons}
                submit={onSubmit}
                initialValues={initialValues}
                isUpdating
              />
            </div>
            {error && <RegisterAppDialogError error={error} onClose={clear} />}
          </Modal.PageContent>
        </div>
      </Modal.Portal>
    </Modal>
  );
};

export default UpdateAppDialog;

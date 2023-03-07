import React, { useCallback, useEffect } from 'react';
import AppForm from '../../AppForm';
import useWS from '@site/src/hooks/useWs';
import useAppManager from '@site/src/hooks/useAppManager';
import { Button, Modal } from '@deriv/ui';
import { hasFormUri } from '@site/src/utils';
import { IRegisterAppForm } from '../../../types';
import { ApplicationObject } from '@deriv/api-types';
import { RegisterAppDialogError } from '../RegisterAppDialogError';
import { scopesArrayToObject, scopesObjectToArray } from '@site/src/utils';
import styles from './update-app-dialog.module.scss';

interface IUpdateAppDialog {
  app: ApplicationObject;
  onClose: () => void;
}

const UpdateAppDialog = ({ app, onClose }: IUpdateAppDialog) => {
  const { send: updateApp, is_loading, data, error, clear } = useWS('app_update');
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

      const selectedScopes = scopesObjectToArray({
        admin: data.admin,
        payments: data.payments,
        read: data.trade,
        trade: data.trade,
        trading_information: data.trading_information,
      });
      updateApp({
        app_update: data.app_id,
        name,
        ...hasFormUri(redirect_uri),
        ...hasFormUri(verification_uri),
        app_markup_percentage: Number(app_markup_percentage),
        scopes: selectedScopes,
      });
    },
    [updateApp],
  );

  const renderButtons = () => {
    return (
      <div className={styles.buttons}>
        <Button role='submit' disabled={is_loading}>
          Update Application
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    );
  };

  return (
    <Modal defaultOpen onOpenChange={onOpenChange}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.PageContent
          title={'Update App'}
          has_close_button
          has_title_separator
          className={styles.update_dialog}
        >
          <div className={styles.update_app_content}>
            <AppForm
              renderButtons={renderButtons}
              submit={onSubmit}
              initialValues={initialValues}
              isUpdating
            />
          </div>
          {error && <RegisterAppDialogError error={error} onClose={clear} />}
        </Modal.PageContent>
      </Modal.Portal>
    </Modal>
  );
};

export default UpdateAppDialog;

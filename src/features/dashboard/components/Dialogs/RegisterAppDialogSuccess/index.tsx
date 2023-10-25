import React from 'react';
import { Button, Modal } from '@deriv/ui';
import useAppManager from '@site/src/hooks/useAppManager';
import styles from './register-app-dialog-success.module.scss';

interface IRegisterAppDialogSuccessProps {
  onClose: () => void;
}

export const RegisterAppDialogSuccess = ({ onClose }: IRegisterAppDialogSuccessProps) => {
  const { updateCurrentTab } = useAppManager();

  const onSuccessfulClick = () => {
    updateCurrentTab('MANAGE_APPS');
    window.open('https://t.me/deriv_apps', '_blank');
    onClose();
  };

  return (
    <Modal defaultOpen>
      <Modal.Portal>
        <div className='modal-overlay'>
          <Modal.Overlay />
          <Modal.PageContent has_close_button className={styles.wrapper}>
            <div className={styles.modal}>
              <img src='/img/register_success.svg' />
              <h4 className={styles.title}>Success!</h4>
              <p>You have successfully registered your application.</p>
              <p>You can now start using Deriv API</p>
            </div>
            <div className={styles.buttonWrapper}>
              <Button color='secondary' onClick={onClose} className={styles.btn}>
                Got it
              </Button>
              <Button color='primary' onClick={onSuccessfulClick} className={styles.btn}>
                Join our Telegram Community
              </Button>
            </div>
          </Modal.PageContent>
        </div>
      </Modal.Portal>
    </Modal>
  );
};

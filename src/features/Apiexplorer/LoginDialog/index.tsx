import React, { useCallback } from 'react';
import { Modal } from '@deriv/ui';
import styles from './LoginDialog.module.scss';

type TLoginDialog = {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginDialog = ({ setToggleModal }: TLoginDialog) => {
  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setToggleModal(false);
      }
    },
    [setToggleModal],
  );
  return (
    <Modal defaultOpen onOpenChange={onOpenChange}>
      <Modal.Portal>
        <div className='modal-overlay'>
          <Modal.Overlay />
          <Modal.PageContent title={'Authorization Required'} has_close_button has_title_separator>
            <div className={styles.modal}>Please Login to fetch Response</div>
          </Modal.PageContent>
        </div>
      </Modal.Portal>
    </Modal>
  );
};

export default LoginDialog;

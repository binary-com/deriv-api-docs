import React, { useCallback } from 'react';
import { Modal } from '@deriv/ui';
import styles from '../LoginDialog/LoginDialog.module.scss';

type TVoginDialog = {
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ValidDialog = ({ setIsValid, setToggleModal }: TVoginDialog) => {
  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setIsValid(true);
        setToggleModal(false);
      }
    },
    [setIsValid],
  );
  return (
    <Modal defaultOpen onOpenChange={onOpenChange}>
      <Modal.Portal>
        <div className='modal-overlay'>
          <Modal.Overlay />
          <Modal.PageContent title={'Invalid JSON'} has_close_button className={styles.wrapper}>
            <div className={styles.modal}>Incorrect Syntax</div>
          </Modal.PageContent>
        </div>
      </Modal.Portal>
    </Modal>
  );
};

export default ValidDialog;

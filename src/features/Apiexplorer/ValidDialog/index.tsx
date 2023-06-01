import React, { useCallback } from 'react';
import { Modal } from '@deriv/ui';
import styles from '../LoginDialog/LoginDialog.module.scss';
import Translate from '@docusaurus/Translate';

type TValidDialog = {
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ValidDialog = ({ setIsValid, setToggleModal }: TValidDialog) => {
  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setIsValid(false);
        setToggleModal(false);
      }
    },
    [setIsValid, setToggleModal],
  );
  return (
    <Modal defaultOpen onOpenChange={onOpenChange}>
      <Modal.Portal>
        <div className='modal-overlay'>
          <Modal.Overlay />
          <Modal.PageContent
            title={'Invalid JSON'}
            has_close_button
            className={styles.validwrapper}
          >
            <div className={styles.validmodal}>
              <Translate>
                Your JSON object is invalid. Please make sure you provide the correct syntax for
                your JSON object.
              </Translate>
            </div>
          </Modal.PageContent>
        </div>
      </Modal.Portal>
    </Modal>
  );
};

export default ValidDialog;

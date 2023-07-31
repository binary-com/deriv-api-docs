import React, { useCallback } from 'react';
import { Button, Modal } from '@deriv/ui';
import styles from './token-creation-dialog-sucess.module.scss';

type ITokenCreationDialogSuccessProps = {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TokenCreationDialogSuccess = ({
  setToggleModal,
}: ITokenCreationDialogSuccessProps) => {
  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setToggleModal(false);
      }
    },
    [setToggleModal],
  );
  const handleToggle = () => {
    setToggleModal(false);
  };

  return (
    <Modal defaultOpen onOpenChange={onOpenChange}>
      <Modal.Portal>
        <div className='modal-overlay'>
          <Modal.Overlay />
          <Modal.PageContent
            title={'Token created successfully'}
            has_close_button
            className={styles.wrapper}
          >
            <div className={styles.modal}>
              <p>Your API token is ready to be used.</p>
            </div>

            <div className={styles.buttonWrapper}>
              <Button color='primary' onClick={handleToggle} className={styles.btn}>
                OK
              </Button>
            </div>
          </Modal.PageContent>
        </div>
      </Modal.Portal>
    </Modal>
  );
};

export default TokenCreationDialogSuccess;

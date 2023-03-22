import React, { useMemo, useCallback } from 'react';
import { Modal } from '@deriv/ui';
import { TModalActionButton } from '@deriv/ui/dist/types/src/components/core/modal/types';

type TCopyTokenDialog = {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  copyToken: () => void;
};

const CopyTokenDialog = ({ setToggleModal, copyToken }: TCopyTokenDialog) => {
  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setToggleModal(false);
      }
    },
    [setToggleModal],
  );

  const actionButtons: TModalActionButton[] = useMemo(
    () => [
      {
        id: 0,
        text: 'Nevermind',
        color: 'secondary',
        onClick: () => {
          setToggleModal(false);
        },
      },
      {
        id: 1,
        text: 'OK',
        color: 'primary',
        onClick: () => {
          setToggleModal(false);
          copyToken();
        },
      },
    ],
    [setToggleModal],
  );

  return (
    <Modal defaultOpen onOpenChange={onOpenChange}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.DialogContent
          has_close_button
          content={
            'Be careful who you share this token with. Anyone with this token can perform the following actions on your account: Add accounts, Create or delete API tokens for trading and withdrawals, Modify account settings.'
          }
          action_buttons={actionButtons}
        />
      </Modal.Portal>
    </Modal>
  );
};

export default CopyTokenDialog;

import React, { useState } from 'react';
import { TModalActionButton } from '@deriv/ui/dist/types/src/components/core/modal/types';
import { Modal } from '@deriv/ui';

type TError = {
  error?: {
    code: string;
    message: string;
  };
};

type TRegisterAppDialogError = {
  error: TError;
  onClose: () => void;
};

export const RegisterAppDialogError = ({ error, onClose }: TRegisterAppDialogError) => {
  const [isOpen, setIsOpen] = useState(true);

  const actionButtons: TModalActionButton[] = [
    {
      id: 1,
      text: 'Got it',
      color: 'secondary',
      onClick: () => {
        setIsOpen(false);
        onClose();
      },
    },
  ];

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    onClose();
  };

  const catchError = () => {
    if (error && error.error?.code === 'InvalidToken') {
      return 'Enter your API token (with the Admin scope) to register your app.';
    } else if (error) {
      return error.error?.message;
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.DialogContent
          title='Error!'
          content={catchError()}
          action_buttons={actionButtons}
          has_close_button
        />
      </Modal.Portal>
    </Modal>
  );
};

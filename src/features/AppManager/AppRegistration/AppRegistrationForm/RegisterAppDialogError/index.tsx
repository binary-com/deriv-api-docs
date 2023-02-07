import React from 'react';
import { useAppManagerContext } from '@site/src/hooks/useAppManagerContext';
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
};

export const RegisterAppDialogError = ({ error }: TRegisterAppDialogError) => {
  const { dialog_state, setDialogState } = useAppManagerContext();
  const dialog_is_open: boolean = dialog_state === 'DIALOG_ERROR';

  const actionButtons: TModalActionButton[] = [
    {
      id: 1,
      text: 'Got it',
      color: 'secondary',
      onClick: () => {
        setDialogState('');
      },
    },
  ];

  if (!dialog_is_open) {
    return null;
  }

  const catchError = () => {
    if (error && error.error?.code === 'InvalidToken') {
      return 'Enter your API token (with the Admin scope) to register your app.';
    } else if (error) {
      return error.error?.message;
    }
  };

  return (
    <Modal open={dialog_is_open} onOpenChange={() => setDialogState('')}>
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

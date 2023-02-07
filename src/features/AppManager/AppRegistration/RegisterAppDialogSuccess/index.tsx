import React from 'react';
import { useAppManagerContext } from '@site/src/hooks/useAppManagerContext';
import { TModalActionButton } from '@deriv/ui/dist/types/src/components/core/modal/types';
import { Modal } from '@deriv/ui';

export const RegisterAppDialogSuccess = () => {
  const { manager_state, dialog_state, setDialogState, setManagerState } = useAppManagerContext();
  const is_updating = manager_state === 'UPDATE_STATE';
  const dialog_is_open = dialog_state === 'DIALOG_SUCCESS';
  const description = is_updating
    ? 'Your app has been updated successfully.'
    : 'You have successfully registered your application. You can now start using Deriv API.';
  const primaryButtonText = is_updating ? null : 'Manage application';

  if (!dialog_is_open) {
    return null;
  }

  const actionButtons: TModalActionButton[] = [
    {
      id: 1,
      text: primaryButtonText,
      color: 'primary',
      onClick: () => {
        setDialogState('');
        setManagerState('MANAGE_STATE');
      },
    },
    {
      id: 1,
      text: 'Got it',
      color: 'secondary',
      onClick: () => {
        setDialogState('');
        setManagerState('MANAGE_STATE');
      },
    },
  ];

  return (
    <Modal open={dialog_is_open} onOpenChange={() => setDialogState('')}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.DialogContent
          title='Success!'
          content={description}
          action_buttons={actionButtons}
          has_close_button
          should_prevent_close_on_click_outside
        />
      </Modal.Portal>
    </Modal>
  );
};

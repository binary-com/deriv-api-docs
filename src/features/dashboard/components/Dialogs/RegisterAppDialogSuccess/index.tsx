import React, { useMemo, useState } from 'react';
import { TModalActionButton } from '@deriv/ui/dist/types/src/components/core/modal/types';
import { Modal } from '@deriv/ui';
import useAppManager from '@site/src/hooks/useAppManager';

interface IRegisterAppDialogSuccessProps {
  isUpdating?: boolean;
}

export const RegisterAppDialogSuccess = ({ isUpdating }: IRegisterAppDialogSuccessProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { updateCurrentTab } = useAppManager();

  const description = useMemo(
    () =>
      isUpdating
        ? 'Your app has been updated successfully.'
        : 'You have successfully registered your application. You can now start using Deriv API.',
    [isUpdating],
  );

  const primaryButtonText = isUpdating ? null : 'Manage application';

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const actionButtons: TModalActionButton[] = useMemo(
    () => [
      {
        id: 1,
        text: primaryButtonText,
        color: 'primary',
        onClick: () => {
          updateCurrentTab('MANAGE_APPS');
          setIsOpen(false);
        },
      },
      {
        id: 1,
        text: 'Got it',
        color: 'secondary',
        onClick: () => {
          setIsOpen(false);
        },
      },
    ],
    [primaryButtonText, updateCurrentTab],
  );

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
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

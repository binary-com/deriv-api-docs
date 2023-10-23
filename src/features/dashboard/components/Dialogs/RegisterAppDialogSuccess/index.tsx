import React, { useMemo } from 'react';
import { TModalActionButton } from '@deriv/ui/dist/types/src/components/core/modal/types';
import { Modal } from '@deriv/ui';
import useAppManager from '@site/src/hooks/useAppManager';

interface IRegisterAppDialogSuccessProps {
  onClose: () => void;
}

export const RegisterAppDialogSuccess = ({ onClose }: IRegisterAppDialogSuccessProps) => {
  const { updateCurrentTab } = useAppManager();

  const actionButtons: TModalActionButton[] = useMemo(
    () => [
      {
        id: 0,
        text: 'Join our Telegram Community',
        color: 'primary',
        onClick: () => {
          updateCurrentTab('MANAGE_APPS');
          window.open('https://t.me/deriv_apps', '_blank');
          onClose();
        },
      },
      {
        id: 1,
        text: 'Got it',
        color: 'secondary',
        onClick: () => {
          onClose();
        },
      },
    ],
    [onClose, updateCurrentTab],
  );

  return (
    <Modal defaultOpen>
      <Modal.Portal>
        <div className='modal-overlay'>
          <Modal.Overlay />
          <Modal.DialogContent
            title='Success!'
            content={
              'You have successfully registered your application. You can now start using Deriv API.'
            }
            action_buttons={actionButtons}
            has_close_button
            should_prevent_close_on_click_outside
          />
        </div>
      </Modal.Portal>
    </Modal>
  );
};

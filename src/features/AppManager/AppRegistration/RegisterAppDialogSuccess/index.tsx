import React from 'react';
import { useAppManagerContext } from '@site/src/contexts/AppManager.context';
const Modal = React.lazy(() => import('@site/src/components/Modal'));

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
  return (
    <React.Suspense fallback={<div />}>
      <Modal
        open={dialog_is_open}
        title='Success!'
        description={description}
        primaryButtonText={primaryButtonText}
        secondaryButtonText='Got it'
        type='success'
        onRequestClose={() => setDialogState('')}
        onPrimaryButtonClick={() => setManagerState('MANAGE_STATE')}
        onSecondaryButtonClick={() => setDialogState('')}
      />
    </React.Suspense>
  );
};

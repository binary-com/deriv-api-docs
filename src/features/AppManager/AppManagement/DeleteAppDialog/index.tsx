import React from 'react';
import { useAppManagerContext } from '@site/src/contexts/AppManager.context';
const Modal = React.lazy(() => import('@site/src/components/Modal'));

type TDeleteAppDialog = {
  deleteApp: () => void;
};

export default function DeleteAppDialogLazy({ deleteApp }: TDeleteAppDialog): React.ReactElement {
  const { dialog_state, setDialogState } = useAppManagerContext();
  const dialog_is_open = dialog_state === 'DIALOG_DELETE';
  return (
    <React.Suspense fallback={<div />}>
      <Modal
        open={dialog_is_open}
        title='Delete app'
        description='Are you sure you want to delete this app?'
        primaryButtonText='Yes, delete'
        secondaryButtonText='No, keep it'
        type='warning'
        onRequestClose={() => setDialogState('')}
        onPrimaryButtonClick={() => {
          deleteApp();
          setDialogState('');
        }}
        onSecondaryButtonClick={() => setDialogState('')}
      />
    </React.Suspense>
  );
}

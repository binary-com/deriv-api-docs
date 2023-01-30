import React from 'react';
import DelayedFallback from '@site/src/components/DelayedFallback';
import { useAppManagerContext } from '@site/src/contexts/AppManager.context';
const Modal = React.lazy(() => import('@site/src/components/Modal'));

type TError = {
  error: {
    code: string;
    message: string;
  };
};

type TRegisterAppDialogError = {
  error: TError;
};

export default function RegisterAppDialogError({ error }: TRegisterAppDialogError) {
  const { dialog_state, setDialogState } = useAppManagerContext();
  const dialog_is_open: boolean = dialog_state === 'DIALOG_ERROR';

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
    <React.Suspense fallback={<DelayedFallback />}>
      <Modal
        open={dialog_is_open}
        title='Error!'
        description={catchError()}
        secondaryButtonText='Got it'
        type='warning'
        onRequestClose={() => setDialogState('')}
        onSecondaryButtonClick={() => setDialogState('')}
      />
    </React.Suspense>
  );
}

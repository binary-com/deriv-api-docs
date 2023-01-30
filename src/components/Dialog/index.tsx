import React from 'react';
import styles from './Dialog.module.scss';

type TDialog = {
  closeOnOutsideClick: boolean;
  onRequestClose: () => void;
  open: boolean;
  children: React.ReactNode[] | HTMLElement[];
};

type TDialogRef = React.RefObject<HTMLDialogElement>;

export const Dialog = ({ closeOnOutsideClick, onRequestClose, open, ...children }: TDialog) => {
  const dialog_ref = React.useRef<HTMLDialogElement>(null);

  useDialogOpening(dialog_ref, open);
  useDialogClosing(dialog_ref, onRequestClose);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog_node = dialog_ref?.current;
    if (closeOnOutsideClick && event?.target === dialog_node) {
      onRequestClose();
    }
  };

  return (
    <dialog ref={dialog_ref} className={styles.dialogWrapper} onClick={handleOutsideClick}>
      <div className={styles.dialogContent} {...children} />
    </dialog>
  );
};

const useDialogOpening = (dialog_ref: TDialogRef, open: boolean) => {
  const lastActiveElement = React.useRef<HTMLDialogElement>(null);
  React.useEffect(() => {
    const dialog_node = dialog_ref?.current;
    if (open) {
      dialog_node?.showModal();
    } else {
      dialog_node?.close();
      lastActiveElement?.current?.focus();
    }
  }, [open]);
};

const useDialogClosing = (dialog_ref: TDialogRef, onRequestClose: () => void) => {
  React.useEffect(() => {
    const dialog_node = dialog_ref?.current;
    const handleCancel: EventListener = (event) => {
      event.preventDefault();
      onRequestClose();
    };
    dialog_node?.addEventListener('cancel', handleCancel);
    return () => {
      dialog_node?.removeEventListener('cancel', handleCancel);
    };
  }, [onRequestClose]);
};

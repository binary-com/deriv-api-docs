import React from 'react';
import useLoginUrl from '@site/src/hooks/useLoginUrl';
import { Modal, Button } from '@deriv/ui';
import styles from './LoginDialog.module.scss';

export const LoginDialog = (visible) => {
  const { getUrl } = useLoginUrl();

  const handleClick = () => {
    location.assign(getUrl('en'));
  };

  const handleSignUp = () => {
    location.assign('https://deriv.com/signup/');
  };
  if (visible?.visible) {
    return (
      <Modal defaultOpen>
        <Modal.Portal>
          <div className='modal-overlay'>
            <Modal.Overlay />
            <Modal.PageContent
              title={'Authorisation required'}
              has_close_button
              className={styles.wrapper}
            >
              <div className={styles.modal}>Log in or sign up to continue.</div>
              <div className={styles.buttonWrapper}>
                <Button color='tertiary' onClick={handleSignUp} className={styles.btn}>
                  Sign up
                </Button>
                <Button color='primary' onClick={handleClick} className={styles.btn}>
                  Log in
                </Button>
              </div>
            </Modal.PageContent>
          </div>
        </Modal.Portal>
      </Modal>
    );
  }
  return null;
};

export default LoginDialog;

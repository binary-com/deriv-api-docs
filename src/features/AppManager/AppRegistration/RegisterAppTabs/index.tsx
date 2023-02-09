import React from 'react';
import { useAppManagerContext } from '@site/src/hooks/useAppManagerContext';
import { useStateClass } from '@site/src/hooks/useStateClass';
import styles from './RegisterAppTabs.module.scss';

export default function RegisteredAppTabs() {
  const { setManagerState } = useAppManagerContext();
  return (
    <div className={`${styles.registeredAppsTabs} ${useStateClass(styles)}`}>
      <button
        onClick={() => setManagerState('TOKEN_STATE')}
        id='token_button'
        className={styles.tokenButton}
      >
        <label>Manage tokens</label>
      </button>
      <button
        onClick={() => setManagerState('REGISTER_STATE')}
        id='register_button'
        className={styles.registerButton}
      >
        <label>Register application</label>
      </button>
      <button
        onClick={() => setManagerState('MANAGE_STATE')}
        id='manage_button'
        className={styles.manageButton}
      >
        <label>Manage applications</label>
      </button>
    </div>
  );
}

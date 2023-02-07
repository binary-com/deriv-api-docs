import React from 'react';
import styles from './AppManagementEmpty.module.scss';
import { useAppManagerContext } from '@site/src/hooks/useAppManagerContext';
import { Button } from '@deriv/ui';

export default function AppManagementEmpty() {
  const { setManagerState } = useAppManagerContext();
  return (
    <div className={styles.noAppsWrapper} data-testid='management-empty'>
      <div className={styles.noApps}>
        <div className={styles.noAppsIcon} />
        <div className={styles.noAppsText}>
          <p>To see your details reflected, please register your app via the registration form.</p>
        </div>
        <Button color='secondary' onClick={() => setManagerState('REGISTER_STATE')}>
          Register now
        </Button>
      </div>
    </div>
  );
}

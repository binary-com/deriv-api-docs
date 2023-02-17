import React from 'react';
import styles from './no-apps.module.scss';
import { Button, Text } from '@deriv/ui';
import useAppManagerContext from '@site/src/hooks/useAppManagerContext';

export default function AppManagementEmpty() {
  const { updateCurrentTab } = useAppManagerContext();
  return (
    <div className={styles.noAppsWrapper}>
      <div className={styles.noApps}>
        <div className={styles.noAppsIcon} />
        <div className={styles.noAppsText}>
          <Text as={'p'} type={'paragraph-1'}>
            To see your details reflected, please register your app via the registration form.
          </Text>
        </div>
        <Button color='secondary' onClick={() => updateCurrentTab('REGISTER_APP')}>
          Register now
        </Button>
      </div>
    </div>
  );
}

import React from 'react';
import styles from './AppManager.module.scss';
import RegisteredAppTabs from './AppRegistration/RegisterAppTabs';
import AppRegistrationLogin from './AppRegistration/AppRegistrationLogin';
import AppRegistrationForm from './AppRegistration/AppRegistrationForm/AppRegistrationForm';
import { Text } from '@deriv/ui';
import { AppManagementLazy } from './AppManagement/AppManagementLazy';
import { RegisterAppDialogSuccess } from './AppRegistration/RegisterAppDialogSuccess';
import { useAppManagerContext } from '@site/src/contexts/AppManager.context';

export const AppManager = () => {
  const { manager_state } = useAppManagerContext();
  const is_updating = manager_state === 'UPDATE_STATE';
  const is_managing = manager_state === 'MANAGE_STATE';
  const is_registering = manager_state === 'REGISTER_STATE' || manager_state === '';
  return (
    <div id='app-registration-machine' data-testid='app-manager' className={styles.registerAppForm}>
      {/* <AppRegistrationLogin /> */}
      <div className={styles.appRegistrationLoggedIn}>
        <div className={styles.appRegistrationHeader}>
          <Text as='h2' type='heading-2' align='center'>
            Your apps
          </Text>
          <Text as='p' type='subtitle-2' align='center'>
            Register your app, get an app ID, and start using the Deriv API
          </Text>
        </div>
        <RegisteredAppTabs />
        {(is_registering || is_updating) && (
          <div className={styles.registerApp}>
            <AppRegistrationForm />
            <RegisterAppDialogSuccess />
          </div>
        )}
        {is_managing && <AppManagementLazy />}
      </div>
    </div>
  );
};

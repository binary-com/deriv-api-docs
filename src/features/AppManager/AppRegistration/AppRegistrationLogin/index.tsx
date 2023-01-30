import React from 'react';
import { Text, Button } from '@deriv/ui';
import styles from './AppRegistrationLogin.module.scss';
export default function AppRegistrationLogin() {
  return (
    <div className={styles.appRegistrationLogin}>
      <div className={styles.loginImage} />
      <Text type='paragraph-1' align='center' bold>
        Log in to your Deriv account to get the API token and start using our API.
      </Text>
      <a href='#' id='registerLogin' className={styles.registerLoginButton}>
        <Button>Log in to my Deriv account</Button>
      </a>
    </div>
  );
}

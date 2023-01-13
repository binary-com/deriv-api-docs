import { Button, Text } from '@deriv/ui';
import { loginUrl } from '../../utils/loginurls';
import React from 'react';
import styles from './Login.module.scss';

export const Login = () => {
  return (
    <div className={styles.login} data-testid='login'>
      <div className={styles.loginImage} role='image' />
      <Text type='paragraph-1' align='center' bold role='heading'>
        Log in to your Deriv account to get the API token and start using our API.
      </Text>
      <Button color='primary' onClick={() => (window.location.href = loginUrl({ language: 'en' }))}>
        Log In
      </Button>
    </div>
  );
};

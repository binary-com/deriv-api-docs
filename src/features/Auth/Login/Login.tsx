import { Button, Text } from '@deriv/ui';
import React from 'react';
import styles from './Login.module.scss';
import useLoginUrl from '@site/src/hooks/useLoginUrl';

export const Login = () => {
  const { getUrl } = useLoginUrl('en');
  const handleClick = () => {
    window.location.href = getUrl();
  };
  return (
    <div className={styles.login} data-testid='login'>
      <div className={styles.loginImage} role='image' />
      <Text type='paragraph-1' align='center' bold role='heading'>
        Log in to your Deriv account to get the API token and start using our API.
      </Text>
      <Button color='primary' onClick={handleClick}>
        Log In
      </Button>
    </div>
  );
};

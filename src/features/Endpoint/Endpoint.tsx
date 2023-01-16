import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Text } from '@deriv/ui';
import styles from './Endpoint.module.scss';

const EndPoint = () => {
  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const default_endpoint = {
    app_id: '31063',
    server_url: 'green.binary.com',
  };

  const [app_id, setAppId] = useState('');
  const [server_url, setServerUrl] = useState('');

  const handleClick = () => {
    localStorage.setItem('config.app_id', app_id);
    localStorage.setItem('config.server_url', server_url);
  };

  useEffect(() => {
    setAppId(localStorage.getItem('config.app_id') || default_endpoint.app_id);
    setServerUrl(localStorage.getItem('config.server_url') || default_endpoint.server_url);
  }, []);
  return (
    <React.Fragment>
      <form
        onSubmit={() => {
          handleClick();
        }}
        data-testid='Endpoint'
      >
        <div className={styles.pageContent}>
          <Text type='heading-2' align='center' bold role='heading'>
            Change API endpoint
          </Text>
          <div className={styles.content}>
            <div className={styles.customTextInput} id='custom-text-input'>
              <div className={styles.inputField}>
                <label className={styles.inlineLabel}>Server_URL</label>
                <input
                  {...register('server_url', {
                    required: {
                      value: true,
                      message: 'Server is Required',
                    },
                    pattern: {
                      value: /^([\w-]+\.)+[\w-]+(`[\w- ;,./?%&=])*?$/,
                      message: 'Please enter a valid server URL',
                    },
                  })}
                  name='server_url'
                  value={server_url}
                  placeholder='e.g. frontend.binaryws.com'
                  className={styles.textInput}
                  onChange={(e) => setServerUrl(e.target.value)}
                  required
                />
                {errors.server_url && (
                  <span className={styles.errorMessage}>{errors.server_url?.message}</span>
                )}
              </div>
              <div className={styles.inputField}>
                <label className={styles.inlineLabel}>App_id</label>
                <input
                  {...register('app_id', {
                    required: {
                      value: true,
                      message: 'App ID is required',
                    },
                    pattern: {
                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                      message: 'Please enter a valid app ID',
                    },
                  })}
                  name='app_id'
                  className={styles.textInput}
                  value={app_id}
                  placeholder='e.g. 9999'
                  onChange={(e) => setAppId(e.target.value)}
                  required
                />
                {errors.app_id && (
                  <span className={styles.errorMessage}>{errors.app_id?.message}</span>
                )}
              </div>
            </div>
            <div className={styles.buttons}>
              <Button type='submit' color='primary'>
                Submit
              </Button>
              <span style={{ marginLeft: '1.6rem' }} />
              <Button
                type='reset'
                color='secondary'
                onClick={() => {
                  localStorage.removeItem('config.app_id');
                  localStorage.removeItem('config.server_url');
                  location.replace('/app-registration/');
                  window.location.reload();
                }}
                className={styles.resetButton}
              >
                Reset to original settings
              </Button>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default EndPoint;

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Text } from '@deriv/ui';
import { getAppId } from '@site/src/utils';
import { OAUTH_URL } from '@site/src/utils/constants';
import styles from './Endpoint.module.scss';

interface IEndpointFormValues {
  app_id: string;
  server_url: string;
}
const EndPoint = () => {
  const default_endpoint = {
    app_id: getAppId(),
    server_url: OAUTH_URL,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEndpointFormValues>({
    mode: 'all',
    defaultValues: {
      server_url: localStorage.getItem('config.server_url') ?? default_endpoint.server_url,
      app_id: localStorage.getItem('config.app_id') ?? default_endpoint.app_id,
    },
  });

  const refreshWhenSubmitted = () => window.location.reload();

  const onSubmit = (data: IEndpointFormValues) => {
    localStorage.setItem('config.app_id', data.app_id);
    localStorage.setItem('config.server_url', data.server_url);
    refreshWhenSubmitted();
  };

  const onResetClicked = () => {
    localStorage.removeItem('config.app_id');
    localStorage.removeItem('config.server_url');
    refreshWhenSubmitted();
  };

  const server_url = localStorage.getItem('config.server_url') ?? default_endpoint.server_url;
  const app_id = localStorage.getItem('config.app_id') ?? default_endpoint.app_id;
  const current_url = `wss://${server_url}/websockets/v3?app_id=${app_id}&l=EN&brand=deriv`;

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)} aria-label='form'>
        <div className={styles.pageContent}>
          <Text type='heading-2' as={'h2'} align='center' bold role='heading'>
            Change API endpoint
          </Text>
          <div className={styles.content}>
            <div className={styles.customTextInput} id='custom-text-input'>
              <div className={styles.inputField}>
                <input
                  {...register('server_url', {
                    required: {
                      value: true,
                      message: 'Server is Required',
                    },
                    pattern: {
                      value: /^([\w-]+\.)+[\w-]+(`[\w- ;,./?%&=])*?$/, // TODO: it's better to check if the server url contains qa or not ( for qa box server urls )
                      message: 'Please enter a valid server URL',
                    },
                  })}
                  name='server_url'
                  placeholder='e.g. frontend.binaryws.com'
                  className={styles.textInput}
                  required
                />
                <label className={styles.inlineLabel}>Server URL</label>
                {errors.server_url && (
                  <div data-testid='server_error' className={styles.errorMessage}>
                    {errors.server_url.message}
                  </div>
                )}
              </div>
              <div className={styles.inputField}>
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
                  placeholder='e.g. 9999'
                  required
                />
                <label className={styles.inlineLabel}>App ID</label>
                {errors.app_id && (
                  <div data-testid='app_id_error' className={styles.errorMessage}>
                    {errors.app_id.message}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.currentUrl}>
              <span className={styles.urlLabel}>Connected to :</span>
              <div className={styles.urlLink}>{current_url}</div>
            </div>
            <div className={styles.buttons}>
              <Button type='submit' color='primary' disabled={Object.keys(errors).length > 0}>
                Submit
              </Button>
              <span style={{ marginLeft: '1.6rem' }} />
              <Button
                type='reset'
                color='secondary'
                onClick={onResetClicked}
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

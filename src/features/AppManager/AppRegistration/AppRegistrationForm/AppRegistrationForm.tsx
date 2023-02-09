import React from 'react';
import { RegisterAppDialogError } from './RegisterAppDialogError';
import { Text, Button } from '@deriv/ui';
import { useForm } from 'react-hook-form';
// import { useRegisterOrUpdateApp } from '@site/src/hooks/useRegisterOrUpdate';
import { useAppManagerContext } from '@site/src/hooks/useAppManagerContext';
import { useStateClass } from '@site/src/hooks/useStateClass';
import useWS from '@site/src/hooks/useWs';
import styles from './AppRegistrationForm.module.scss';

interface FormData {
  api_token_input: string;
  app_name: string;
  app_markup_percentage: number;
  app_redirect_uri: string;
  app_verification_uri: string;
  read_scope: boolean;
  trade_scope: boolean;
  trading_information_scope: boolean;
  payments_scope: boolean;
  admin_scope: boolean;
}

export default function AppRegistrationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormData>({ mode: 'onBlur' });
  const { setManagerState, manager_state, updating_row } = useAppManagerContext();
  const { data, is_loading, error, send } = useWS('app_register');
  const is_updating: boolean = manager_state === 'UPDATE_STATE';
  const is_registering: boolean = manager_state === 'REGISTER_STATE' || manager_state === '';

  React.useEffect(() => {
    if (is_registering) reset();
    if (is_updating) {
      const { name, app_markup_percentage, redirect_uri, verification_uri, scopes } = updating_row;

      setValue('api_token_input', '');
      setValue('app_name', name);
      setValue('app_markup_percentage', app_markup_percentage);
      setValue('app_redirect_uri', redirect_uri);
      setValue('app_verification_uri', verification_uri);
      setValue('read_scope', scopes.includes('read') ? true : false);
      setValue('trade_scope', scopes.includes('trade') ? true : false);
      setValue('trading_information_scope', scopes.includes('trading_information') ? true : false);
      setValue('payments_scope', scopes.includes('payments') ? true : false);
      setValue('admin_scope', scopes.includes('admin') ? true : false);
    }
  }, [is_updating, is_registering]);

  const registerButtonMessage = is_updating ? 'Update application' : 'Register as application';

  return (
    <React.Fragment>
      <form
        className={styles.frmNewApplication}
        id='frmNewApplication'
        onSubmit={handleSubmit((form_data) => {
          send({
            name: form_data.app_name,
            scopes: ['read'], // TODO: Have to update the scopes with the form data scopes
          });
        })}
        data-testid='app-registration-form'
      >
        <div className={styles.formContent}>
          <fieldset>
            <div className={styles.formHeaderContainer}>
              <Text as='p' type='paragraph-1' bold>
                App information
              </Text>
              <Text as='p' type='paragraph-1'>
                Paste your API token with the admin scope here.
              </Text>
            </div>
            <div className={`api-token-wrapper ${useStateClass(styles)}`}>
              <div className={styles.customTextInput} id='custom-text-input'>
                <input
                  {...register('api_token_input', {
                    required: {
                      value: true,
                      message: 'Enter your API token (with the Admin scope) to register your app.',
                    },
                    maxLength: {
                      value: 255,
                      message: 'Your API token cannot exceed 255 characters.',
                    },
                  })}
                  type='text'
                  id='api_token_input'
                  className={styles.apiTokenInput}
                  readOnly={is_updating}
                  placeholder=' '
                />
                <label data-testid='api-token-label' htmlFor='api_token_input'>
                  API token (required)
                </label>
              </div>
              {errors.api_token_input && (
                <Text as='span' type='paragraph-1' className='error-message'>
                  {errors.api_token_input.message}
                </Text>
              )}
              <div className='api-token-warning' />
              <div className='first'>
                <div className={styles.customTextInput} id='custom-text-input'>
                  <input
                    {...register('app_name', {
                      required: {
                        value: true,
                        message: 'Enter your app name.',
                      },
                      maxLength: {
                        value: 48,
                        message: 'Your app name cannot exceed 48 characters.',
                      },
                    })}
                    type='text'
                    id='app_name'
                    placeholder=' '
                  />
                  <label data-testid='app-name-label' htmlFor='app_name'>
                    App name (required)
                  </label>
                </div>
                {errors.app_name && (
                  <Text as='span' type='paragraph-1' className='error-message'>
                    {errors.app_name.message}
                  </Text>
                )}
              </div>
            </div>
          </fieldset>
          <div className={styles.expandableForm}>
            <fieldset>
              <div className={styles.formHeaderContainer}>
                <h4 className={styles.registerFormHeader} data-testid='markup-title'>
                  Markup
                </h4>
                <div className={styles.description}>
                  <Text as='span' type='paragraph-1'>
                    You can earn commission by adding a markup to the price of each trade. Enter
                    your markup percentage here.
                  </Text>
                </div>
              </div>
              <div className='input-container'>
                <div>
                  <div className={styles.customTextInput} id='custom-text-input'>
                    <input
                      {...register('app_markup_percentage', {
                        pattern: {
                          value: /^((([0-4]\.([0-9]([0-9])?)?))||([5]\.([0]([0])?)?)||([0-5]))$/,
                          message:
                            'Your markup value must be equal to or above 0.00 and no more than 5.00.',
                        },
                        maxLength: {
                          value: 4,
                          message: 'Your markup value cannot be more than 4 characters.',
                        },
                      })}
                      type='number'
                      step='0.01'
                      id='app_markup_percentage'
                      className='last'
                      placeholder=' '
                      // eslint-disable-next-line
                      onWheel={(e: any) => e.target.blur()}
                    />
                    <label data-testid='markup-label' htmlFor='app_markup_percentage'>
                      Markup percentage (optional)
                    </label>
                  </div>
                  <Text as='p' type='paragraph-1' className={styles.helperText}>
                    If you don&lsquo;t want to earn a markup, enter 0 here. Otherwise, enter a
                    number up to 5. Maximum: 5.00%.
                  </Text>
                  {errors.app_markup_percentage && (
                    <Text as='span' type='paragraph-1' className='error-message'>
                      {errors.app_markup_percentage.message}
                    </Text>
                  )}
                </div>
              </div>
              <div className={styles.formHeaderContainer}>
                <h4 className={styles.registerFormHeader}>OAuth details</h4>
                <div className={styles.description}>
                  <Text as='span' type='paragraph-1'>
                    This allows clients to log in to your app using their Deriv accounts without an
                    API token.
                  </Text>
                </div>
              </div>
              <div className='input-container'>
                <div className={styles.customTextInput} id='custom-text-input'>
                  <input
                    {...register('app_redirect_uri', {
                      maxLength: {
                        value: 255,
                        message: 'Your website URL cannot exceed 255 characters.',
                      },
                      pattern: {
                        value: /^[a-z][a-z0-9.+-]*:\/\/[0-9a-zA-Z.-]+[%/\w .-]*$/,
                        message: 'Enter a valid URL. (Example: https://www.[yourname].com)',
                      },
                    })}
                    id='app_redirect_uri'
                    type='text'
                    placeholder=' '
                    data-testid='authorisation-input'
                  />
                  <label data-testid='authorisation-label' htmlFor='app_redirect_uri'>
                    Authorisation URL (optional)
                  </label>
                </div>
                <p className={styles.helperText}>
                  *Please note that this URL will be used as the OAuth redirect URL for the OAuth
                  authorisation.
                </p>
              </div>
              {errors.app_redirect_uri && (
                <span className='error-message'>{errors.app_redirect_uri.message}</span>
              )}
              <div className='input-container'>
                <div className={styles.customTextInput} id='custom-text-input'>
                  <input
                    {...register('app_verification_uri', {
                      maxLength: {
                        value: 255,
                        message: 'Your verification URL cannot exceed 255 characters.',
                      },
                      pattern: {
                        value: /^[a-z][a-z0-9.+-]*:\/\/[0-9a-zA-Z.-]+[%/\w .-]*$/,
                        message: 'Enter a valid URL. (Example: https://www.[yourname].com)',
                      },
                    })}
                    id='app_verification_uri'
                    type='text'
                    placeholder=' '
                    data-testid='verification-input'
                  />
                  <label data-testid='verification-label' htmlFor='app_verification_uri'>
                    Verification URL (optional)
                  </label>
                </div>
              </div>
              {errors.app_verification_uri && (
                <span className='error-message'>{errors.app_verification_uri.message}</span>
              )}
            </fieldset>
            <div className={styles.scopes} id='register_scopes'>
              <div>
                <div className={styles.formHeaderContainer}>
                  <h4 className={styles.registerFormHeader}>Scope of authorisation</h4>
                  <div className={styles.description}>
                    <span>Select the scope for your app:</span>
                  </div>
                </div>
              </div>
              <div className={styles.scopesField}>
                <div className={styles.customCheckboxContainer}>
                  <input
                    {...register('read_scope')}
                    id='read-scope'
                    type='checkbox'
                    data-testid='read-scope'
                  />
                  <span className={styles.customCheckbox} />
                </div>
                <label htmlFor='read-scope'>
                  <b>Read</b>: You&apos;ll have full access to your clients&apos; information.
                </label>
              </div>
              <div className={styles.scopesField}>
                <div className={styles.customCheckboxContainer}>
                  <input
                    {...register('trade_scope')}
                    id='trade-scope'
                    type='checkbox'
                    data-testid='trade-scope'
                  />
                  <span className={styles.customCheckbox} />
                </div>
                <label htmlFor='trade-scope'>
                  <b>Trade</b>: You&apos;ll be able to buy and sell contracts on your clients&apos;
                  behalf.
                </label>
              </div>
              <div className={styles.scopesField}>
                <div className={styles.customCheckboxContainer}>
                  <input
                    {...register('trading_information_scope')}
                    id='trading_information-scope'
                    data-testid='trading-info-scope'
                    type='checkbox'
                  />
                  <span className={styles.customCheckbox} />
                </div>
                <label htmlFor='trading_information-scope'>
                  <b>Trading information</b>: You&lsquo;ll be able to view your clients&rsquo;
                  trading information, including their account balance.
                </label>
              </div>
              <div className={styles.scopesField}>
                <div className={styles.customCheckboxContainer}>
                  <input
                    {...register('payments_scope')}
                    id='payments-scope'
                    data-testid='payments-scope'
                    type='checkbox'
                  />
                  <span className={styles.customCheckbox} />
                </div>
                <label htmlFor='payments-scope'>
                  <b>Payments</b>: You&lsquo;ll be able to perform deposits and withdrawals on your
                  clients&rsquo; behalf.
                </label>
              </div>
              <div className={`${styles.scopesField} mb-0`}>
                <div className={styles.customCheckboxContainer}>
                  <input
                    {...register('admin_scope')}
                    id='admin-scope'
                    data-testid='admin-scope'
                    type='checkbox'
                  />
                  <span className={styles.customCheckbox} />
                </div>
                <label htmlFor='admin-scope'>
                  <b>Admin</b>: Full account access, including the access to manage security tokens.
                </label>
              </div>
            </div>
            {errors.admin_scope && (
              <span className='error-message'>{errors.admin_scope.message}</span>
            )}
            <div className={styles.termsOfConditionRegister}>
              <span>
                By registering your application, you acknowledge that you&lsquo;ve read and accepted
                the Deriv API{' '}
              </span>
              <a
                href='https://deriv.com/tnc/business-partners-api-user.pdf'
                target='_blank'
                rel='noreferrer'
              >
                <span>terms and conditions</span>
              </a>
              <span>.</span>
            </div>
            <div className={styles.registerAppButtonContainer}>
              <React.Fragment>
                {is_updating && (
                  <Button color='secondary' onClick={() => setManagerState('MANAGE_STATE')}>
                    Cancel
                  </Button>
                )}
                <Button role='button' disabled={is_loading || Object.keys(errors)?.length > 0}>
                  {registerButtonMessage}
                </Button>
              </React.Fragment>
            </div>
          </div>
        </div>
        <input type='hidden' id='app_id' name='app_id' />
      </form>
      <RegisterAppDialogError error={error} />
    </React.Fragment>
  );
}

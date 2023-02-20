import React, { ReactNode, useMemo } from 'react';

import { Text } from '@deriv/ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useApiToken from '@site/src/hooks/useApiToken';
import { appRegisterSchema, IRegisterAppForm } from '../../types';
import styles from './app-form.module.scss';

type TAppFormProps = {
  initialValues?: Partial<IRegisterAppForm>;
  isUpdating?: boolean;
  renderButtons: () => ReactNode;
  submit: (data: IRegisterAppForm) => void;
};

const AppForm = ({ initialValues, submit, renderButtons }: TAppFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterAppForm>({
    mode: 'onBlur',
    resolver: yupResolver(appRegisterSchema),
    defaultValues: initialValues,
  });
  const { tokens } = useApiToken();

  const adminTokens = useMemo(() => {
    return tokens.filter((item) => item.scopes.includes('admin'));
  }, [tokens]);

  return (
    <React.Fragment>
      <form role={'form'} className={styles.apps_form} onSubmit={handleSubmit(submit)}>
        <div className={styles.formContent}>
          <div className={styles.formHeaderContainer}>
            <Text as='p' type='paragraph-1' bold>
              App information
            </Text>
            <Text as='p' type='paragraph-1'>
              Select your api token ( it should have admin scope )
            </Text>
          </div>
          <div className={`api-token-wrapper`}>
            <div id='custom-text-input'>
              <select
                {...register('api_token')}
                placeholder={'Please select Api Token'}
                defaultValue={''}
                id='api_token_input'
                data-testid={'select-token'}
              >
                <option value={''}>Please select Api Token</option>
                {adminTokens.map((item) => (
                  <option key={item.display_name} value={item.display_name}>
                    {item.display_name}
                  </option>
                ))}
              </select>
            </div>
            {errors.api_token && (
              <Text as='span' type='paragraph-1' className='error-message'>
                {errors.api_token.message}
              </Text>
            )}
            <div className='first'>
              <div className={styles.customTextInput} id='custom-text-input'>
                <input {...register('name')} type='text' id='app_name' placeholder=' ' />
                <label htmlFor='app_name'>App name (required)</label>
              </div>
              {errors.name && (
                <Text as='span' type='paragraph-1' className='error-message'>
                  {errors.name.message}
                </Text>
              )}
            </div>
          </div>
          <div>
            <div className={styles.formHeaderContainer}>
              <h4>Markup</h4>
              <div>
                <Text as='span' type='paragraph-1'>
                  You can earn commission by adding a markup to the price of each trade. Enter your
                  markup percentage here.
                </Text>
              </div>
            </div>
            <div>
              <div>
                <div className={styles.customTextInput} id='custom-text-input'>
                  <input
                    {...register('app_markup_percentage')}
                    type='number'
                    step='0.01'
                    id='app_markup_percentage'
                    className='last'
                    defaultValue={0}
                    placeholder=' '
                  />
                  <label htmlFor='app_markup_percentage'>Markup percentage (optional)</label>
                </div>
                <Text as='p' type='paragraph-1' className={styles.helperText}>
                  If you don&lsquo;t want to earn a markup, enter 0 here. Otherwise, enter a number
                  up to 5. Maximum: 5.00%.
                </Text>
                {errors.app_markup_percentage && (
                  <Text as='span' type='paragraph-1' className='error-message'>
                    {errors.app_markup_percentage.message}
                  </Text>
                )}
              </div>
            </div>
            <div className={styles.formHeaderContainer}>
              <h4>OAuth details</h4>
              <div>
                <Text as='span' type='paragraph-1'>
                  This allows clients to log in to your app using their Deriv accounts without an
                  API token.
                </Text>
              </div>
            </div>
            <div>
              <div className={styles.customTextInput} id='custom-text-input'>
                <input
                  {...register('redirect_uri')}
                  id='app_redirect_uri'
                  type='text'
                  placeholder=' '
                />
                <label htmlFor='app_redirect_uri'>Authorization URL (optional)</label>
              </div>
              <p className={styles.helperText}>
                *Please note that this URL will be used as the OAuth redirect URL for the OAuth
                authorization.
              </p>
              {errors.redirect_uri && (
                <span className='error-message'>{errors.redirect_uri.message}</span>
              )}
            </div>

            <div>
              <div className={styles.customTextInput} id='custom-text-input'>
                <input
                  {...register('verification_uri')}
                  id='app_verification_uri'
                  type='text'
                  placeholder=' '
                />
                <label htmlFor='app_verification_uri'>Verification URL (optional)</label>
              </div>
              {errors.verification_uri && (
                <span className='error-message'>{errors.verification_uri.message}</span>
              )}
            </div>

            <div className={styles.scopes} id='register_scopes'>
              <div>
                <div className={styles.formHeaderContainer}>
                  <h4>Scope of authorization</h4>
                  <div>
                    <span>Select the scope for your app:</span>
                  </div>
                </div>
              </div>
              <div className={styles.customCheckboxContainer}>
                <div>
                  <input {...register('read')} id='read-scope' type='checkbox' />
                  <span className={styles.customCheckbox} />
                </div>
                <label htmlFor='read-scope'>
                  <b>Read</b>: You&apos;ll have full access to your clients&apos; information.
                </label>
              </div>
              <div className={styles.customCheckboxContainer}>
                <div>
                  <input {...register('trade')} id='trade-scope' type='checkbox' />
                  <span className={styles.customCheckbox} />
                </div>
                <label htmlFor='trade-scope'>
                  <b>Trade</b>: You&apos;ll be able to buy and sell contracts on your clients&apos;
                  behalf.
                </label>
              </div>
              <div className={styles.customCheckboxContainer}>
                <div>
                  <input
                    {...register('trading_information')}
                    id='trading_information-scope'
                    type='checkbox'
                  />
                  <span className={styles.customCheckbox} />
                </div>
                <label htmlFor='trading_information-scope'>
                  <b>Trading information</b>: You&lsquo;ll be able to view your clients&rsquo;
                  trading information, including their account balance.
                </label>
              </div>
              <div className={styles.customCheckboxContainer}>
                <div>
                  <input {...register('payments')} id='payments-scope' type='checkbox' />
                  <span className={styles.customCheckbox} />
                </div>
                <label htmlFor='payments-scope'>
                  <b>Payments</b>: You&lsquo;ll be able to perform deposits and withdrawals on your
                  clients&rsquo; behalf.
                </label>
              </div>
              <div className={`${styles.customCheckboxContainer} mb-0`}>
                <div>
                  <input {...register('admin')} id='admin-scope' type='checkbox' />
                  <span className={styles.customCheckbox} />
                </div>
                <label htmlFor='admin-scope'>
                  <b>Admin</b>: Full account access, including the access to manage security tokens.
                </label>
              </div>
            </div>
            <div className={styles.termsOfConditionRegister}>
              <span>
                By registering your application, you acknowledge that you&lsquo;ve read and accepted
                the Deriv API
              </span>
              <a
                href='https://deriv.com/tnc/business-partners-api-user.pdf'
                target='_blank'
                rel='noreferrer'
              >
                <span>terms and conditions</span>
              </a>
            </div>
            {renderButtons && <div className={styles.submit_container}>{renderButtons()}</div>}
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AppForm;

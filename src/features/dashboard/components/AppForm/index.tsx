import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { Text } from '@deriv/ui';
import { useForm } from 'react-hook-form';
import { CURRENCY_MAP } from '@site/src/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { appRegisterSchema, IRegisterAppForm } from '../../types';
import CurrencyIcon from '@site/src/components/CurrencyIcon';
import useApiToken from '@site/src/hooks/useApiToken';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useTokenSelector from '@site/src/hooks/useTokenSelector';
import useAccountSelector from '@site/src/hooks/useAccountSelector';
import styles from './app-form.module.scss';

type TIsNotDemoCurrency = {
  name: string;
  currency: string;
};

type TAppFormProps = {
  initialValues?: Partial<IRegisterAppForm>;
  isUpdating?: boolean;
  renderButtons: () => ReactNode;
  submit: (data: IRegisterAppForm) => void;
};

type TTokenItem = {
  scopes?: ('read' | 'trade' | 'payments' | 'trading_information' | 'admin')[];
  display_name?: string;
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
  const [token_name, setTokenName] = useState('');
  const [user_account, setUserAccount] = useState('');
  const [is_toggle_dropdown, setToggleDropdown] = useState(false);
  const { onSelectToken } = useTokenSelector();
  const { onSelectAccount } = useAccountSelector();
  const { tokens, currentToken } = useApiToken();
  const { loginAccounts, currentLoginAccount } = useAuthContext();
  const toggle_dropdown = is_toggle_dropdown ? styles.active : styles.inactive;

  const filterAndSelectToken = () => {
    for (let i = 0; i < tokens.length; i++) {
      const token_item = Object.values(tokens[i]);
      if (token_item.includes(token_name)) onSelectToken(tokens[i]);
    }
  };

  useEffect(() => {
    if (user_account !== '') onSelectAccount(user_account);
  }, [user_account]);

  useEffect(() => {
    if (token_name !== '') filterAndSelectToken();
  }, [token_name]);

  const adminTokens = useMemo(() => {
    return tokens.filter((item) => item.scopes.includes('admin'));
  }, [tokens]);

  const current_admin_token = currentToken?.display_name && currentToken.scopes.includes('admin');

  const selectAccount = (name: string) => {
    setUserAccount(name);
    setToggleDropdown(!is_toggle_dropdown);
  };

  const getCurrencyName = (currency: string) => CURRENCY_MAP.get(currency).name;

  const isNotDemoCurrency = (account: TIsNotDemoCurrency) => {
    const currency = account.name.includes('VRTC') ? 'Demo' : account.currency;
    return currency;
  };

  const isNotCurrentAccount = (account_name: string) => {
    return account_name !== currentLoginAccount.name;
  };

  const isNotCurrentToken = (token_item: TTokenItem) => {
    const is_not_admin_token =
      token_item.display_name !== currentToken.display_name && token_item.scopes.includes('admin');
    return is_not_admin_token;
  };

  return (
    <React.Fragment>
      <form role={'form'} className={styles.apps_form} onSubmit={handleSubmit(submit)}>
        <div className={styles.formContent}>
          <div>
            <div className={styles.apiTokenWrapper}>
              <div className={styles.formHeaderContainer}>
                <Text as='p' type='paragraph-1' bold>
                  App information
                </Text>
                <Text as='p' type='paragraph-1'>
                  Select your api token ( it should have admin scope )
                </Text>
              </div>
              <div className={styles.customSelectField}>
                <div
                  tabIndex={0}
                  className={styles.selectWrapper}
                  onClick={() => setToggleDropdown(!is_toggle_dropdown)}
                  onKeyDown={(e) => e.key === 'ArrowDown' && setToggleDropdown(!is_toggle_dropdown)}
                >
                  <div className={styles.selectedAccount}>
                    <CurrencyIcon currency={isNotDemoCurrency(currentLoginAccount)} />
                    <div className={styles.accountInfoContainer}>
                      <div className={styles.accountType}>
                        {getCurrencyName(currentLoginAccount?.currency)}
                      </div>
                      <div className={styles.accountId}>{currentLoginAccount?.name}</div>
                    </div>
                  </div>
                  <div className='select-label'>Choose your account</div>
                  <input
                    {...register('currency_account')}
                    type='hidden'
                    value={currentLoginAccount?.name ? currentLoginAccount.name : ''}
                    id='api_token_input'
                    data-testid={'select-account'}
                  />
                  <div className={`${styles.customSelectDropdown} ${toggle_dropdown}`}>
                    {loginAccounts.map((accountItem) => (
                      <React.Fragment key={accountItem.name}>
                        {isNotCurrentAccount(accountItem.name) && (
                          <div
                            tabIndex={0}
                            className={styles.customSelectItem}
                            onClick={() => selectAccount(accountItem.name)}
                            onKeyDown={(e) => e.key === 'Enter' && selectAccount(accountItem.name)}
                          >
                            <CurrencyIcon currency={isNotDemoCurrency(accountItem)} />
                            <div className={styles.accountInfoContainer}>
                              <div className={styles.accountType}>
                                {getCurrencyName(isNotDemoCurrency(accountItem))}
                              </div>
                              <div className={styles.accountId}>{accountItem.name}</div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <Text as='span' type='paragraph-1' className='error-message'>
                  This account doesn&lsquo;t have API tokens with the admin scope. Choose another
                  account.
                </Text>
              </div>
              <div className={styles.customSelectField}>
                <div className={styles.selectWrapper}>
                  <select
                    {...register('currency_account')}
                    placeholder={'Choose your account'}
                    defaultValue={''}
                    id='api_token_input'
                    data-testid={'select-account'}
                    onChange={(e) => onSelectAccount(e.target.value)}
                    required
                  >
                    <option value={currentLoginAccount?.name ? currentLoginAccount.name : ''}>
                      {currentLoginAccount?.name ? currentLoginAccount.name : 'Choose your account'}
                    </option>
                    {loginAccounts.map((accountItem) => (
                      <React.Fragment key={accountItem.name}>
                        {isNotCurrentAccount(accountItem.name) && (
                          <option key={accountItem.name} value={accountItem.name}>
                            {accountItem.name}
                          </option>
                        )}
                      </React.Fragment>
                    ))}
                  </select>
                </div>
                <div className='select-label'>Choose your account</div>
                <Text as='span' type='paragraph-1' className='error-message'>
                  This account doesn&lsquo;t have API tokens with the admin scope. Choose another
                  account.
                </Text>
              </div>
              <div className={styles.customSelectField}>
                <div className={styles.selectWrapper}>
                  <select
                    {...register('api_token')}
                    placeholder={'Please select Api Token'}
                    defaultValue={''}
                    id='api_token_input'
                    data-testid={'select-token'}
                    onChange={(e) => setTokenName(e.target.value)}
                    required
                  >
                    <option value={current_admin_token ? currentToken.display_name : ''}>
                      {current_admin_token
                        ? currentToken.display_name
                        : 'Choose your API token with the admin scope'}
                    </option>
                    {adminTokens.map((item) => (
                      <React.Fragment key={item.display_name}>
                        {isNotCurrentToken(item) && (
                          <option key={item.display_name} value={item.display_name}>
                            {item.display_name}
                          </option>
                        )}
                      </React.Fragment>
                    ))}
                  </select>
                </div>
                <div className='select-label'>Choose your API token with the admin scope</div>
                {errors.api_token && (
                  <Text as='span' type='paragraph-1' className='error-message'>
                    {errors.api_token.message}
                  </Text>
                )}
              </div>
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

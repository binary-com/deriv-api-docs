import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { Button, Text } from '@deriv/ui';
import { useForm } from 'react-hook-form';
import { Circles } from 'react-loader-spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import { scopesObjectToArray } from '@site/src/utils';
import ApiTokenCard from '../ApiTokenCard';
import useCreateToken from '@site/src/features/dashboard/hooks/useCreateToken';
import useApiToken from '@site/src/hooks/useApiToken';
import * as yup from 'yup';
import styles from './api-token.form.module.scss';

const schema = yup
  .object({
    read: yup.boolean(),
    trade: yup.boolean(),
    payments: yup.boolean(),
    trading_information: yup.boolean(),
    admin: yup.boolean(),
    name: yup
      .string()
      .required()
      .max(32, 'Only up to 32 characters are allowed.')
      .matches(/^[a-z0-9_\-\s]*$/, {
        message: 'Only alphanumeric characters with spaces and underscores are allowed.',
        excludeEmptyString: true,
      })
      .matches(/^(?!\s)[a-z0-9_\-\s]*(?<!\s)$/, {
        message: 'No whitespace is allowed at the beginning or the end of the name.',
        excludeEmptyString: true,
      }),
  })
  .required();

export type TApiTokenForm = yup.InferType<typeof schema>;
export type TApiTokenFormItemsNames = keyof TApiTokenForm;

type TScope = {
  name: TApiTokenFormItemsNames;
  description: string;
  label: string;
};

const scopes: TScope[] = [
  {
    name: 'read',
    description:
      'This scope will allow third-party apps to view your account activity, settings, limits, balance sheets, trade purchase history, and more.',
    label: 'Read',
  },
  {
    name: 'trade',
    description:
      'This scope will allow third-party apps to buy and sell contracts for you, renew your expired purchases, and top up your demo accounts.',
    label: 'Trade',
  },
  {
    name: 'payments',
    description:
      'This scope will allow third-party apps to withdraw to payment agents and make inter-account transfers for you.',
    label: 'Payments',
  },
  {
    name: 'trading_information',
    description: 'This scope will allow third-party apps to view your trading history.',
    label: 'Trading Information',
  },
  {
    name: 'admin',
    description:
      'This scope will allow third-party apps to open accounts for you, manage your settings and token usage, and more.',
    label: 'Admin',
  },
];

const ApiTokenForm = (props: HTMLAttributes<HTMLFormElement>) => {
  const [input_value, setInputValue] = useState('');
  const [token_names, setTokenNames] = useState([]);
  const [is_invalid_token, setIsInvalidToken] = useState(false);
  const { createToken, isCreatingToken } = useCreateToken();
  const { tokens } = useApiToken();

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<TApiTokenForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  useEffect(() => {
    if (tokens.length > 0) {
      tokens.forEach((token_object) => {
        setTokenNames((prevState) => [...prevState, token_object.display_name]);
      });
    }
  }, [tokens]);

  useEffect(() => {
    if (token_names.includes(input_value)) {
      setIsInvalidToken(true);
    } else {
      setIsInvalidToken(false);
    }
  }, [input_value, token_names]);

  const onSubmit = useCallback(
    (data: TApiTokenForm) => {
      const { name } = data;
      const selectedTokenScope = scopesObjectToArray({
        admin: data.admin,
        payments: data.payments,
        read: data.read,
        trade: data.trade,
        trading_information: data.trading_information,
      });
      createToken(name, selectedTokenScope);
      reset();
    },
    [createToken, reset],
  );

  const onCardClick = useCallback(
    (name: TApiTokenFormItemsNames) => {
      const values = getValues();
      setValue(name, !values[name]);
    },
    [getValues, setValue],
  );

  return (
    <form role={'form'} onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className={styles.steps_line} />
      <div>
        <Circles
          height='100'
          width='100'
          color='#d44c0d'
          ariaLabel='circles-loading'
          wrapperClass='loading'
          visible={isCreatingToken}
        />
        <div className={styles.step_title}>
          <div className={`${styles.first_step} ${styles.step}`}>
            <Text as={'p'} type={'paragraph-1'} data-testid={'first-step-title'}>
              Select scopes based on the access you need.
            </Text>
          </div>
        </div>
        <div className={styles.card_wrapper}>
          {scopes.map((item) => (
            <ApiTokenCard
              data-testid={`api-token-card-${item.name}`}
              key={item.name}
              name={item.name}
              label={item.label}
              description={item.description}
              onClick={() => {
                onCardClick(item.name);
              }}
              register={register}
            />
          ))}
        </div>
        <div className={styles.step_title}>
          <div className={`${styles.second_step} ${styles.step}`}>
            <Text as={'p'} type={'paragraph-1'} data-testid={'second-step-title'}>
              Name your token and click on Create to generate your token.
            </Text>
          </div>
        </div>
        <div
          onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
          className={styles.customTextInput}
        >
          <input type='text' name='name' {...register('name')} placeholder='Token name' />
          <Button disabled={is_invalid_token} type='submit'>
            Create
          </Button>
        </div>
        {errors && errors?.name && (
          <Text as='span' type='paragraph-1' className='error-message'>
            {errors.name?.message}
          </Text>
        )}
        {is_invalid_token && (
          <div className='error-message'>
            <p>That name is taken. Choose another.</p>
          </div>
        )}
        <div className={styles.helperText}>
          <p>Length of token name must be between 2 and 32 characters.</p>
        </div>
        <div className={styles.step_title}>
          <div className={`${styles.third_step} ${styles.step}`}>
            <Text as={'p'} type={'paragraph-1'} data-testid={'third-step-title'}>
              Copy and paste the token into the app.
            </Text>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ApiTokenForm;

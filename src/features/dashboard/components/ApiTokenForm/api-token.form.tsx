import React, { HTMLAttributes, useCallback, useState } from 'react';
import { Button, Text } from '@deriv/ui';
import { useForm } from 'react-hook-form';
import { Circles } from 'react-loader-spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import { scopesObjectToArray } from '@site/src/utils';
import ApiTokenCard from '../ApiTokenCard';
import useCreateToken from '@site/src/features/dashboard/hooks/useCreateToken';
import * as yup from 'yup';
import styles from './api-token.form.module.scss';
import Translate from '@docusaurus/Translate';

const schema = yup
  .object({
    read: yup.boolean(),
    trade: yup.boolean(),
    payments: yup.boolean(),
    trading_information: yup.boolean(),
    admin: yup.boolean(),
    name: yup.string().required(),
  })
  .required();

export type TApiTokenForm = yup.InferType<typeof schema>;
export type TApiTokenFormItemsNames = keyof TApiTokenForm;

type TScope = {
  name: TApiTokenFormItemsNames;
  description: React.ReactNode;
  label: string;
};

const scopes: TScope[] = [
  {
    name: 'read',
    description: (
      <Translate>
        This scope will allow third-party apps to view your account activity, settings, limits,
        balance sheets, trade purchase history, and more.
      </Translate>
    ),
    label: 'Read',
  },
  {
    name: 'trade',
    description: (
      <Translate>
        This scope will allow third-party apps to buy and sell contracts for you, renew your expired
        purchases, and top up your demo accounts.
      </Translate>
    ),
    label: 'Trade',
  },
  {
    name: 'payments',
    description: (
      <Translate>
        This scope will allow third-party apps to withdraw to payment agents and make inter-account
        transfers for you.
      </Translate>
    ),
    label: 'Payments',
  },
  {
    name: 'trading_information',
    description: (
      <Translate>This scope will allow third-party apps to view your trading history.</Translate>
    ),
    label: 'Trading Information',
  },
  {
    name: 'admin',
    description: (
      <Translate>
        This scope will allow third-party apps to open accounts for you, manage your settings and
        token usage, and more.
      </Translate>
    ),
    label: 'Admin',
  },
];

const ApiTokenForm = (props: HTMLAttributes<HTMLFormElement>) => {
  const { createToken, isCreatingToken } = useCreateToken();

  const { handleSubmit, register, setValue, getValues } = useForm<TApiTokenForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

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
    },
    [createToken],
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
              <Translate>Select scopes based on the access you need.</Translate>
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
              <Translate>Name your token and click on Create to generate your token.</Translate>
            </Text>
          </div>
        </div>
        <div className={styles.customTextInput}>
          <input type='text' name='name' {...register('name')} placeholder='Token name' />
          <Button type='submit'>Create</Button>
        </div>
        <div className={styles.helperText}>
          <p>Length of token name must be between 2 and 32 characters.</p>
        </div>
        <div className={styles.step_title}>
          <div className={`${styles.third_step} ${styles.step}`}>
            <Text as={'p'} type={'paragraph-1'} data-testid={'third-step-title'}>
              <Translate>Copy and paste the token into the app.</Translate>
            </Text>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ApiTokenForm;

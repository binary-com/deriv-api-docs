import { Button, Text } from '@deriv/ui';
import React, { HTMLAttributes, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './api-token.form.module.scss';
import ApiTokenCard from '../ApiTokenCard';
import { Circles } from 'react-loader-spinner';
import { scopesObjectToArray } from '@site/src/utils';
import useCreateToken from '@site/src/features/dashboard/hooks/useCreateToken';

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
        read: data.trade,
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
      <Circles
        height='100'
        width='100'
        color='#d44c0d'
        ariaLabel='circles-loading'
        wrapperClass='loading'
        visible={isCreatingToken}
      />
      <Text as={'p'} type={'paragraph-1'} data-testid={'first-step-title'}>
        Select scopes based on the access you need.
      </Text>
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
      <Text as={'p'} type={'paragraph-1'} data-testid={'second-step-title'}>
        Name your token and click on Create to generate your token.
      </Text>
      <div className={styles.customTextInput}>
        <input type='text' name='name' {...register('name')} />
        <Button type='submit'>Create</Button>
      </div>
    </form>
  );
};

export default ApiTokenForm;

import { Text } from '@deriv/ui';
import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './api-token.card.module.scss';
import { TApiTokenForm, TApiTokenFormItemsNames } from '../ApiTokenForm/api-token.form';

interface IApiTokenCardPros extends HTMLAttributes<HTMLDivElement> {
  register: UseFormRegister<TApiTokenForm>;
  name: TApiTokenFormItemsNames;
  label: string;
  description: string;
}

const ApiTokenCard = ({ register, name, label, description, ...rest }: IApiTokenCardPros) => {
  return (
    <div className={clsx(styles.api_token_card)} {...rest}>
      <div className={styles.api_token_card_input}>
        <input name={name} type={'checkbox'} {...register(name)} />
        <label data-testid={'card-label'} htmlFor={name}>
          {label}
        </label>
      </div>
      <Text role={'definition'} as={'p'} type={'small'}>
        {description}
      </Text>
    </div>
  );
};

export default ApiTokenCard;

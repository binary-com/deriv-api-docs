import React, { HTMLAttributes } from 'react';
import { Text } from '@deriv/ui';
import { TApiTokenForm, TApiTokenFormItemsNames } from '../ApiTokenForm/api-token.form';
import { UseFormRegister } from 'react-hook-form';
import CustomCheckbox from '@site/src/components/CustomCheckbox';
import clsx from 'clsx';
import styles from './api-token.card.module.scss';

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
        <CustomCheckbox name={name} id={`${name}-scope`} register={register(name)} />
        <label data-testid={'card-label'} htmlFor={`${name}-scope`}>
          {label}
        </label>
      </div>
      <Text role={'definition'} as={'p'} type={'small'}>
        {description}
      </Text>
      <React.Fragment>
        {name === 'admin' && (
          <div className={styles.warning_container}>
            <img className={styles.warning_image} src='/img/warning.svg' />
            <p>
              <b>Note:</b> Do not share tokens with the Admin scope with unauthorised parties.
            </p>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};

export default ApiTokenCard;

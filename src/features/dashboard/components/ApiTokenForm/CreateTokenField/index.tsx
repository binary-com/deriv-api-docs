import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Text, Button } from '@deriv/ui';
import styles from '../api-token.form.module.scss';
import useApiToken from '@site/src/hooks/useApiToken';
import { FieldErrorsImpl, UseFormRegisterReturn } from 'react-hook-form';

type TCreateTokenField = {
  register: UseFormRegisterReturn;
  errors: Partial<
    FieldErrorsImpl<{
      read: boolean;
      trade: boolean;
      payments: boolean;
      trading_information: boolean;
      admin: boolean;
      name: string;
    }>
  >;
  form_is_cleared: boolean;
  setFormIsCleared: Dispatch<SetStateAction<boolean>>;
};

const CreateTokenField = ({
  errors,
  register,
  form_is_cleared,
  setFormIsCleared,
}: TCreateTokenField) => {
  const { tokens } = useApiToken();
  const [input_value, setInputValue] = useState('');

  useEffect(() => {
    if (form_is_cleared) {
      setInputValue('');
      setFormIsCleared(false);
    }
  }, [form_is_cleared]);

  const getTokenNames = useMemo(() => {
    const token_names = [];
    for (const token_object of tokens) {
      const token_name = token_object.display_name.toLowerCase();
      token_names.push(token_name);
    }
    return token_names;
  }, [tokens]);

  const token_name_exists = getTokenNames.includes(input_value.toLowerCase());
  const no_min_max_error =
    (errors && errors.name?.type === 'min') || (errors && errors.name?.type === 'max');
  const disable_button = token_name_exists || Object.keys(errors).length > 0 || input_value === '';
  const error_border_active = token_name_exists || errors.name;

  return (
    <React.Fragment>
      <div className={styles.step_title}>
        <div className={`${styles.second_step} ${styles.step}`}>
          <Text as={'p'} type={'paragraph-1'} data-testid={'second-step-title'}>
            Name your token and click on Create to generate your token.
          </Text>
        </div>
      </div>
      <div
        onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
        className={`${styles.customTextInput} ${error_border_active ? 'error-border' : ''}`}
      >
        <input
          className={`${error_border_active ? 'error-border' : ''}`}
          type='text'
          name='name'
          {...register}
          placeholder='Token name'
        />
        <Button disabled={disable_button} type='submit'>
          Create
        </Button>
      </div>
      {errors && errors.name && (
        <Text as='span' type='paragraph-1' className='error-message'>
          {errors.name.message}
        </Text>
      )}
      {token_name_exists && (
        <div className='error-message'>
          <p>That name is taken. Choose another.</p>
        </div>
      )}
      {!no_min_max_error && (
        <div className={styles.helperText}>
          <p>Length of token name must be between 2 and 32 characters.</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default CreateTokenField;

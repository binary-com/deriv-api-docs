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

  const tokens_limit_reached = tokens.length === 30 && Object.keys(errors).length === 0;
  const token_name_exists =
    getTokenNames.includes(input_value.toLowerCase()) && Object.keys(errors).length === 0;
  const has_no_errors = Object.values(errors).length === 0;
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
          placeholder=' '
        />
        <Button disabled={disable_button} type='submit'>
          Create
        </Button>
        <label className={styles.tokenInputLabel}>
          Token name (you&apos;ve created <b>{tokens.length}</b> out of 30 tokens)
        </label>
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
      {tokens_limit_reached && input_value !== '' && (
        <div className='error-message'>
          <p>You&apos;ve reached 30 tokens creation limit.</p>
        </div>
      )}
      {has_no_errors && (
        <div className={styles.helperText}>
          <ul>
            <li>
              <span>Only alphanumeric characters with spaces and underscores are allowed.</span>
            </li>
            <li>
              <span>The name must be between 2 to 32 characters.</span>
            </li>
            <li>
              <span>Duplicate token names aren&apos;t allowed.</span>
            </li>
            <li>
              <span>
                The name cannot contain &ldquo;Binary&rdquo;, &ldquo;Deriv&rdquo;, or similar words.
              </span>
            </li>
            <li>
              <span>You can create up to 30 tokens for this account.</span>
            </li>
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default CreateTokenField;

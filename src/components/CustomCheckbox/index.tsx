import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './custom_checkbox.module.scss';

type TCustomCheckbox = {
  name: string;
  id?: string;
  register: UseFormRegisterReturn;
};

const CustomCheckbox = ({ name, register, id = null }: TCustomCheckbox) => {
  return (
    <div className={styles.customCheckboxContainer}>
      <input name={name} id={id} type='checkbox' {...register} />
      <span className={styles.customCheckbox} />
    </div>
  );
};

export default CustomCheckbox;

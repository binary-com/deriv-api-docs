import React, { ReactElement } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './custom_checkbox.module.scss';

type TCustomCheckbox = {
  name: string;
  id: string;
  register: UseFormRegisterReturn;
  children: ReactElement;
};

const CustomCheckbox = ({ name, register, id = null, children }: TCustomCheckbox) => {
  const Label = () => children;
  return (
    <div className={styles.customCheckboxContainer} data-testid={`custom-checkbox-${name}`}>
      <div>
        <input name={name} id={id} type='checkbox' {...register} />
        <span className={styles.customCheckbox} />
      </div>
      <Label />
    </div>
  );
};

export default CustomCheckbox;

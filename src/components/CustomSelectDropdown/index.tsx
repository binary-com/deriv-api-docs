import React, { useState, ReactElement } from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import styles from './custom_select_dropdown.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';

type TCustomSelectDropdown = {
  children: ReactElement[];
  register: UseFormRegisterReturn;
};

const CustomSelectDropdown = ({ children, register }: TCustomSelectDropdown) => {
  const [is_toggle_dropdown, setToggleDropdown] = useState(false);
  const { currentLoginAccount } = useAuthContext();
  const toggle_dropdown = is_toggle_dropdown ? styles.active : styles.inactive;
  console.log(children);
  return (
    <div className={styles.customSelectField}>
      <div className='select-label'>Choose your account</div>
      <div
        tabIndex={0}
        className={styles.selectWrapper}
        onClick={() => setToggleDropdown(!is_toggle_dropdown)}
        onKeyDown={(e) => e.key === 'ArrowDown' && setToggleDropdown(!is_toggle_dropdown)}
      >
        {/* The select input */}
        {children[0]}
        <input
          {...register}
          type='hidden'
          value={currentLoginAccount?.name ? currentLoginAccount.name : ''}
          id='api_token_input'
          data-testid={'select-account'}
        />
        <div className={`${styles.dropdownWrapper} ${toggle_dropdown}`}>
          <div className={styles.dropdown} onClick={() => setToggleDropdown(!is_toggle_dropdown)}>
            {/* The select dropdown */}
            {children[1]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSelectDropdown;

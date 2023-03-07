import React, { useState, useRef, ReactElement } from 'react';
import useClickOutsideDropdown from '@site/src/hooks/useClickOutsideDropdown';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './custom_select_dropdown.module.scss';

type TCustomSelectDropdown = {
  children: ReactElement[];
  label: string;
  value: string;
  register: UseFormRegisterReturn;
};

const CustomSelectDropdown = ({ children, label, register, value }: TCustomSelectDropdown) => {
  const [is_toggle_dropdown, setToggleDropdown] = useState(false);
  const toggle_dropdown = is_toggle_dropdown ? styles.active : styles.inactive;

  const SelectInput = () => children[0];
  const SelectDropdown = () => children[1];

  const dropdownRef = useRef(null);
  useClickOutsideDropdown(dropdownRef, setToggleDropdown, false);

  return (
    <div className={styles.customSelectField}>
      <div
        tabIndex={0}
        ref={dropdownRef}
        className={styles.selectWrapper}
        onClick={() => setToggleDropdown(!is_toggle_dropdown)}
        onKeyDown={(e) => e.key === 'ArrowDown' && setToggleDropdown(!is_toggle_dropdown)}
      >
        <label className={`${styles.selectLabel} ${value ? styles.active : ''}`}>{label}</label>
        <SelectInput />
        <input {...register} type='hidden' value={value ? value : ''} />
        <div className={`${styles.dropdownWrapper} ${toggle_dropdown}`}>
          <div className={styles.dropdown} onClick={() => setToggleDropdown(!is_toggle_dropdown)}>
            <SelectDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSelectDropdown;

import React, { useRef, useState } from 'react';
import styles from './language_switcher.module.scss';
import useClickOutsideDropdown from '@site/src/hooks/useClickOutsideDropdown';

const LanguageSwitcher = () => {
  const [is_toggle_dropdown, setToggleDropdown] = useState(false);
  const dropdown_toggle = is_toggle_dropdown ? styles.active : styles.inactive;

  const dropdownRef = useRef(null);
  useClickOutsideDropdown(dropdownRef, setToggleDropdown, false);

  return (
    <div>
      <button onClick={() => setToggleDropdown((prev) => !prev)} className={def}>
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;

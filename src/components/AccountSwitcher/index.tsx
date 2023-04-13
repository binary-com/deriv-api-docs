import React, { useState, useRef } from 'react';
import { isNotDemoCurrency } from '@site/src/utils';
import useLogout from '@site/src/hooks/useLogout';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useClickOutsideDropdown from '@site/src/hooks/useClickOutsideDropdown';
import CurrencyIcon from '../CurrencyIcon';
import SelectedAccount from '../CustomSelectDropdown/account-dropdown/SelectedAccount';
import AccountDropdown from '../CustomSelectDropdown/account-dropdown/AccountDropdown';
import styles from './account_switcher.module.scss';

const AccountSwitcher = () => {
  const { logout } = useLogout();

  const { currentLoginAccount } = useAuthContext();
  const [is_toggle_dropdown, setToggleDropdown] = useState(false);
  const dropdown_toggle = is_toggle_dropdown ? styles.active : styles.inactive;
  const is_demo = currentLoginAccount.name.includes('VRTC') ? styles.demo : '';

  const dropdownRef = useRef(null);
  useClickOutsideDropdown(dropdownRef, setToggleDropdown, false);

  return (
    <div ref={dropdownRef} className={`${styles.accountSwitcher} ${dropdown_toggle}`}>
      <button onClick={() => setToggleDropdown((prev) => !prev)} className={is_demo}>
        <div className={styles.currencyIconContainer}>
          <CurrencyIcon currency={isNotDemoCurrency(currentLoginAccount)} />
        </div>
        {currentLoginAccount.name && currentLoginAccount.currency
          ? `${currentLoginAccount.name}`
          : 'Accounts'}
      </button>
      <div className={`${styles.accountDropdownContainer} ${dropdown_toggle}`}>
        <div className={styles.dropdownHeader}>
          <h5>Deriv account</h5>
          <img src='/img/arrow_up.svg' onClick={() => setToggleDropdown((prev) => !prev)} />
        </div>
        <SelectedAccount />
        <div onClick={() => setToggleDropdown(false)}>
          <AccountDropdown />
        </div>
        <div className={styles.logoutButtonContainer}>
          <button onClick={logout} type='button' color={'tertiary'} className={styles.logoutButton}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSwitcher;

import React, { useState, useRef } from 'react';
import { Button } from '@deriv/ui';
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

  const dropdownRef = useRef(null);
  useClickOutsideDropdown(dropdownRef, setToggleDropdown, false);

  return (
    <div ref={dropdownRef} className={`${styles.accountSwitcher} ${dropdown_toggle}`}>
      <button onClick={() => setToggleDropdown((prev) => !prev)}>
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
        <Button onClick={logout} type='button' color={'tertiary'}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AccountSwitcher;

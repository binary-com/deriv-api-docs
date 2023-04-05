import { Button } from '@deriv/ui';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useLogout from '@site/src/hooks/useLogout';
import AccountDropdown from '../CustomSelectDropdown/account-dropdown/AccountDropdown';
import React, { useState } from 'react';
import styles from './account_switcher.module.scss';

const AccountSwitcher = () => {
  const { currentLoginAccount } = useAuthContext();
  const { logout } = useLogout();
  const [dropdown_is_open, setDropdownIsOpen] = useState(false);
  const dropdown_toggle = dropdown_is_open ? styles.active : styles.inactive;

  return (
    <>
      <div className={styles.accountSwitcher}>
        <button onClick={() => setDropdownIsOpen(!dropdown_is_open)}>
          {currentLoginAccount.name && currentLoginAccount.currency
            ? `${currentLoginAccount.name} - ${currentLoginAccount.currency}`
            : 'Accounts'}
        </button>
        <div className={`${styles.accountDropdownContainer} ${dropdown_toggle}`}>
          <AccountDropdown />
        </div>
      </div>
      <Button onClick={logout} type='button' color={'tertiary'}>
        Logout
      </Button>
    </>
  );
};

export default AccountSwitcher;

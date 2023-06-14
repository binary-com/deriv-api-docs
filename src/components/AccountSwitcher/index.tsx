import React, { useState, useRef } from 'react';
import { isNotDemoCurrency } from '@site/src/utils';
import useLogout from '@site/src/hooks/useLogout';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useClickOutsideDropdown from '@site/src/hooks/useClickOutsideDropdown';
import CurrencyIcon from '../CurrencyIcon';
import SelectedAccount from '../CustomSelectDropdown/account-dropdown/SelectedAccount';
import AccountDropdown from '../CustomSelectDropdown/account-dropdown/AccountDropdown';
import styles from './account_switcher.module.scss';
import SearchButton from '../SearchButton';

const AccountSwitcher = () => {
  const { logout } = useLogout();

  const { currentLoginAccount } = useAuthContext();
  const [is_toggle_dropdown, setToggleDropdown] = useState(false);
  const [toggle_search, setToggleSearch] = useState<boolean>(false);
  const dropdown_toggle = is_toggle_dropdown ? styles.active : styles.inactive;
  const search_toggle = toggle_search ? 'search-open' : 'search-closed';
  const is_demo = currentLoginAccount.name.includes('VRTC') ? styles.demo : '';

  const dropdownRef = useRef(null);
  useClickOutsideDropdown(dropdownRef, setToggleDropdown, false);

  return (
    <div
      ref={dropdownRef}
      className={`right-navigation ${styles.accountSwitcher} ${dropdown_toggle} ${search_toggle}`}
    >
      <button
        onClick={() => setToggleDropdown((prev) => !prev)}
        className={`${is_demo} ${styles.accountSwitcherButton}`}
      >
        <div className={styles.currencyIconContainer}>
          <CurrencyIcon currency={isNotDemoCurrency(currentLoginAccount)} />
        </div>
        {currentLoginAccount.name && currentLoginAccount.currency
          ? `${currentLoginAccount.name}`
          : 'Accounts'}
      </button>
      {is_toggle_dropdown && (
        <div className={`${styles.accountDropdownContainer} ${dropdown_toggle}`}>
          <div className={styles.dropdownHeader}>
            <h5>Deriv account</h5>
            <button
              onClick={() => setToggleDropdown((prev) => !prev)}
              className={styles.closeDropdown}
              data-testid='dt_close_dropdown_arrow'
            />
          </div>
          <SelectedAccount />
          <div onClick={() => setToggleDropdown(false)}>
            <AccountDropdown />
          </div>
          <div className={styles.logoutButtonContainer}>
            <button
              onClick={logout}
              type='button'
              color={'tertiary'}
              className={styles.logoutButton}
            >
              Log out
            </button>
          </div>
        </div>
      )}
      <SearchButton setToggleSearch={setToggleSearch} toggle_search={toggle_search} />
    </div>
  );
};

export default AccountSwitcher;

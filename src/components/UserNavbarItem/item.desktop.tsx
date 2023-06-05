import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import AccountSwitcher from '../AccountSwitcher';
import { IUserNavbarItemProps } from './item.types';
import { useLocation } from '@docusaurus/router';
import styles from './UserNavbarItem.module.scss';

const UserNavbarDesktopItem = ({ authUrl, is_logged_in }: IUserNavbarItemProps) => {
  const [toggle_search, setToggleSearch] = useState<boolean>(false);
  const location = useLocation();

  const closeSearchHotkey = (event) => {
    const press_escape = event.key === 'Escape';
    const press_cmd_and_k = event.metaKey && event.key === 'k';

    if (press_escape) setToggleSearch(false);
    if (press_cmd_and_k) setToggleSearch(false);
  };

  const openSearchHotkey = (event) => {
    const press_cmd_and_k = event.metaKey && event.key === 'k';
    if (press_cmd_and_k) setToggleSearch(true);
  };

  const focusSearchInput = () => {
    // Using vanilla JS to get the element since it's a 3rd party library. I cannot access through React.
    const search_input = document.querySelector('.navbar__search-input');
    if (search_input) {
      const focusInput = () => (search_input as HTMLElement).focus();
      focusInput();
    }
  };

  useEffect(() => {
    setToggleSearch(false);
  }, [location]);

  useEffect(() => {
    if (toggle_search) {
      focusSearchInput();
      window.addEventListener('keydown', closeSearchHotkey);
      return () => window.removeEventListener('keydown', closeSearchHotkey);
    } else {
      window.addEventListener('keydown', openSearchHotkey);
      return () => window.removeEventListener('keydown', openSearchHotkey);
    }
  }, [toggle_search]);

  const logInButtonClasses = clsx(
    'navbar__item navbar__link',
    styles.UserNavbarItem,
    styles.LogInButton,
  );
  const signUpButtonClasses = clsx(
    'navbar__item navbar__link',
    styles.UserNavbarItem,
    styles.SignUpButton,
  );

  return is_logged_in ? (
    <AccountSwitcher />
  ) : (
    <nav className={`right-navigation ${toggle_search ? 'search-open' : 'search-closed'}`}>
      <Link to={authUrl} className={logInButtonClasses}>
        Log in
      </Link>
      <Link to={'https://deriv.com/signup/'} className={signUpButtonClasses} target='_blank'>
        Sign up
      </Link>
      <button
        onClick={() => setToggleSearch((prev) => !prev)}
        className={styles.searchButton}
        data-testid='dt_search_button'
      />
      <div
        className='search-overlay'
        onClick={() => setToggleSearch(false)}
        data-testid='dt_search_overlay'
      />
    </nav>
  );
};

export default UserNavbarDesktopItem;

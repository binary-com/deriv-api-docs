import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import AccountSwitcher from '../AccountSwitcher';
import { IUserNavbarItemProps } from './item.types';
import styles from './UserNavbarItem.module.scss';

const UserNavbarDesktopItem = ({ authUrl, is_logged_in }: IUserNavbarItemProps) => {
  const [toggle_search, setToggleSearch] = useState<boolean>(false);

  const nav_ref = useRef(null);

  // This is the only React way to access and focus the search input from the 3rd party library we use
  const focusSearchInput = () => {
    // For some reason, this library wraps the search in a new element after triggering the search the first time
    const focusInput = () =>
      nav_ref && nav_ref?.current?.nextElementSibling?.firstChild?.firstChild?.focus?.();
    const focusNestedInput = () =>
      nav_ref &&
      nav_ref?.current?.nextElementSibling?.firstChild?.firstChild?.firstChild?.focus?.();

    focusInput() || focusNestedInput();
  };

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

  useEffect(() => {
    if (toggle_search) {
      focusSearchInput();
      window.addEventListener('keydown', closeSearchHotkey);
      return () => window.removeEventListener('keydown', closeSearchHotkey);
    } else {
      window.addEventListener('keydown', openSearchHotkey);
      return () => window.removeEventListener('keydown', openSearchHotkey);
    }
  }, [toggle_search, nav_ref]);

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
    <nav
      ref={nav_ref}
      className={`right-navigation ${toggle_search ? 'search-open' : 'search-closed'}`}
    >
      <Link to={authUrl} className={logInButtonClasses} target='_self'>
        Log in
      </Link>
      <Link to={'https://deriv.com/signup/'} className={signUpButtonClasses} target='_self'>
        Sign up
      </Link>
      <button onClick={() => setToggleSearch((prev) => !prev)} className={styles.searchButton} />
      <div className='search-overlay' onClick={() => setToggleSearch(false)} />
    </nav>
  );
};

export default UserNavbarDesktopItem;

import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import AccountSwitcher from '../AccountSwitcher';
import { IUserNavbarItemProps } from './item.types';
import styles from './UserNavbarItem.module.scss';

const UserNavbarDesktopItem = ({ authUrl, is_logged_in }: IUserNavbarItemProps) => {
  const [toggle_search, setToggleSearch] = useState<boolean>(false);

  // Close the search modal when pressing the escape button
  useEffect(() => {
    if (toggle_search) {
      const closeSearch = (event) => {
        if (event.key === 'Escape') {
          setToggleSearch(false);
        }
      };
      window.addEventListener('keydown', closeSearch);
      return () => window.removeEventListener('keydown', closeSearch);
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
      <Link to={authUrl} className={logInButtonClasses} target='_self'>
        Log in
      </Link>
      <Link to={'https://deriv.com/signup/'} className={signUpButtonClasses} target='_self'>
        Sign up
      </Link>
      <button onClick={() => setToggleSearch((prev) => !prev)}>O</button>
      <div className='search-overlay' onClick={() => setToggleSearch(false)} />
    </nav>
  );
};

export default UserNavbarDesktopItem;

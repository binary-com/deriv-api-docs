import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React, { useState } from 'react';
import AccountSwitcher from '../AccountSwitcher';
import { IUserNavbarItemProps } from './item.types';
import styles from './UserNavbarItem.module.scss';
import SearchButton from '../SearchButton';

const UserNavbarDesktopItem = ({ authUrl, is_logged_in }: IUserNavbarItemProps) => {
  const [toggle_search, setToggleSearch] = useState<boolean>(false);

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
      <SearchButton setToggleSearch={setToggleSearch} toggle_search={toggle_search} />
    </nav>
  );
};

export default UserNavbarDesktopItem;

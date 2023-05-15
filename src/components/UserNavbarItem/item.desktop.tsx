import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React from 'react';
import AccountSwitcher from '../AccountSwitcher';
import { IUserNavbarItemProps } from './item.types';
import styles from './UserNavbarItem.module.scss';

const UserNavbarDesktopItem = ({ authUrl, is_logged_in }: IUserNavbarItemProps) => {
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
    <React.Fragment>
      <Link to={authUrl} className={logInButtonClasses} target='_blank'>
        Log in
      </Link>
      <Link to={'https://deriv.com/signup/'} className={signUpButtonClasses} target='_blank'>
        Sign up
      </Link>
    </React.Fragment>
  );
};

export default UserNavbarDesktopItem;

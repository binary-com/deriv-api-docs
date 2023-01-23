import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React from 'react';
import AccountSwitcher from '../AccountSwitcher';
import { IUserNavbarItemProps } from './item.types';
import styles from './UserNavbarItem.module.scss';

const UserNavbarDesktopItem = ({ authUrl, is_logged_in }: IUserNavbarItemProps) => {
  const classNames = clsx('navbar__item navbar__link', styles.UserNavbarItem);

  return is_logged_in ? (
    <AccountSwitcher />
  ) : (
    <Link to={authUrl} className={classNames} target='_self'>
      Login
    </Link>
  );
};

export default UserNavbarDesktopItem;

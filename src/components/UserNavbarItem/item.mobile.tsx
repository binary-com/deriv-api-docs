import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React from 'react';
import { IUserNavbarItemProps } from './item.types';

const UserNavbarMobileItem = ({ authUrl, is_logged_in, logout }: IUserNavbarItemProps) => {
  return (
    <li className={clsx('menu__list-item')}>
      {is_logged_in ? (
        <Link className={clsx('menu__link')} onClick={logout}>
          Logout
        </Link>
      ) : (
        <Link to={authUrl} target='_self' className={clsx('menu__link')}>
          Login
        </Link>
      )}
    </li>
  );
};

export default UserNavbarMobileItem;

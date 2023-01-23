import useLoginUrl from '@site/src/hooks/useLoginUrl';
import useLogout from '@site/src/hooks/useLogout';
import useRootContext from '@site/src/hooks/useRootContext';
import React, { useEffect, useState } from 'react';
import UserNavbarDesktopItem from './item.desktop';
import UserNavbarMobileItem from './item.mobile';

interface IProps {
  mobile?: boolean;
}

const UserNavbarItem = ({ mobile }: IProps) => {
  const [authUrl, setAuthUrl] = useState<string>('');

  const { is_logged_in } = useRootContext();
  const { logout } = useLogout();
  const { getUrl } = useLoginUrl();

  useEffect(() => {
    const url = getUrl('en');
    setAuthUrl(url);
  }, [getUrl]);

  return mobile ? (
    <UserNavbarMobileItem authUrl={authUrl} is_logged_in={is_logged_in} logout={logout} />
  ) : (
    <UserNavbarDesktopItem authUrl={authUrl} is_logged_in={is_logged_in} logout={logout} />
  );
};

export default UserNavbarItem;

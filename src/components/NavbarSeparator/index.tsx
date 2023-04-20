import React from 'react';
import styles from './NavbarSeparator.module.scss';
import useAuthContext from '@site/src/hooks/useAuthContext';

const NavbarSeparator = () => {
  const { is_logged_in } = useAuthContext();
  return (
    <React.Fragment>
      {is_logged_in && (
        <div className={styles.separatorContainer}>
          <div className={styles.navbarSeparator} />
        </div>
      )}
    </React.Fragment>
  );
};

export default NavbarSeparator;

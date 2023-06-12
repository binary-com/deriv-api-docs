import React from 'react';
import styles from './Header.module.scss';
import Link from '@docusaurus/Link';
import RenderOfficialContents from '../RenderOfficialContents';

export const Header = () => {
  return (
    <RenderOfficialContents>
      <div className={styles.Navtop}>
        <div className={styles.NavtopContainer}>
          <div className={styles.Subnav}>
            <Link to={'https://deriv.com/'} className={styles.SubnavItems}>
              Deriv website
            </Link>
            <Link to='https://deriv.com/who-we-are' className={styles.SubnavItems}>
              Who we are
            </Link>
            <Link to='https://deriv.com/contact-us' className={styles.SubnavItems}>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </RenderOfficialContents>
  );
};

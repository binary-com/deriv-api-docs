import React, { useEffect } from 'react';
import styles from './Header.module.scss';
import Link from '@docusaurus/Link';
export const Header = () => {
  useEffect(() => {
    const s = document.createElement('script');
    s.src =
      'https://survey.survicate.com/workspaces/83b651f6b3eca1ab4551d95760fe5deb/web_surveys.js';
    s.async = true;
    const e = document.getElementById('__docusaurus');
    e.parentNode.insertBefore(s, e);
  }, []);
  return (
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
  );
};

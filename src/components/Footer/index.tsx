import React from 'react';
import { Text } from '@deriv/ui';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.FooterContainer} data-testid='footer-text'>
      <div className={styles.FooterBody}>
        <Text type='subtitle-1' as={'h1'} bold className={styles.FooterContent}>
          Get Connected
        </Text>
        <Text type='paragraph-1' align='center' as={'h2'} className={styles.FooterBodyContent}>
          Discuss ideas and share solutions with developers worldwide.
        </Text>
        <a
          data-testid='community-link'
          style={{ textDecoration: 'none' }}
          href='https://binary.vanillacommunity.com/'
        >
          <button className={styles.communityButton}>Join Our Community</button>
        </a>
      </div>
      <div className={styles.FooterBody}>
        <Text type='subtitle-1' bold className={styles.FooterContent}>
          {"We're here to help"}
        </Text>
        <Text type='paragraph-1' align='center' className={styles.FooterBodyContent}>
          Email us at{' '}
          <a className={styles.Email} href={'mailto:api-support@deriv.com'}>
            api-support@deriv.com
          </a>{' '}
          if you have any questions.
        </Text>
      </div>
    </div>
  );
};
export default Footer;

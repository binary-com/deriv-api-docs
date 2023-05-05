import React from 'react';
import { Text } from '@deriv/ui';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.FooterContainer} data-testid='footer-text'>
      <section className={styles.FooterBody}>
        <Text type='subtitle-1' as='h2' align='center' className={styles.FooterContent}>
          Get connected
        </Text>
        <p className={styles.FooterBodyContent}>
          Discuss ideas and share solutions with developers worldwide.
        </p>
        <a
          data-testid='community-link'
          style={{ textDecoration: 'none' }}
          href='https://binary.vanillacommunity.com/'
        >
          <button className={styles.communityButton}>Join our community</button>
        </a>
      </section>
      <section className={styles.FooterBody}>
        <Text type='subtitle-1' as='h2' align='center' className={styles.FooterContent}>
          We&apos;re here to help
        </Text>
        <Text type='paragraph-1' align='center' className={styles.FooterBodyContentEmail}>
          Email us at{' '}
          <a className={styles.Email} href={'mailto:api-support@deriv.com'}>
            api-support@deriv.com
          </a>
        </Text>
        <Text type='paragraph-1' align='center' className={styles.FooterBodyContentEmail}>
          if you have any questions.
        </Text>
      </section>
    </footer>
  );
};
export default Footer;

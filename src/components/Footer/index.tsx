import React, { useEffect } from 'react';
import { Text } from '@deriv/ui';
import styles from './Footer.module.scss';

const Footer = () => {
  useEffect(() => {
    const s = document.createElement('script');
    s.src =
      'https://survey.survicate.com/workspaces/83b651f6b3eca1ab4551d95760fe5deb/web_surveys.js';
    s.async = true;
    s.innerHTML = 'Hello World';
    const e = document.getElementById('__docusaurus');
    console.log('e: ', e);
    e.parentNode.insertBefore(s, e);
  }, []);

  return (
    <footer className={styles.FooterContainer} data-testid='footer-text'>
      <section className={styles.FooterBody}>
        <Text type='subtitle-1' as='h2' align='center' className={styles.FooterContent}>
          Get connected
        </Text>
        <p className={styles.FooterBodyContent}>
          Discuss ideas and share solutions with developers worldwide.
        </p>
        <div className={styles.Communities}>
          <a
            href='https://deriv.vanillacommunity.com/'
            target='_blank'
            rel='noreferrer'
            className={styles.communityButton}
          >
            <span>Join our community</span>
          </a>
          <a
            href='https://t.me/+g6FV5tFY1u9lZGE1'
            target='_blank'
            rel='noreferrer'
            className={styles.communityButton}
          >
            <div className={styles.Telegram}>
              <img src='/img/telegram.svg' className={styles.TelegramIcon} />
              <p>Telegram</p>
            </div>
          </a>
        </div>
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

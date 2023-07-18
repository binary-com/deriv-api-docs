import React from 'react';
import { Text } from '@deriv/ui';
import styles from './Footer.module.scss';
import Translate from '@docusaurus/Translate';

const Footer = () => {
  return (
    <footer className={styles.FooterContainer} data-testid='footer-text'>
      <section className={styles.FooterBody}>
        <Text type='subtitle-1' as='h2' align='center' className={styles.FooterContent}>
          <Translate> Get connected</Translate>
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
            <span>
              <Translate>Join our community</Translate>
            </span>
          </a>
          <a
            href='https://t.me/+g6FV5tFY1u9lZGE1'
            target='_blank'
            rel='noreferrer'
            className={styles.communityButton}
          >
            <div className={styles.Telegram}>
              <img src='/img/telegram.svg' className={styles.TelegramIcon} />
              <p>
                <Translate>Telegram</Translate>
              </p>
            </div>
          </a>
        </div>
      </section>
      <section className={styles.FooterBody}>
        <Text type='subtitle-1' as='h2' align='center' className={styles.FooterContent}>
          <Translate> We&apos;re here to help </Translate>
        </Text>
        <Text type='paragraph-1' align='center' className={styles.FooterBodyContentEmail}>
          <Translate>Email us at</Translate>{' '}
          <a className={styles.Email} href={'mailto:api-support@deriv.com'}>
            <Translate>api-support@deriv.com </Translate>
          </a>
        </Text>
        <Text type='paragraph-1' align='center' className={styles.FooterBodyContentEmail}>
          <Translate> if you have any questions. </Translate>
        </Text>
      </section>
    </footer>
  );
};
export default Footer;

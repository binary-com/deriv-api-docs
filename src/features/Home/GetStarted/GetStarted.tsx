import React from 'react';
import styles from './GetStarted.module.scss';
import { Text } from '@deriv/ui';
export const GetStarted = () => {
  return (
    <div className={`${styles.mainPageRow} ${styles.withPattern}`}>
      <div className={styles.columnContainer}>
        <Text type='heading-2' bold data-testid='started-header' role='heading' as='h2'>
          Get started with our API in 3 simple steps:
        </Text>
        <div className={styles.cardContainer}>
          <a href='/docs/resources/api-guide/' className={styles.mainPageCard} data-testid='guide'>
            <div className={styles.header}>
              <Text type='subtitle-1' bold className={styles.dark} as='h2'>
                1. Learn about our API
              </Text>
              <div className={styles.guideIcon} />
            </div>
            <div className='content'>Understand basic concepts and terminologies.</div>
          </a>
          <a
            target='_blank'
            href='https://deriv.com/signup/'
            rel='noopener noreferrer'
            className={styles.mainPageCard}
            data-testid='signUp'
          >
            <div className={styles.header}>
              <Text type='subtitle-1' bold className={styles.dark} as='h2'>
                2. Sign up
              </Text>
              <div className={styles.signUpIcon} />
            </div>
            <div className='content hide-on-mobile'>
              Create a free Deriv account to access
              <br />
              our API (or use your Binary.com login details).
            </div>
          </a>
          <a href='/app-registration' className={styles.mainPageCard} data-testid='register'>
            <div className={styles.header}>
              <Text type='subtitle-1' bold className={styles.dark} as='h2'>
                3. Register your app
              </Text>
              <div className={styles.registerYourAppIcon} />
            </div>
            <div className='content'>Fill out the registration form to start using Deriv API.</div>
          </a>
        </div>
        <span className={styles.termConditions}>
          By using our API, you confirm that you have read and agreed to our
          <a
            href='https://deriv.com/tnc/business-partners-api-user.pdf'
            target='_blank'
            rel='noopener noreferrer'
          >
            {' '}
            terms and conditions.
          </a>
        </span>
      </div>
    </div>
  );
};

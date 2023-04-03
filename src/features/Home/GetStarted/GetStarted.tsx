import React from 'react';
import styles from './GetStarted.module.scss';
import { Text } from '@deriv/ui';
import Link from '@docusaurus/Link';

export const GetStarted = () => {
  return (
    <div className={`${styles.mainPageRow} ${styles.withPattern}`}>
      <div className={styles.columnContainer}>
        <Text type='heading-2' bold data-testid='started-header' role='heading' as='h2'>
          Get started with our API in 3 simple steps:
        </Text>
        <div className={styles.cardContainer}>
          <Link to='/docs/category/guides' className={styles.mainPageCard} data-testid='guide'>
            <img src='/img/guide.svg' />
            <div className={styles.header}>
              <Text type='subtitle-1' bold className={styles.dark} as='h2'>
                1. Learn about our API
              </Text>
            </div>
            <div className='content'>Understand basic concepts and terminologies.</div>
            <div className={styles.arrow}>
              {' '}
              <img src='img/home-arrow.svg' />{' '}
            </div>
          </Link>
          <Link
            target='_blank'
            to='https://deriv.com/signup/'
            rel='noopener noreferrer'
            className={styles.mainPageCard}
            data-testid='signUp'
          >
            <img src='/img/sign-up.svg' />
            <div className={styles.header}>
              <Text type='subtitle-1' bold className={styles.dark} as='h2'>
                2. Sign up
              </Text>
            </div>
            <div className='content hide-on-mobile'>
              Create a free Deriv account to access our API (or use your Binary.com login details).
            </div>
            <div className={styles.arrowMiddle}>
              {' '}
              <img src='img/home-arrow.svg' />{' '}
            </div>
          </Link>
          <Link to='/dashboard' className={styles.mainPageCard} data-testid='register'>
            <img src='/img/register-your-app.svg' />
            <div className={styles.header}>
              <Text type='subtitle-1' bold className={styles.dark} as='h2'>
                3. Register your app
              </Text>
            </div>
            <div className='content'>Fill out the registration form to start using Deriv API.</div>
            <div className={styles.arrow}>
              {' '}
              <img src='img/home-arrow.svg' />{' '}
            </div>
          </Link>
        </div>
        <span className={styles.termConditions}>
          By using our API, you confirm that you have read and agreed to our
          <Link
            to='https://deriv.com/tnc/business-partners-api-user.pdf'
            target='_blank'
            rel='noopener noreferrer'
          >
            {' '}
            terms and conditions.
          </Link>
        </span>
      </div>
    </div>
  );
};

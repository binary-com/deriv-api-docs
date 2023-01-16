import React from 'react';
import styles from './GetStarted.module.scss';
export const GetStarted = () => {
  return (
    <div className={`main-page-row ${styles.withPattern}`}>
      <div className='column-container'>
        <h1>Get started with our API in 3 simple steps:</h1>
        <div className='card-container'>
          <a
            target='_blank'
            href='https://deriv.com/signup/'
            rel='noopener noreferrer'
            className='main-page-card'
          >
            <div className='header'>
              <h3>1. Sign up</h3>
              <div className={styles.signUpIcon} />
            </div>
            <div className='content hide-on-mobile'>
              Create a free Deriv account to access
              <br />
              our API (or use your Binary.com login details).
            </div>
            <div className='content hide-on-desktop'>
              Create a free Deriv account to access our API (or use your Binary.com login details).
            </div>
          </a>
          <a href='/app-registration' className='main-page-card'>
            <div className='header'>
              <h3>2. Register your app</h3>
              <div className={styles.registerYourAppIcon} />
            </div>
            <div className='content'>Fill out the registration form to start using Deriv API.</div>
          </a>
          <a href='/docs/resources/api-guide/' className='main-page-card'>
            <div className='header'>
              <h3>3. Read our guide</h3>
              <div className={styles.guideIcon} />
            </div>
            <div className='content'>
              Our API quick start guide covers the essentials you need to start building your app
              right away.
            </div>
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

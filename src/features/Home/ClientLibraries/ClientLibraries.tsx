import React from 'react';
import { Text } from '@deriv/ui';
import styles from './ClientLibraries.module.scss';

export const ClientLibraries = () => {
  return (
    <div className='main-page-row'>
      <div className={styles.ClientLibrary} data-testid='client-header'>
        <div>
          <div className={styles.IconJS}>
            <img src='/img/js-library.svg' />
          </div>
          <Text
            type='heading-2'
            as={'h1'}
            bold
            align='center'
            aria-level={1}
            css={{
              'margin-bottom': '40px',
            }}
          >
            Comprehensive all-in-one client library
          </Text>
          <Text
            type='subtitle-1'
            as={'h2'}
            align='center'
            css={{
              'font-weight': 400,
              '@mobile': { 'text-align': 'center' },
            }}
            aria-level={4}
          >
            Use our powerful, flexible, and free API to build a custom trading <br />
            platform - for yourself or for your business.
          </Text>
          <div className={styles.LibraryLogo}>
            <div className={styles.LogoAndLink}>
              <a
                className={styles.LibraryGoTo}
                href='https://binary-com.github.io/deriv-api/'
                rel='noreferrer'
                target='_blank'
              >
                <img src='/img/js.svg'></img>
                <label>Go to the JavaScript library</label>
                <img className={styles.LibraryChevron} src='/img/library-chevron.svg' />
              </a>
            </div>
            <div className={styles.LogoAndLink}>
              <a
                className={styles.LibraryGoTo}
                href='https://binary-com.github.io/python-deriv-api/'
                rel='noreferrer'
                target='_blank'
              >
                <img src='/img/py.svg'></img>
                <label>Go to the Python library</label>
                <img className={styles.LibraryChevron} src='/img/library-chevron.svg' />
              </a>
            </div>
            <div className={styles.LogoAndLink}>
              <a
                className={styles.LibraryGoTo}
                href='https://github.com/deriv-com/flutter-deriv-api'
                rel='noreferrer'
                target='_blank'
              >
                <img src='/img/flutter.svg'></img>
                <label>Go to the Flutter library</label>
                <img className={styles.LibraryChevron} src='/img/library-chevron.svg' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

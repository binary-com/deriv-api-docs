import React from 'react';
import { Button, Text } from '@deriv/ui';
import styles from './HeroHeader.module.scss';
import Translate from '@docusaurus/Translate';

export const HeroHeader = () => {
  return (
    <header className={styles.HeroImageStyle} data-testid='hero-header'>
      <div className={styles.HeroContainerStyle}>
        <Text type='heading-1' as={'h1'} bold className={styles.heading} aria-level={2}>
          <Translate>Deriv API</Translate>
        </Text>
        <Text
          type='subtitle-1'
          align='center'
          as={'h3'}
          aria-level={7}
          className={styles.SubHeading}
        >
          <Translate>Use our powerful, flexible, and free API to build a custom trading</Translate>{' '}
          <br />
          <Translate>platform - for yourself or for your business.</Translate>
        </Text>
        <a href='/docs/intro'>
          <Button type='button' className={styles.HeroButton}>
            <Translate>Read the docs</Translate>
          </Button>
        </a>
      </div>
    </header>
  );
};

import React from 'react';
import { Button, Text } from '@deriv/ui';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <div className={styles.FooterContainer} data-testid='footer-text'>
      <div className={styles.FooterBody}>
        <Text
          type='subtitle-1'
          bold
          css={{
            color: 'White',
            '@mobile': { 'font-size': '32px' },
          }}
          role='heading'
        >
          Get Connected
        </Text>
        <Text
          type='paragraph-1'
          align='center'
          css={{
            color: '$greyLight500',
            'font-weight': 400,
            '@mobile': { 'font-size': '24px' },
          }}
          role='heading'
        >
          Discuss ideas and share solutions with developers worldwide.
        </Text>
        <a
          data-testid='community-link'
          style={{ textDecoration: 'none' }}
          href='https://binary.vanillacommunity.com/'
        >
          <Button color='monochrome'>Join Our Community</Button>
        </a>
      </div>
      <div className={styles.FooterBody}>
        <Text
          type='subtitle-1'
          bold
          css={{
            color: 'White',
            '@mobile': { 'font-size': '24px' },
          }}
          role='heading'
          aria-level={3}
        >
          {"We're here to help"}
        </Text>
        <Text
          type='paragraph-1'
          align='center'
          css={{
            color: '$greyLight500',
            'font-weight': 400,
            display: 'flex',
            flexWrap: 'wrap',
            '@mobile': { 'text-align': 'left' },
          }}
          role='heading'
          aria-level={7}
        >
          Email us at <a className={styles.Email}>api-support@deriv.com</a>
          if you have any questions.
        </Text>
      </div>
    </div>
  );
};

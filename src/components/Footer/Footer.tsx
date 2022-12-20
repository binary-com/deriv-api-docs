import React from 'react';
import { Button, Text } from '@deriv/ui';
import { FooterContainer, FooterBody, Email } from './Footer.styles';

export const Footer = () => {
  return (
    <FooterContainer data-testid='footer-text'>
      <FooterBody>
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
      </FooterBody>
      <FooterBody>
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
          Email us at <Email>api-support@deriv.com</Email>
          if you have any questions.
        </Text>
      </FooterBody>
    </FooterContainer>
  );
};

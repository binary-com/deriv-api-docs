import React from 'react';
import { Text } from '@deriv/ui';
import { heroImageStyle, heroContainerStyle } from './HeroHeader.styles';

export const HeroHeader = () => {
  return (
    <div data-testid='hero-header' className={heroImageStyle}>
      <div className={heroContainerStyle}>
        <Text
          type='heading-1'
          bold
          css={{
            color: 'White',
            '@mobile': { 'font-size': '32px' },
          }}
          role='heading'
          aria-level={2}
        >
          Deriv API
        </Text>
        <Text
          type='subtitle-1'
          align='center'
          css={{
            color: 'White',
            'font-weight': 400,
            '@mobile': { 'text-align': 'left' },
          }}
          role='heading'
          aria-level={7}
        >
          Use our powerful, flexible, and free API to build a custom trading <br />
          platform - for yourself or for your business.
        </Text>
      </div>
    </div>
  );
};

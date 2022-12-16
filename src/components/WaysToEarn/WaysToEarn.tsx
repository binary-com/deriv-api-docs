import React from 'react';
import { Badge, Text } from '@deriv/ui';
import { WaysContainer, WaysWrapper, Ways } from './WaysToEarn.styles';

export const WaysToEarn = () => {
  return (
    <div className='main-page-row'>
      <WaysContainer>
        <WaysWrapper>
          <div>
            <Text
              type='heading-2'
              align='center'
              bold
              css={{
                'max-width': '384px',
              }}
            >
              Ways to earn with Deriv API
            </Text>
          </div>
          <div>
            <Ways>
              <Badge
                icon_src='/img/checklist-icon-red.svg'
                label='regular'
                size='large'
                spacing='loose'
                visiblity='icon-and-label'
              >
                <Text type='paragraph-1' css={{ margin: 0 }}>
                  Register your app with Deriv, and add a percentage markup to the contract prices
                  to profit from every purchased contract.
                </Text>
              </Badge>
            </Ways>
            <Ways>
              <Badge
                icon_src='/img/checklist-icon-red.svg'
                label='regular'
                size='large'
                spacing='loose'
                visiblity='icon-and-label'
              >
                <Text type='paragraph-1' css={{ margin: 0 }}>
                  Sign up as an affiliate, build your app, and get commissions on trades completed
                  via your app and the affiliate plan you select.
                </Text>
              </Badge>
            </Ways>
            <Ways>
              <Badge
                icon_src='/img/checklist-icon-red.svg'
                label='regular'
                size='large'
                spacing='loose'
                visiblity='icon-and-label'
              >
                <Text type='paragraph-1' css={{ margin: 0 }}>
                  Sign up as a payment agent, build your own custom payment website, and use our API
                  to earn commission on every payment you process for Deriv&apos;s clients.
                </Text>
              </Badge>
            </Ways>
          </div>
        </WaysWrapper>
      </WaysContainer>
    </div>
  );
};

import React from 'react';
import { Text } from '@deriv/ui';
import {
  ApiFeaturesImage,
  FeatureList,
  FeaturesContainer,
  FeatureText,
  FeatureContent,
  FeatureOption,
  FeaturesDescription,
} from './ApiFeatures.styles';

export const ApiFeatures = () => {
  return (
    <FeaturesContainer data-testid='api-features'>
      <FeaturesDescription>
        <FeatureText>
          <Text type='heading-2' bold role='heading' aria-level={1}>
            Deriv API features
          </Text>
          <Text
            type='paragraph-1'
            css={{
              'font-weight': 500,
              'line-height': '2rem',
            }}
            role='definition'
          >
            Deriv API gives you full access to all the trading functionalities of DTrader and allows
            you to build your own comprehensive trading systems and analysis tools.
          </Text>
          <Text
            type='paragraph-1'
            css={{
              'font-weight': 500,
            }}
          >
            {"With our API, you'll be able to:"}
          </Text>
          <FeatureList>
            <FeatureOption>
              <img src='/img/checklist-icon-red.svg'></img>
              <FeatureContent>Trade digital options and multipliers</FeatureContent>
            </FeatureOption>
            <FeatureOption>
              <img src='/img/checklist-icon-red.svg'></img>
              <FeatureContent>Monitor real-time pricing</FeatureContent>
            </FeatureOption>
            <FeatureOption>
              <img src='/img/checklist-icon-red.svg'></img>
              <FeatureContent>Buy/sell contracts</FeatureContent>
            </FeatureOption>
            <FeatureOption>
              <img src='/img/checklist-icon-red.svg'></img>
              <FeatureContent>{"Manage users' accounts"}</FeatureContent>
            </FeatureOption>
            <FeatureOption>
              <img src='/img/checklist-icon-red.svg'></img>
              <FeatureContent>Monitor existing contracts</FeatureContent>
            </FeatureOption>
            <FeatureOption>
              <img src='/img/checklist-icon-red.svg'></img>
              <FeatureContent>{"View users' historical transactions"}</FeatureContent>
            </FeatureOption>
          </FeatureList>
        </FeatureText>
        <ApiFeaturesImage data-testid='api-features-img' />
      </FeaturesDescription>
    </FeaturesContainer>
  );
};

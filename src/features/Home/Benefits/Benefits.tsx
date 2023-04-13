import React from 'react';
import { Text } from '@deriv/ui';
import styles from './Benefits.module.scss';

const Icon = ({ icon }: { icon: string }) => {
  const icon_title = icon[0].toUpperCase() + icon.substring(1);
  return (
    <div className={styles.SingleIconContainer}>
      <div
        className={styles.BenefitsImage}
        data-testid={icon}
        style={{ background: `url(/img/${icon}.svg) no-repeat` }}
      />
      <Text type='subtitle-2'>{icon_title}</Text>
    </div>
  );
};

const ImageContainer = ({ image }: { image: string }) => {
  return (
    <div
      className={styles.InformationImage}
      data-testid={image}
      style={{ background: `url(/img/${image}.png) no-repeat` }}
    />
  );
};

export const Benefits = () => {
  return (
    <div data-testid='benefits' className='main-page-row'>
      <div className={styles.BenefitsContainer}>
        <Text type='heading-2' as={'h2'} align='center' bold className={styles.Heading}>
          Benefits of using Deriv API
        </Text>
        <div className={styles.BenefitsIcons}>
          <Icon icon='automation' />
          <div className={styles.SingleIconContainer}>
            <div
              className={styles.BenefitsImage}
              data-testid={'integration'}
              style={{ background: `url(/img/integration.svg) no-repeat` }}
            />
            <Text type='subtitle-2'>Easy Integration</Text>
          </div>
          <div className={styles.SingleIconContainer}>
            <div
              className={styles.BenefitsImage}
              data-testid={'execution'}
              style={{ background: `url(/img/execution.svg) no-repeat` }}
            />
            <Text type='subtitle-2'>Fast Execution</Text>
          </div>
        </div>
        <div className={styles.BenefitsInformation}>
          <div className={styles.InformationContainer}>
            <ImageContainer image='personalisation' />
            <div>
              <Text
                bold
                css={{
                  'font-size': 'var(--fontSizes-2xl)',
                  '@mobile': { 'font-size': 'var(--fontSizes-lg)' },
                }}
              >
                Personalize your trading
              </Text>
              <Text type='subtitle-2' css={{ 'line-height': '2.5rem' }}>
                Personalize your trading apps to match your needs. Create charts and views the way
                you like them. Develop your trading app using any common programming language and
                extend your trading opportunities.
              </Text>
            </div>
          </div>
          <div className={styles.InformationContainer}>
            <ImageContainer image='build-business' />
            <div>
              <Text
                css={{
                  'font-size': 'var(--fontSizes-2xl)',
                  '@mobile': { 'font-size': 'var(--fontSizes-lg)' },
                }}
                bold
              >
                Build a business and earn more
              </Text>
              <Text type='subtitle-2' css={{ 'line-height': '2.5rem' }}>
                Create your own trading apps by taking advantage of the power of Deriv&apos;s
                trading services. Share your apps with fellow traders or customers, and get a chance
                to earn more or build your own business.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

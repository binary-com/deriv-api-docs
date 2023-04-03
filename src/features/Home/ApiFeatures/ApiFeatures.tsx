import React from 'react';
import { Text } from '@deriv/ui';
import styles from './ApiFeatures.module.scss';
export const ApiFeatures = () => {
  return (
    <div className={styles.FeaturesContainer} data-testid='api-features'>
      <div className={styles.FeaturesDescription}>
        <div className={styles.FeatureText}>
          <Text type='heading-2' as={'h2'} bold aria-level={1}>
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
            role={'note'}
          >
            {"With our API, you'll be able to:"}
          </Text>
          <ul className={styles.FeatureList}>
            <li className={styles.FeatureOptions}>
              <img src='/img/checklist-icon-grey.svg'></img>
              <div className={styles.FeatureContent}>Trade digital options and multipliers</div>
            </li>
            <li className={styles.FeatureOptions}>
              <img src='/img/checklist-icon-grey.svg'></img>
              <div className={styles.FeatureContent}>Monitor real-time pricing</div>
            </li>
            <li className={styles.FeatureOptions}>
              <img src='/img/checklist-icon-grey.svg'></img>
              <div className={styles.FeatureContent}>Buy/sell contracts</div>
            </li>
            <li className={styles.FeatureOptions}>
              <img src='/img/checklist-icon-grey.svg'></img>
              <div className={styles.FeatureContent}>{"Manage user's accounts"}</div>
            </li>
            <li className={styles.FeatureOptions}>
              <img src='/img/checklist-icon-grey.svg'></img>
              <div className={styles.FeatureContent}>Monitor existing contracts</div>
            </li>
            <li className={styles.FeatureOptions}>
              <img src='/img/checklist-icon-grey.svg'></img>
              <div className={styles.FeatureContent}>{"View user's historical transactions"}</div>
            </li>
          </ul>
        </div>
        <div className={styles.ApiFeaturesImage} data-testid='api-features-img' />
      </div>
    </div>
  );
};

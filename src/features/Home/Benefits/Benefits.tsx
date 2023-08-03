import React from 'react';
import { Text } from '@deriv/ui';
import styles from './Benefits.module.scss';

type TBenefitsIcon = {
  icon: string;
  text: string;
  alt: string;
};

const BenefitsIcon = ({ icon, text, alt }: TBenefitsIcon) => {
  return (
    <figure className={styles.SingleIconContainer}>
      <img
        className={styles.BenefitsImage}
        data-testid={`dt_${icon}_icon`}
        src={`/img/${icon}.svg`}
        alt={alt}
      />
      <Text as='figcaption' type='subtitle-2'>
        {text}
      </Text>
    </figure>
  );
};

const ImageContainer = ({ image, alt }: { image: string; alt: string }) => {
  return (
    <img
      className={styles.InformationImage}
      data-testid={image}
      src={`/img/${image}.png`}
      alt={alt}
    />
  );
};

export const Benefits = () => {
  return (
    <article data-testid='benefits' className={styles.BenefitsContainer}>
      <header>
        <Text type='heading-2' as={'h2'} align='center' bold className={styles.Heading}>
          Benefits of using Deriv API
        </Text>
        <section className={styles.BenefitsIcons}>
          <BenefitsIcon icon='automation' text='Automation' alt='automation' />
          <BenefitsIcon icon='integration' text='Easy integration' alt='integration' />
          <BenefitsIcon icon='execution' text='Fast execution' alt='execution' />
        </section>
      </header>
      <section className={styles.BenefitsInformation}>
        <article className={styles.InformationContainer}>
          <ImageContainer
            image='personalisation'
            alt='A trading app created using Deriv API shown on a laptop.'
          />
          <section className={styles.InformationContent}>
            <Text as='h3' className={styles.headingSize}>
              Personalize your trading
            </Text>
            <Text type='subtitle-2' as='p'>
              Personalize your trading apps to match your needs. Create charts and views the way you
              like them. Develop your trading app using any common programming language and extend
              your trading opportunities.
            </Text>
          </section>
        </article>
        <article className={styles.InformationContainer}>
          <ImageContainer
            image='build-business'
            alt='A business man testing the Deriv API for his trading app.'
          />
          <section className={styles.InformationContent}>
            <Text as='h3' className={styles.headingSize}>
              Build a business and earn more
            </Text>
            <Text type='subtitle-2' as='p'>
              Create your own trading apps by taking advantage of the power of Deriv&apos;s trading
              services. Share your apps with fellow traders or customers, and get a chance to earn
              more or build your own business.
            </Text>
          </section>
        </article>
      </section>
    </article>
  );
};

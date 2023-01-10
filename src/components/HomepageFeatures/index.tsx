import React from 'react';
import { ClientLibaries } from '../ClientLibraries/ClientLibraries';
import { HeroHeader } from '../HeroHeader/HeroHeader';
import { Benefits } from '../Benefits/Benefits';
import { WaysToEarn } from '../WaysToEarn/WaysToEarn';
import { Footer } from '../Footer/Footer';
import { ApiFeatures } from '../ApiFeatures/ApiFeatures';
import { Carousel } from '@site/src/features/Home/Carousel/Carousel';
import styles from './styles.module.scss';

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <HeroHeader />
      <ClientLibaries />
      <Benefits />
      <WaysToEarn />
      <ApiFeatures />
      <Carousel />
      <Footer />
    </section>
  );
}

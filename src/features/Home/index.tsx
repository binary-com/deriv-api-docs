import React from 'react';
import { ApiFeatures } from './ApiFeatures/ApiFeatures';
import { Benefits } from './Benefits/Benefits';
import { ClientLibraries } from './ClientLibraries/ClientLibraries';
import { HeroHeader } from './HeroHeader/HeroHeader';
import { WaysToEarn } from './WaysToEarn/WaysToEarn';
import styles from './styles.module.scss';
import Footer from '@site/src/components/Footer';

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <HeroHeader />
      <ClientLibraries />
      <Benefits />
      <WaysToEarn />
      <ApiFeatures />
      <Footer />
    </section>
  );
}

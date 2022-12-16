import React from 'react';
import { ClientLibaries } from '../ClientLibraries/ClientLibraries';
import { HeroHeader } from '../HeroHeader/HeroHeader';
import styles from './styles.module.css';
import { Footer } from '../Footer/Footer';
import { ApiFeatures } from '../ApiFeatures/ApiFeatures';

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div>
        <HeroHeader />
        <ClientLibaries />
        <ApiFeatures />
        <Footer />
      </div>
    </section>
  );
}

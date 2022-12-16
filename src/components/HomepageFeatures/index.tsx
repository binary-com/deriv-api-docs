import React from 'react';
import { ClientLibaries } from '../ClientLibraries/ClientLibraries';
import { HeroHeader } from '../HeroHeader/HeroHeader';
import { Benefits } from '../Benefits/Benefits';
import { Footer } from '../Footer/Footer';
import styles from './styles.module.css';

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div>
        <HeroHeader />
        <Benefits />
        <ClientLibaries />
        <Footer />
      </div>
    </section>
  );
}

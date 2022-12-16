import React from 'react';
import { ClientLibaries } from '../ClientLibraries/ClientLibraries';
import { HeroHeader } from '../HeroHeader/HeroHeader';
import { Benefits } from '../Benefits/Benefits';
import { Footer } from '../Footer/Footer';
import { IndexStyling } from './index.styles';
import styles from './styles.module.css';

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div>
        <IndexStyling>
          <HeroHeader />
          <ClientLibaries />
          <Benefits />
          <Footer />
        </IndexStyling>
      </div>
    </section>
  );
}

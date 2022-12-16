import React from 'react';
import { HeroHeader } from '../HeroHeader/HeroHeader';
import styles from './styles.module.css';
import { Footer } from '../Footer/Footer';

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className='container'>
        <HeroHeader />
        <Footer/>
      </div>
    </section>
  );
}

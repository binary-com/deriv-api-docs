import React from 'react';
import { HeroHeader } from '../HeroHeader/HeroHeader';
import styles from './styles.module.css';

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className='container'>
        <HeroHeader />
      </div>
    </section>
  );
}

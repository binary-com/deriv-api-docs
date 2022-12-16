import React from 'react';
import { ClientLibaries } from '../ClientLibraries/ClientLibraries';
import { HeroHeader } from '../HeroHeader/HeroHeader';
import styles from './styles.module.css';

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div>
      <div className='container'>
        <HeroHeader />
        <ClientLibaries/>
      </div>
    </section>
  );
}

import React from 'react';
import { HeroHeader } from '../HeroHeader/HeroHeader';
import { Benefits } from '../Benefits/Benefits';

export default function HomepageFeatures() {
  return (
    <section>
      <div className="container">
        <HeroHeader />
        <Benefits />
      </div>
    </section>
  );
}

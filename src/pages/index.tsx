import React from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/features/Home';

export default function Home(): JSX.Element {
  return (
    <Layout title={'Home'} description='Deriv API documentation'>
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

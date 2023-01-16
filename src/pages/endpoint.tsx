import React from 'react';
import Layout from '@theme/Layout';
import Endpoint from '../features/Endpoint/Endpoint';

export default function Home(): JSX.Element {
  return (
    <Layout title='Endpoint' description='Deriv API documentation'>
      <main>
        <Endpoint />
      </main>
    </Layout>
  );
}

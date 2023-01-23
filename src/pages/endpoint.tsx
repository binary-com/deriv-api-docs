import React from 'react';
import Layout from '@theme/Layout';
import Endpoint from '../features/Endpoint/Endpoint';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Home(): JSX.Element {
  return (
    <Layout title='Endpoint' description='Deriv API documentation'>
      <main>
        <BrowserOnly>{() => <Endpoint />}</BrowserOnly>
      </main>
    </Layout>
  );
}

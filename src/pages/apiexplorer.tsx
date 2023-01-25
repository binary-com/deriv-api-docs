import React from 'react';
import Layout from '@theme/Layout';
import ApiExplorerFeatures from '@site/src/features/ApiExplorer';

export default function Home(): JSX.Element {
  return (
    <Layout title={'API Explorer'} description='Deriv API documentation'>
      <main>
        <ApiExplorerFeatures />
      </main>
    </Layout>
  );
}

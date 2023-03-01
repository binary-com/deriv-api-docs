import React from 'react';
import Layout from '@theme/Layout';
import ApiExplorerFeatures from '@site/src/features/ApiExplorer';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function ApiExplorer() {
  return (
    <Layout title={'API Explorer'} description='Deriv API documentation'>
      <main>
        <BrowserOnly>{() => <ApiExplorerFeatures />}</BrowserOnly>
      </main>
    </Layout>
  );
}

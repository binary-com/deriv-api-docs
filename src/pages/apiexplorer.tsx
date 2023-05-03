import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ApiExplorerFeatures from '../features/Apiexplorer';

const ApiExplorer = () => {
  return (
    <BrowserOnly>
      {() => (
        <Layout title={'API Explorer'} description='Deriv API documentation'>
          <main>
            <ApiExplorerFeatures />
          </main>
        </Layout>
      )}
    </BrowserOnly>
  );
};

export default ApiExplorer;

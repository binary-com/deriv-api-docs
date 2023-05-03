import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ApiExplorerFeatures from '../features/Apiexplorer';
import { Circles } from 'react-loader-spinner';

const ApiExplorer = () => {
  return (
    <Layout title={'API Explorer'} description='Deriv API documentation'>
      <main>
        <BrowserOnly
          fallback={
            <Circles
              height='100'
              width='100'
              color='#d44c0d'
              ariaLabel='circles-loading'
              wrapperClass='loading'
            />
          }
        >
          {() => <ApiExplorerFeatures />}
        </BrowserOnly>
      </main>
    </Layout>
  );
};

export default ApiExplorer;

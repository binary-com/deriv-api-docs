import React from 'react';
import ApiToken from '@site/src/features/AppManager/ApiToken';
import Layout from '@theme/Layout';

const AppManager = () => {
  return (
    <Layout title='ApiToken' description='Deriv API documentation'>
      <ApiToken />
    </Layout>
  );
};

export default AppManager;

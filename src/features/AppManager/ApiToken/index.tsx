import { Text } from '@deriv/ui';
import React from 'react';
import ApiTokenForm from './components/ApiTokenForm/api-token.form';
import ApiTokenTable from './components/ApiTokenTable';

const ApiToken = () => {
  return (
    <section>
      <Text as='h2' type={'heading-2'}>
        API Token Manager
      </Text>
      <ApiTokenForm />
      <ApiTokenTable />
    </section>
  );
};

export default ApiToken;

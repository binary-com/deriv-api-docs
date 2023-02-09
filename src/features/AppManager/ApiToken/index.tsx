import { Text } from '@deriv/ui';
import TokenPageProvider from '@site/src/contexts/tokenPage/token-page.provider';
import React from 'react';
import ApiTokenForm from './components/ApiTokenForm/api-token.form';
import ApiTokenTable from './components/ApiTokenTable';

const ApiToken = () => {
  return (
    <TokenPageProvider>
      <section>
        <Text as='h2' type={'heading-2'}>
          API Token Manager
        </Text>
        <ApiTokenForm />
        <ApiTokenTable />
      </section>
    </TokenPageProvider>
  );
};

export default ApiToken;

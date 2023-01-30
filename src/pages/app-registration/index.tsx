import React from 'react';
import Layout from '@theme/Layout';
import { AppManager } from '@site/src/features/AppManager/AppManager';
import AppManagerContextProvider from '@site/src/contexts/AppManager.context';
export default function AppRegistrationPage() {
  return (
    <Layout>
      <AppManagerContextProvider>
        <main>
          <AppManager />
        </main>
      </AppManagerContextProvider>
    </Layout>
  );
}

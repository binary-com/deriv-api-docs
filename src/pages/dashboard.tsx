import React from 'react';
import Layout from '@theme/Layout';
import { AppManager } from '@site/src/features/dashboard';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function AppRegistrationPage() {
  return (
    <BrowserOnly>
      {() => (
        <Layout title='Dashboard' description='Manage your apps and api tokens'>
          <main>
            <AppManager />
          </main>
        </Layout>
      )}
    </BrowserOnly>
  );
}

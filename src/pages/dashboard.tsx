import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import { AppManager } from '@site/src/features/dashboard';
import useAppManager from '../hooks/useAppManager';
export default function AppRegistrationPage() {
  const { is_dashboard, setIsDashboard } = useAppManager();
  useEffect(() => {
    setIsDashboard(true);
    return () => setIsDashboard(false);
  }, [setIsDashboard]);

  return (
    <Layout title='Dashboard' description='Manage your apps and api tokens'>
      <main>
        <AppManager />
      </main>
    </Layout>
  );
}

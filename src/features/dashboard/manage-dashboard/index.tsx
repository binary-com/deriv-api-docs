import React, { useCallback, useEffect, useState } from 'react';
import AppDashboardContainer from '../components/AppDashboardContainer';
import AppRegister from '../components/AppRegister';
import useAppManager from '@site/src/hooks/useAppManager';
import useApiToken from '@site/src/hooks/useApiToken';
import Spinner from '@site/src/components/Spinner';
import useWS from '@site/src/hooks/useWs';
import useDeviceType from '@site/src/hooks/useDeviceType';
import { RegisterAppDialogError } from '../components/Dialogs/RegisterAppDialogError';
import { AppRegisterSuccessModal } from '../components/Modals/AppRegisterSuccessModal';
import AppManagement from '../manage-apps';
import './manage-dashboard.scss';

const ManageDashboard = () => {
  const { apps, getApps, setAppRegisterModalOpen, currentTab, updateCurrentTab } = useAppManager();
  const { tokens } = useApiToken();
  const { send: registerApp, error, clear, data, is_loading } = useWS('app_register');
  const { deviceType } = useDeviceType();
  const [is_desktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsDesktop(deviceType.includes('desktop'));
  }, [deviceType]);

  useEffect(() => {
    if (!is_loading && data?.name && !error) {
      setAppRegisterModalOpen(true);
      clear();
      getApps();
    }
  }, [data, clear, error, setAppRegisterModalOpen, is_loading, getApps]);

  useEffect(() => {
    getApps();
  }, [getApps]);

  useEffect(() => {
    if (!apps?.length && !tokens?.length) {
      updateCurrentTab('REGISTER_APP');
    } else {
      updateCurrentTab('MANAGE_APPS');
    }
  }, [tokens, apps, updateCurrentTab]);

  const submit = useCallback(
    (data) => {
      const { name } = data;
      registerApp({
        name,
        scopes: [],
      });
    },
    [registerApp],
  );

  if (!apps || is_loading || !tokens)
    return (
      <div className='manage_dashboard__spinner'>
        <Spinner />
      </div>
    );

  const renderScreen = () => {
    switch (currentTab) {
      case 'REGISTER_APP':
        return <AppRegister submit={submit} />;
      case 'MANAGE_APPS':
        return <AppManagement />;
      default:
        return <AppRegister submit={submit} />;
    }
  };

  return (
    <React.Fragment>
      {error && <RegisterAppDialogError error={error} onClose={clear} />}
      <AppRegisterSuccessModal
        is_desktop={is_desktop}
        onCancel={() => setAppRegisterModalOpen(false)}
        onConfigure={() => setAppRegisterModalOpen(false)}
      />
      <AppDashboardContainer>{renderScreen()}</AppDashboardContainer>
    </React.Fragment>
  );
};

const MemoizedManageDashboard = React.memo(ManageDashboard);

export default MemoizedManageDashboard;

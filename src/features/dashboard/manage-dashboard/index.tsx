import React, { useCallback, useEffect, useState } from 'react';
import AppDashboardContainer from '../components/AppDashboardContainer';
import AppRegister from '../components/AppRegister';
import useAppManager from '@site/src/hooks/useAppManager';
import useApiToken from '@site/src/hooks/useApiToken';
import Spinner from '@site/src/components/Spinner';
import { IRegisterAppForm } from '../types';
import useWS from '@site/src/hooks/useWs';
import useDeviceType from '@site/src/hooks/useDeviceType';
import { RegisterAppDialogError } from '../components/Dialogs/RegisterAppDialogError';
import { AppRegisterSuccessModal } from '../components/Modals/AppRegisterSuccessModal';
import './manage-dashboard.scss';

const ManageDashboard = () => {
  const { apps, getApps, setAppRegisterModalOpen } = useAppManager();
  const { tokens } = useApiToken();
  const { send: registerApp, error, clear, data, is_loading } = useWS('app_register');
  const { deviceType } = useDeviceType();
  const [is_desktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (deviceType.includes('desktop')) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
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

  const submit = useCallback(
    (data: IRegisterAppForm) => {
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
  return (
    <React.Fragment>
      {error && <RegisterAppDialogError error={error} onClose={clear} />}
      <AppRegisterSuccessModal
        is_desktop={is_desktop}
        onCancel={() => setAppRegisterModalOpen(false)}
        onConfigure={() => setAppRegisterModalOpen(false)}
      />
      <AppDashboardContainer>
        {apps.length || tokens.length ? (
          // will be handle in later phase
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '80px',
              alignItems: 'center',
            }}
          >
            Component development in progress!
          </div>
        ) : (
          <AppRegister submit={submit} />
        )}
      </AppDashboardContainer>
    </React.Fragment>
  );
};

const MemoizedManageDashboard = React.memo(ManageDashboard);

export default MemoizedManageDashboard;

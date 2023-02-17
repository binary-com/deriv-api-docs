import useAppManagerContext from '@site/src/hooks/useAppManagerContext';
import React, { useEffect } from 'react';
import AppsTable from '../components/AppsTable';
import LoadingTable from '../components/LoadingTable';
import styles from './manage-apps.module.scss';

const AppManagement = () => {
  const { getApps, apps } = useAppManagerContext();

  useEffect(() => {
    getApps();
  }, [getApps]);

  return (
    <div className={styles.manageApps}>
      {apps ? <AppsTable apps={apps} /> : <LoadingTable rowCount={5} />}
    </div>
  );
};

export default AppManagement;

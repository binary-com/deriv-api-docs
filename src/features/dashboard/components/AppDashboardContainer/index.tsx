import React from 'react';
import styles from './app-dashboard-container.module.scss';
import { Heading, Text } from '@deriv/quill-design';

const AppDashboardContainer: React.FC = ({ children }) => {
  return (
    <div className={styles.app_dashboard_container}>
      <div className={styles.app_dashboard_container_main}>
        <div className={styles.app_dashboard_container_top}>
          <Heading.H2>App dashboard</Heading.H2>
          <Text size='md'>
            Start using Deriv API to bring custom integrations and powerful automation to your apps.
          </Text>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AppDashboardContainer;

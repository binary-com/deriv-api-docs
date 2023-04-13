import { Button, Text } from '@deriv/ui';
import * as Tabs from '@radix-ui/react-tabs';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import useAppManager from '@site/src/hooks/useAppManager';
import React from 'react';
import AppManagement from '../../manage-apps';
import ApiToken from '../../manage-tokens';
import AppRegistration from '../../register-app';
import styles from './tabs.module.scss';
import Link from '@docusaurus/Link';

type TTab = {
  id: number;
  value: TDashboardTab;
  label: string;
  content: () => JSX.Element;
};

export const tabs: TTab[] = [
  {
    id: 0,
    value: 'MANAGE_TOKENS',
    label: 'Manage tokens',
    content: ApiToken,
  },
  {
    id: 1,
    value: 'REGISTER_APP',
    label: 'Register application',
    content: AppRegistration,
  },
  {
    id: 2,
    value: 'MANAGE_APPS',
    label: 'Manage applications',
    content: AppManagement,
  },
];

export const AddToken = () => {
  const { updateCurrentTab } = useAppManager();
  return <Link onClick={() => updateCurrentTab('MANAGE_TOKENS')}>Add new token</Link>;
};

export const DashboardTabs = () => {
  const { currentTab, updateCurrentTab } = useAppManager();

  return (
    <div className={styles.app_dashboard} id={'app-manager-dashboard'}>
      <div>
        <Text as='h2' type='heading-3' align='center'>
          Your apps
        </Text>
        <Text as='p' type='subtitle-1' align='center'>
          Register your app, get an app ID, and start using the Deriv API
        </Text>
      </div>
      <Tabs.Root className={styles.tabs_root} value={currentTab} onValueChange={updateCurrentTab}>
        <Tabs.List className={styles.tabs_list}>
          {tabs.map((item) => (
            <Tabs.Trigger className={styles.tabs_trigger} key={item.id} value={item.value}>
              <Text as={'h3'} type={'paragraph-1'}>
                {item.label}
              </Text>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <>
          {tabs.map(({ id, value, content: Content }) => (
            <Tabs.Content key={id} value={value}>
              <div className={styles.tab_content}>
                <Content />
              </div>
            </Tabs.Content>
          ))}
        </>
      </Tabs.Root>
      <AddToken />
    </div>
  );
};

export default DashboardTabs;

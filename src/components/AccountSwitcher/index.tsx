import { Button } from '@deriv/ui';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useLogout from '@site/src/hooks/useLogout';
import useAccountSelector from '@site/src/hooks/useAccountSelector';
import React from 'react';
import styles from './account_switcher.module.scss';

const AccountSwitcher = () => {
  const { loginAccounts, currentLoginAccount } = useAuthContext();
  const { onSelectAccount } = useAccountSelector();
  const { logout } = useLogout();

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className='navbar__item navbar__link' asChild>
          <Button type='button' color={'tertiary'}>
            {currentLoginAccount.name && currentLoginAccount.currency
              ? `${currentLoginAccount.name} - ${currentLoginAccount.currency}`
              : 'Accounts'}
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={styles.DropdownMenuContent}
            sideOffset={20}
            alignOffset={-50}
            align={'end'}
          >
            {loginAccounts.map((accountItem) => (
              <DropdownMenu.Item
                key={accountItem.name}
                className={styles.DropdownMenuItem}
                onSelect={() => {
                  onSelectAccount(accountItem.name);
                }}
              >
                {`${accountItem.name} - ${accountItem.currency}`}
              </DropdownMenu.Item>
            ))}
            <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <Button onClick={logout} type='button' color={'tertiary'}>
        Logout
      </Button>
    </>
  );
};

export default AccountSwitcher;

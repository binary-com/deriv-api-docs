import { Button } from '@deriv/ui';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import useLogout from '@site/src/hooks/useLogout';
import useRootContext from '@site/src/hooks/useRootContext';
import React, { useCallback } from 'react';
import styles from './account_switcher.module.scss';

const AccountSwitcher = () => {
  const { accounts, currentAccount, updateCurrentAccount } = useRootContext();
  const { logout } = useLogout();

  const onSelectItem = useCallback(
    (accountName: string) => {
      const selected = accounts.find((item) => item.name === accountName);
      updateCurrentAccount(selected);
    },
    [accounts, updateCurrentAccount],
  );

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className='navbar__item navbar__link' asChild>
          <Button type='button' color={'tertiary'}>
            {currentAccount.name && currentAccount.currency
              ? `${currentAccount.name} - ${currentAccount.currency}`
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
            {accounts.map((accountItem) => (
              <DropdownMenu.Item
                key={accountItem.name}
                className={styles.DropdownMenuItem}
                onSelect={() => {
                  onSelectItem(accountItem.name);
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

import { Button } from '@deriv/ui';
import Link from '@docusaurus/Link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import useApiToken from '@site/src/hooks/useApiToken';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useTokenSelector from '@site/src/hooks/useTokenSelector';
import React, { useCallback } from 'react';
import styles from './api_token_switcher.module.scss';
import useAppManager from '@site/src/hooks/useAppManager';
import { boolean } from 'yup';

export const CreateToken = () => {
  const { updateCurrentTab } = useAppManager();
  return (
    <>
      {/* need a way to find out if we are on dashboard, 
      then if already on dashboard check the val of currentTab
      if on manage-tokens already then disable the button */}
      <Link
        className={styles.CreateToken}
        to='/dashboard'
        onClick={() => updateCurrentTab('MANAGE_TOKENS')}
      >
        Add new token
      </Link>
    </>
  );
};
const ApiTokenNavbarItem = () => {
  const { is_logged_in, is_authorized } = useAuthContext();
  const { tokens, currentToken, isLoadingTokens } = useApiToken();
  const { onSelectToken } = useTokenSelector();
  if (!is_logged_in || !is_authorized || isLoadingTokens) {
    return null;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className='navbar__item navbar__link' asChild>
        {/* <Button type='button' color={'tertiary'} onClick={onAddClick}>
          {currentToken ? `Selected Token: ${currentToken.display_name}` : <CreateToken />}
        </Button> */}
        <button>
          {currentToken ? `Selected Token: ${currentToken.display_name}` : <CreateToken />}
        </button>
      </DropdownMenu.Trigger>

      {currentToken && (
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={styles.DropdownMenuContent}
            sideOffset={20}
            alignOffset={-50}
            align={'end'}
          >
            {tokens.map((tokenItem) => (
              <DropdownMenu.Item
                key={tokenItem.token}
                className={styles.DropdownMenuItem}
                onSelect={() => {
                  onSelectToken(tokenItem);
                }}
              >
                {tokenItem.display_name}
              </DropdownMenu.Item>
            ))}
            <DropdownMenu.Item className={styles.DropdownMenuItem}>
              <CreateToken />
            </DropdownMenu.Item>
            <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      )}
    </DropdownMenu.Root>
  );
};

export default ApiTokenNavbarItem;

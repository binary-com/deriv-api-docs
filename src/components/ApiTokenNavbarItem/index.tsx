import Link from '@docusaurus/Link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import useApiToken from '@site/src/hooks/useApiToken';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useTokenSelector from '@site/src/hooks/useTokenSelector';
import React from 'react';
import styles from './api_token_switcher.module.scss';
import useAppManager from '@site/src/hooks/useAppManager';

const ApiTokenNavbarItem = () => {
  const { is_logged_in, is_authorized } = useAuthContext();
  const { tokens, currentToken, isLoadingTokens } = useApiToken();
  const { onSelectToken } = useTokenSelector();
  const { is_dashboard, updateCurrentTab } = useAppManager();
  if (!is_logged_in || !is_authorized || isLoadingTokens) {
    return null;
  }
  const CreateToken = () => {
    return (
      <>
        {is_dashboard ? (
          <button onClick={() => updateCurrentTab('MANAGE_TOKENS')}>Add new token</button>
        ) : (
          <Link className={styles.CreateToken} to='/dashboard'>
            Add new token
          </Link>
        )}
      </>
    );
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className='navbar__item navbar__link' asChild>
        {/* <Button type='button' color={'tertiary'} onClick={onAddClick}>
          {currentToken ? `Selected Token: ${currentToken.display_name}` : <CreateToken />}
        </Button> */}

        {currentToken ? `Selected Token: ${currentToken.display_name}` : <CreateToken />}
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

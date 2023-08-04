import React, { useState, useRef } from 'react';
import Link from '@docusaurus/Link';
import useApiToken from '@site/src/hooks/useApiToken';
import useAuthContext from '@site/src/hooks/useAuthContext';
import TokenDropdown from '../CustomSelectDropdown/token-dropdown/TokenDropdown';
import useOnClickOutside from '@site/src/hooks/useOnClickOutside';
import useAppManager from '@site/src/hooks/useAppManager';
import styles from './api_token_switcher.module.scss';

const ApiTokenNavbarItem = () => {
  const { is_logged_in, is_authorized } = useAuthContext();
  const { tokens, currentToken, isLoadingTokens } = useApiToken();
  const [is_toggle_dropdown, setToggleDropdown] = useState(false);
  const { updateCurrentTab, currentTab, is_dashboard } = useAppManager();
  const toggle_dropdown = is_toggle_dropdown ? styles.active : '';
  const has_one_token =
    tokens.length <= 1 && is_dashboard && currentTab === 'MANAGE_TOKENS' ? styles.oneToken : '';

  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setToggleDropdown(false));

  if (!is_logged_in || !is_authorized || isLoadingTokens) {
    return null;
  }

  const CreateToken = () => {
    const is_not_on_manage_tab = is_dashboard && !(currentTab === 'MANAGE_TOKENS');
    return (
      <React.Fragment>
        {(is_not_on_manage_tab || !is_dashboard) && (
          <div className={styles.tokenContainer}>
            <Link
              onClick={() => updateCurrentTab('MANAGE_TOKENS')}
              className={styles.createToken}
              to='/dashboard'
            >
              Add new token
            </Link>
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <div ref={dropdownRef} className={styles.tokenDropdownContainer}>
      {currentToken ? (
        <button
          className={`${styles.tokenDropdownButton} ${toggle_dropdown} ${has_one_token}`}
          type='button'
          onClick={() => {
            setToggleDropdown((prev) => !prev);
          }}
        >
          <span>{currentToken.display_name}</span>
        </button>
      ) : (
        <CreateToken />
      )}

      {is_toggle_dropdown && (
        <div className={styles.tokenDropdownWrapper}>
          {tokens.length > 1 && (
            <div className={styles.tokenDropdown}>
              <TokenDropdown />
            </div>
          )}
          <CreateToken />
        </div>
      )}
    </div>
  );
};

export default ApiTokenNavbarItem;

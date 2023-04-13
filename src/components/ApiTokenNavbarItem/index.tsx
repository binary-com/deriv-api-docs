import Link from '@docusaurus/Link';
import useApiToken from '@site/src/hooks/useApiToken';
import useAuthContext from '@site/src/hooks/useAuthContext';
import TokenDropdown from '../CustomSelectDropdown/token-dropdown/TokenDropdown';
import useClickOutsideDropdown from '@site/src/hooks/useClickOutsideDropdown';
import React, { useState, useRef } from 'react';
import styles from './api_token_switcher.module.scss';

export const CreateToken = () => (
  <div className={styles.tokenContainer}>
    <Link className={styles.createToken} to='/dashboard'>
      Add new token
    </Link>
  </div>
);

const ApiTokenNavbarItem = () => {
  const { is_logged_in, is_authorized } = useAuthContext();
  const { tokens, currentToken, isLoadingTokens } = useApiToken();
  const [is_toggle_dropdown, setToggleDropdown] = useState(false);
  const toggle_dropdown = is_toggle_dropdown ? styles.active : '';
  const one_token = tokens.length <= 1 ? styles.oneToken : '';

  const dropdownRef = useRef(null);
  useClickOutsideDropdown(dropdownRef, setToggleDropdown, false);

  if (!is_logged_in || !is_authorized || isLoadingTokens) {
    return null;
  }

  return (
    <div ref={dropdownRef} className={styles.tokenDropdownContainer}>
      {currentToken ? (
        <button
          className={`${styles.tokenDropdownButton} ${toggle_dropdown} ${one_token}`}
          type='button'
          onClick={() => {
            setToggleDropdown((prev) => !prev);
          }}
        >
          {currentToken.display_name}
        </button>
      ) : (
        <CreateToken />
      )}

      {is_toggle_dropdown && tokens.length > 1 && (
        <div className={styles.tokenDropdownWrapper}>
          <div className={styles.tokenDropdown}>
            <TokenDropdown />
          </div>
          <CreateToken />
        </div>
      )}
    </div>
  );
};

export default ApiTokenNavbarItem;

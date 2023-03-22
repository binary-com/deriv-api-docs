import React, { useMemo } from 'react';
import useApiToken from '@site/src/hooks/useApiToken';
import useTokenSelector from '@site/src/hooks/useTokenSelector';
import { TTokenType } from '@site/src/types';
import styles from './token_dropdown.module.scss';

const TokenDropdown = () => {
  const { currentToken, tokens } = useApiToken();
  const { onSelectToken } = useTokenSelector();

  const adminTokens = useMemo(() => {
    return tokens.filter((item) => item.scopes.includes('admin'));
  }, [tokens]);

  const isNotCurrentToken = (token_item: TTokenType) => {
    const is_not_admin_token =
      token_item?.display_name !== currentToken?.display_name &&
      token_item?.scopes.includes('admin');
    return is_not_admin_token;
  };

  return (
    <React.Fragment>
      {adminTokens.map((item) => (
        <React.Fragment key={item.display_name}>
          {isNotCurrentToken(item) && (
            <div
              tabIndex={0}
              className={styles.customSelectItem}
              onClick={() => onSelectToken(item)}
              onKeyDown={(e) => e.key === 'Enter' && onSelectToken(item)}
            >
              {item.display_name}
            </div>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default TokenDropdown;

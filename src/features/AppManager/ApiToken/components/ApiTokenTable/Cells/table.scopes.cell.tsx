import { formatTokenScope } from '@site/src/utils';
import React from 'react';
import { CellProps } from 'react-table';
import styles from './cells.module.scss';
import clsx from 'clsx';
import { TTokenType } from '../../../../../../contexts/tokenPage/types';

const ApiScopesCell = ({ value }: React.PropsWithChildren<CellProps<TTokenType, string[]>>) => {
  return (
    <div className={styles.scopes_cell} data-testid={'scopes-cell'}>
      {value?.map((scope) => (
        <span
          className={clsx({
            [styles.scope_pill]: true,
            [styles.scope_admin_pill]: scope.includes('admin'),
          })}
          key={scope}
        >
          {formatTokenScope(scope)}
        </span>
      ))}
    </div>
  );
};

export default ApiScopesCell;

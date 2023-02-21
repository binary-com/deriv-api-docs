import React from 'react';
import { CellProps } from 'react-table';
import styles from './scopes.cell.module.scss';

const ScopesCell = <T extends object>({
  cell,
}: React.PropsWithChildren<CellProps<T, string[]>>) => {
  return (
    <>
      {cell.value.map((scopes: string): React.ReactElement => {
        return (
          <span
            key={scopes}
            className={`${styles.scope}  ${scopes === 'admin' ? styles.adminScope : ''}`}
          >
            {scopes.charAt(0).toUpperCase() + scopes.slice(1).replace('_', ' ')}
          </span>
        );
      })}
    </>
  );
};

export default ScopesCell;

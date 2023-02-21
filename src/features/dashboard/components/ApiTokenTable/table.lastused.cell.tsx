import { Button } from '@deriv/ui';
import { TTokenType } from '@site/src/types';
import { formatDate } from '@site/src/utils';
import React from 'react';
import type { CellProps } from 'react-table';
import useDeleteToken from '../../hooks/useDeleteToken';
import styles from './cells.module.scss';

const ApiLastUsedCell = ({
  value,
  row,
}: React.PropsWithChildren<CellProps<TTokenType, string>>) => {
  const { deleteToken } = useDeleteToken();
  const onDelete = () => {
    const values = row.original;
    deleteToken(values.token);
  };

  return (
    <div className={styles.lastused_cell} data-testid={'lastused-cell'}>
      <div>{value ? formatDate(value) : 'Never'}</div>
      <div>
        <Button onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default ApiLastUsedCell;

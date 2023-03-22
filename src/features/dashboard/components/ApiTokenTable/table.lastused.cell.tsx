import React, { useState } from 'react';
import { TTokenType } from '@site/src/types';
import { formatDate } from '@site/src/utils';
import type { CellProps } from 'react-table';
import useDeleteToken from '../../hooks/useDeleteToken';
import DeleteTokenDialog from './DeleteTokenDialog';
import styles from './cells.module.scss';

const ApiLastUsedCell = ({
  value,
  row,
}: React.PropsWithChildren<CellProps<TTokenType, string>>) => {
  const [toggle_modal, setToggleModal] = useState(false);
  const { deleteToken } = useDeleteToken();

  const onDelete = () => {
    const values = row.original;
    deleteToken(values.token);
  };

  return (
    <div className={styles.lastused_cell} data-testid={'lastused-cell'}>
      <div>{value ? formatDate(value) : 'Never'}</div>
      <div>
        <button onClick={() => setToggleModal(!toggle_modal)} className={styles.delete_button} />
        {toggle_modal && <DeleteTokenDialog onDelete={onDelete} setToggleModal={setToggleModal} />}
      </div>
    </div>
  );
};

export default ApiLastUsedCell;

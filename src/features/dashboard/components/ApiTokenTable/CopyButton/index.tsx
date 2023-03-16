import React, { useState } from 'react';
import CopyTokenDialog from '../CopyTokenDialog';
import { CellProps } from 'react-table';
import { TTokenType } from '@site/src/types';
import styles from '../token-cell.module.scss';

const CopyButton = ({ cell }: React.PropsWithChildren<CellProps<TTokenType, string>>) => {
  const [toggle_modal, setToggleModal] = useState(false);
  const [is_copying_token, setIsCopyingToken] = useState(false);
  const is_copying = is_copying_token ? styles.is_copying : '';
  const has_admin_scope = cell.row?.original?.scopes?.includes('admin');

  const copiedToken = () => {
    if (!is_copying_token) {
      setIsCopyingToken(true);
      setTimeout(() => {
        setIsCopyingToken(false);
      }, 2000);
    }
  };

  const copyToken = () => {
    navigator.clipboard.writeText(cell.value);
    copiedToken();
  };

  return (
    <React.Fragment>
      <button
        onClick={() => {
          has_admin_scope ? setToggleModal(!toggle_modal) : copyToken();
        }}
        className={`${styles.copy_button} ${is_copying}`}
      />
      {toggle_modal && <CopyTokenDialog setToggleModal={setToggleModal} copyToken={copyToken} />}
    </React.Fragment>
  );
};

export default CopyButton;

import React, { useState } from 'react';
import styles from '../token-cell.module.scss';
import CopyTokenDialog from '../CopyTokenDialog';

type TCopyButton = {
  cell: {
    value: string;
    row: {
      original: {
        scopes: string[];
      };
    };
  };
};

const CopyButton = ({ cell }: TCopyButton) => {
  const [is_copying_token, setIsCopyingToken] = useState(false);
  const [toggle_modal, setToggleModal] = useState(false);

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
